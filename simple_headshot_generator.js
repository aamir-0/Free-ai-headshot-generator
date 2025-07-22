#!/usr/bin/env node

/**
 * Simple Headshot Generator using Astria API
 * This script allows you to train a model and generate headshots using your Astria API key.
 */

const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

class AstriaHeadshotGenerator {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.astria.ai';
        this.headers = { 'Authorization': `Bearer ${apiKey}` };
    }

    async createTune(name, trainingImages, personType = 'man') {
        console.log(`Creating tune: ${name}`);
        
        const tuneData = {
            tune: {
                title: name,
                name: personType,
                base_tune_id: 690204, // Realistic Vision v5.1
                branch: 'sd15',
                token: 'ohwx',
                image_urls: trainingImages,
                prompts_attributes: [
                    {
                        text: `portrait of ohwx ${personType} wearing a business suit, professional photo, white background, Amazing Details, Best Quality, Masterpiece, dramatic lighting highly detailed, analog photo, overglaze, 80mm Sigma f/1.4 or any ZEISS lens`,
                        num_images: 8,
                    },
                    {
                        text: `8k close up linkedin profile picture of ohwx ${personType}, professional jack suite, professional headshots, photo-realistic, 4k, high-resolution image, workplace settings, upper body, modern outfit, professional suit, business, blurred background, glass building, office window`,
                        num_images: 8,
                    }
                ]
            }
        };

        try {
            const response = await axios.post(`${this.baseUrl}/tunes`, tuneData, { headers: this.headers });
            
            if (response.status === 201) {
                console.log(`✅ Tune created successfully! Tune ID: ${response.data.id}`);
                return response.data;
            }
        } catch (error) {
            console.error('❌ Error creating tune:', error.response?.status, error.response?.data);
            return null;
        }
    }

    async checkTuneStatus(tuneId) {
        try {
            const response = await axios.get(`${this.baseUrl}/tunes/${tuneId}`, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('❌ Error checking tune status:', error.response?.status);
            return null;
        }
    }

    async waitForTrainingCompletion(tuneId, maxWaitMinutes = 30) {
        console.log(`⏳ Waiting for tune ${tuneId} to complete training...`);
        console.log('This usually takes 10-20 minutes...');
        
        const startTime = Date.now();
        const maxWaitMs = maxWaitMinutes * 60 * 1000;
        
        while (Date.now() - startTime < maxWaitMs) {
            const status = await this.checkTuneStatus(tuneId);
            
            if (status) {
                if (status.trained_at) {
                    console.log('🎉 Training completed!');
                    return true;
                } else if (status.expires_at) {
                    console.log('❌ Training failed or expired');
                    return false;
                } else {
                    const elapsed = Math.floor((Date.now() - startTime) / 60000);
                    console.log(`⏳ Still training... (elapsed: ${elapsed} minutes)`);
                }
            }
            
            await this.sleep(60000); // Check every minute
        }
        
        console.log(`⏰ Timeout after ${maxWaitMinutes} minutes`);
        return false;
    }

    async createPrompt(tuneId, promptText, numImages = 4) {
        console.log(`Creating prompt for tune ${tuneId}`);
        
        const promptData = {
            prompt: {
                text: promptText,
                num_images: numImages,
                tune_id: tuneId
            }
        };

        try {
            const response = await axios.post(`${this.baseUrl}/prompts`, promptData, { headers: this.headers });
            
            if (response.status === 201) {
                console.log(`✅ Prompt created successfully! Prompt ID: ${response.data.id}`);
                return response.data;
            }
        } catch (error) {
            console.error('❌ Error creating prompt:', error.response?.status, error.response?.data);
            return null;
        }
    }

    async checkPromptStatus(promptId) {
        try {
            const response = await axios.get(`${this.baseUrl}/prompts/${promptId}`, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('❌ Error checking prompt status:', error.response?.status);
            return null;
        }
    }

    async waitForImages(promptId, maxWaitMinutes = 10) {
        console.log('⏳ Waiting for images to be generated...');
        
        const startTime = Date.now();
        const maxWaitMs = maxWaitMinutes * 60 * 1000;
        
        while (Date.now() - startTime < maxWaitMs) {
            const status = await this.checkPromptStatus(promptId);
            
            if (status && status.images && status.images.length > 0) {
                console.log(`🎉 ${status.images.length} images generated!`);
                return status.images;
            }
            
            const elapsed = Math.floor((Date.now() - startTime) / 60000);
            console.log(`⏳ Still generating... (elapsed: ${elapsed} minutes)`);
            await this.sleep(30000); // Check every 30 seconds
        }
        
        console.log(`⏰ Timeout after ${maxWaitMinutes} minutes`);
        return null;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Helper function to get user input
function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

// Helper function to collect multiple image URLs
async function collectImageUrls() {
    console.log('\n📸 Enter your training image URLs (from PostImages.org):');
    console.log('Tip: You need 4-10 images for best results');
    console.log('Enter URLs one by one, press ENTER after each URL');
    console.log('When done with all URLs, just press ENTER on empty line\n');
    
    const imageUrls = [];
    
    while (true) {
        const url = await askQuestion(`Image ${imageUrls.length + 1} URL (or press ENTER to finish): `);
        
        if (url.trim() === '') {
            if (imageUrls.length < 4) {
                console.log('❌ You need at least 4 images. Please add more URLs.');
                continue;
            }
            break;
        }
        
        // Validate URL
        if (url.includes('postimg.cc') || url.includes('imgur.com') || url.includes('drive.google.com') || url.includes('http')) {
            imageUrls.push(url.trim());
            console.log(`✅ Added image ${imageUrls.length}`);
        } else {
            console.log('❌ Please use a valid image hosting URL');
        }
    }
    
    console.log(`\n✅ Total images collected: ${imageUrls.length}`);
    return imageUrls;
}

async function main() {
    console.log('🤳 Simple Astria Headshot Generator');
    console.log('=' .repeat(40));
    
    // Get API key
    const apiKey = await askQuestion('Enter your Astria API key: ');
    if (!apiKey.trim()) {
        console.log('❌ API key is required!');
        return;
    }
    
    const generator = new AstriaHeadshotGenerator(apiKey.trim());
    
    // Get training images using the new method
    const trainingUrls = await collectImageUrls();
    
    // Get model details
    console.log('\n🎯 Model Configuration');
    const modelName = await askQuestion('Enter a name for your model: ');
    const personType = await askQuestion('Are you a "man" or "woman"? ');
    
    const validPersonType = ['man', 'woman'].includes(personType.toLowerCase()) ? personType.toLowerCase() : 'person';
    
    // Create tune
    console.log('\n🚀 Creating and training your model...');
    const tuneResult = await generator.createTune(modelName.trim(), trainingUrls, validPersonType);
    
    if (!tuneResult) {
        console.log('❌ Failed to create tune');
        return;
    }
    
    const tuneId = tuneResult.id;
    
    // Wait for training
    console.log('\n⏳ Training your model...');
    const trainingSuccess = await generator.waitForTrainingCompletion(tuneId);
    if (!trainingSuccess) {
        console.log('❌ Training failed or timed out');
        return;
    }
    
    // Generate headshots
    console.log('\n📷 Generating your headshots...');
    
    // Predefined professional prompts
    const prompts = [
        `professional headshot of ohwx ${validPersonType}, business attire, white background, high quality, 4k`,
        `corporate portrait of ohwx ${validPersonType}, professional suit, office setting, linkedin style photo`,
        `executive headshot of ohwx ${validPersonType}, formal business wear, studio lighting, clean background`,
    ];
    
    const allImages = [];
    
    for (let i = 0; i < prompts.length; i++) {
        const promptText = prompts[i];
        console.log(`\n🎨 Generating set ${i + 1}/${prompts.length}: ${promptText.substring(0, 50)}...`);
        
        const promptResult = await generator.createPrompt(tuneId, promptText, 4);
        if (promptResult) {
            const images = await generator.waitForImages(promptResult.id);
            if (images) {
                allImages.push(...images);
                console.log(`✅ Generated ${images.length} images for set ${i + 1}`);
            }
        }
    }
    
    // Display results
    console.log(`\n🎉 SUCCESS! Generated ${allImages.length} headshot images!`);
    console.log('\n📁 Your headshot URLs:');
    console.log('=' .repeat(50));
    
    allImages.forEach((imageUrl, index) => {
        console.log(`${(index + 1).toString().padStart(2)}. ${imageUrl}`);
    });
    
    console.log('\n💡 Tips:');
    console.log('- Right-click and "Save image as..." to download');
    console.log('- Use these for LinkedIn, resumes, business cards, etc.');
    console.log(`- The model will be available for future use with tune ID: ${tuneId}`);
    
    // Save results to file
    const results = {
        tune_id: tuneId,
        model_name: modelName.trim(),
        generated_images: allImages,
        timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('headshot_results.json', JSON.stringify(results, null, 2));
    console.log('\n💾 Results saved to "headshot_results.json"');
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { AstriaHeadshotGenerator };
