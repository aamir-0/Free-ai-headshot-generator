const axios = require('axios');

async function testAstriaAPI() {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
    const headers = { 'Authorization': `Bearer ${apiKey}` };
    
    console.log('🧪 Testing your Astria API key...');
    console.log('=' .repeat(40));
    
    try {
        // Test 1: Check available packs (this should work with a valid API key)
        console.log('📦 Testing access to gallery packs...');
        const response = await axios.get('https://api.astria.ai/gallery/packs', { headers });
        
        if (response.status === 200) {
            console.log('✅ API Key is VALID!');
            console.log(`✅ Found ${response.data.length} available packs`);
            console.log('\n🎯 Your API key is working perfectly!');
            console.log('\n📋 Next steps:');
            console.log('1. Upload 4-6 photos of yourself to postimages.org');
            console.log('2. Run: node simple_headshot_generator.js');
            console.log('3. Enter your API key when prompted');
            console.log('4. Enjoy your professional headshots!');
            
            // Show first few packs as examples
            console.log('\n🎨 Available headshot styles:');
            response.data.slice(0, 5).forEach((pack, i) => {
                console.log(`   ${i + 1}. ${pack.title || pack.name || 'Style ' + (i + 1)}`);
            });
            
        } else {
            console.log('❌ Unexpected response:', response.status);
        }
        
    } catch (error) {
        if (error.response?.status === 401) {
            console.log('❌ API Key is INVALID or EXPIRED');
            console.log('   Please check your key at: https://www.astria.ai/users/edit#api');
        } else if (error.response?.status === 402) {
            console.log('⚠️  API Key is valid but insufficient credits');
            console.log('   Please add credits at: https://www.astria.ai/users/edit#billing');
        } else {
            console.log('❌ Error testing API:', error.response?.status || error.message);
        }
    }
}

testAstriaAPI();
