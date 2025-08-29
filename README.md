# Free AI Headshot Generator - Professional Photos in 30 Minutes

**Keywords**: AI Headshot Generator, Free Professional Headshots, Astria API, LinkedIn Photos, Business Portraits, AI Photography, Resume Photos, Corporate Headshots

Generate **professional AI headshots** for free using Astria API. Perfect for LinkedIn profiles, resumes, business cards, and professional portfolios. No monthly subscriptions - just $4-6 for 12+ high-quality headshots.

## 🔍 What This Solves
- ✅ **Free AI Headshot Generator** - No monthly fees or subscriptions
- ✅ **Professional LinkedIn Photos** - Business-ready portraits  
- ✅ **Resume & CV Photos** - Professional headshots for job applications
- ✅ **Corporate Headshots** - Executive-style portraits for business
- ✅ **Business Card Photos** - High-resolution professional images
- ✅ **AI Portrait Generator** - Multiple styles and backgrounds

**Popular searches this helps with**: "free AI headshots", "professional LinkedIn photos", "cheap business headshots", "AI portrait generator", "resume photo generator", "astria api tutorial"

This is a simple standalone script to generate professional headshots using your Astria API key. No complex setup required!

Note: This project is JavaScript/Node.js only. The previous Python script has been removed.

## 🔒 Security & Privacy

**✅ 100% Local & Secure**: Everything runs on YOUR computer. Your API key, photos, and personal data never go anywhere except directly to Astria's official API. This script:
- Runs entirely on your local machine
- Only communicates with Astria's official API endpoints
- Never stores or transmits your data through third parties
- Your API key stays on your computer
- No data collection, tracking, or external servers involved

## 🎉 Success Story
✅ **This script works!** User successfully generated 12 professional headshots in ~30 minutes for ~$4-5.

## What You Need

### Prerequisites
1. **Node.js** - Download from https://nodejs.org (any recent version works)
2. **Windows** - This script uses a .bat file (for other OS, run the .js file directly)

### For Headshot Generation
1. **Astria API Key** - Get yours from https://www.astria.ai/users/edit#api
2. **4+ Training Photos** - Good quality photos of yourself (see tips below)
3. **Image Hosting** - Upload your photos to PostImages.org or similar to get URLs

## Quick Start

### Step 1: Install Node.js
1. Download Node.js from https://nodejs.org
2. Install with default settings
3. Open Command Prompt and verify: `node --version`

### Step 2: Setup Project
```powershell
# Navigate to the project folder
cd path\to\headshotmaker

# Install dependencies
npm install axios
```

### Step 3: Get Your API Key
1. Go to https://www.astria.ai/users/edit#api
2. Copy your API key (format: `sd_XXXXXX`)
3. **Enable Idempotency** (recommended to prevent duplicate charges)

### Step 4: Upload Training Photos
1. Go to **[PostImages.org](https://postimages.org)** (free, no account needed)
2. Upload 4-6 good photos of yourself
3. **Copy the "Direct Link" URLs** (ending in .jpg/.png)
4. Keep these URLs handy

### Step 5: Generate Headshots
**Windows:** Double-click `generate_headshots.bat` and follow the prompts.

**macOS/Linux:** Run from terminal:
```bash
node simple_headshot_generator.js
```

**Total Time**: ~30 minutes | **Total Cost**: ~$4-6

## How It Works

1. **Upload Photos**: Upload 4-6 photos to PostImages.org and get direct URLs
2. **Run Script**: Double-click `generate_headshots.bat` 
3. **Enter Details**: API key, image URLs, model name, gender
4. **Model Training**: AI learns your face (10-20 minutes)
5. **Generate Headshots**: Creates 12+ professional photos (5-10 minutes)
6. **Download**: Get direct links to all your new headshots

## Photo Tips for Best Results

✅ **DO:**
- Use 4-10 close-up photos of your face
- Include various angles and expressions
- Ensure good lighting
- Only one person per photo
- High resolution images

❌ **DON'T:**
- Use photos with sunglasses or hats
- Include multiple people in one photo
- Use blurry or low-quality images
- Use photos with extreme filters

## Step-by-Step Example

### 1. Upload Photos to PostImages
- Go to **[postimages.org](https://postimages.org)**
- Upload 4-6 photos of yourself
- Copy the "Direct Link" URLs (like `https://i.postimg.cc/ABC123/photo1.jpg`)

### 2. Run the Generator
**Double-click** `generate_headshots.bat`

### 3. Follow the Prompts
```
Enter your Astria API key: YOUR_API_KEY_HERE

📸 Enter your training image URLs (from PostImages.org):
Image 1 URL (or press ENTER to finish): https://i.postimg.cc/ABC123/photo1.jpg
✅ Added image 1
Image 2 URL (or press ENTER to finish): https://i.postimg.cc/DEF456/photo2.jpg
✅ Added image 2
[... continue for all photos ...]
Image 5 URL (or press ENTER to finish): [PRESS ENTER - empty line]

✅ Total images collected: 4

Enter a name for your model: your-name-headshots
Are you a "man" or "woman"? man
```

### 4. Wait for Results (~30 minutes)
- Training: 10-20 minutes
- Generation: 5-10 minutes
- **You'll get 12+ professional headshots!**
   - All URLs will be displayed and saved to `headshot_results.json`
   - Right-click images to save them

## Cost Breakdown

With a $5 Astria credit:
- **Model training**: ~$3-4 (one-time)
- **12 headshots**: ~$1-2
- **Total**: ~$4-6 ✅

## API Settings

Go to https://www.astria.ai/users/edit#api and configure:
1. ✅ **Enable Idempotency** (prevents duplicate charges)
2. **Auto-extend storage** (optional - keeps models longer than 30 days)

## Troubleshooting

**"Missing API Key"**: 
- Make sure you entered your key correctly (format: `sd_XXXXXX`)

**"Training Failed"**: 
- Check your API key is valid
- Verify you have sufficient credits ($5+ recommended)
- Ensure image URLs work (test by opening in browser)

**"Images Not Generating"**: 
- Wait longer (generation can take 5-10 minutes)
- Check if training completed successfully

**Script Stops After One URL**:
- Make sure you're using the updated version
- Press ENTER on empty line when done with all URLs

## Alternative Image Hosting

If PostImages doesn't work:

### Google Drive
1. Upload photos → Share publicly
2. Convert URL from `/file/d/ID/view` to `/uc?id=ID`

### GitHub  
1. Upload to repository
2. Copy raw image URLs

### Discord
1. Send photos to yourself in DMs
2. Right-click → Copy Link

## What You Get

The script generates **12+ professional headshots** in 3 different styles:
1. **Business Attire** - White background, formal look
2. **Corporate Portrait** - Office setting, LinkedIn style  
3. **Executive Style** - Studio lighting, premium look

Perfect for:
- 📱 LinkedIn profile
- 📄 Resume/CV
- 💼 Business cards
- 🌐 Website bio
- 📁 Professional portfolios

## Files You'll Get

After completion, you'll have:
- **`headshot_results.json`** - Contains all image URLs and model info
- **12+ Image URLs** - Direct links to download your headshots
- **Trained Model** - Stays on Astria for future use (ID: tune_id)

## Success Example

Here's what a successful run looks like:
```json
{
  "tune_id": 1234567,
  "model_name": "john-headshots",
  "generated_images": [
    "https://mp.astria.ai/example1url...",
    "https://mp.astria.ai/example2url...",
    "... 10 more URLs"
  ],
  "timestamp": "2025-07-21T16:23:48.768Z"
}
```

## Need Help?

If you run into issues:
1. Check your Astria account balance at https://www.astria.ai/users/edit#billing
2. Verify image URLs work by opening them in browser
3. Make sure photos meet quality guidelines (see Photo Tips above)
4. Try with fewer, higher-quality photos

## Why This Works

✅ **Proven**: Successfully tested and working  
✅ **Simple**: No complex setup, just run and follow prompts  
✅ **Fast**: 30 minutes total for professional results  
✅ **Affordable**: ~$4-6 for 12+ headshots  
✅ **Quality**: Uses Astria's professional AI models  
✅ **Secure**: Runs locally on your PC, no third-party data collection  
✅ **Private**: Your photos and API key never leave your control  

Your $5 credit is perfect for getting started with professional headshots!

## ⭐ Why Choose This Over Alternatives?

**vs. Professional Photography ($200-500)**:
- ✅ 20x cheaper ($4-6 total)
- ✅ Done from home in 30 minutes
- ✅ Multiple styles included
- ✅ No scheduling or travel required

**vs. Monthly AI Services ($30/month)**:
- ✅ No monthly fees - pay once, use forever
- ✅ Own your images forever  
- ✅ No subscription cancellation hassles
- ✅ No recurring charges

**vs. Other GitHub Scripts**:
- ✅ Actually tested and working (proven results)
- ✅ Complete step-by-step documentation
- ✅ Beginner-friendly (just double-click .bat file)
- ✅ Real support and troubleshooting guide

## 🔐 Privacy & Data Protection

**What happens to your data:**
- ✅ Photos: Only uploaded to PostImages (by you) and sent directly to Astria API
- ✅ API Key: Stored temporarily in memory only, never saved to files
- ✅ Generated Images: Hosted by Astria, URLs returned to you
- ✅ Script: Runs 100% locally on your computer
- ❌ No third-party analytics, tracking, or data collection
- ❌ No cloud servers or external services involved
- ❌ No logs or storage of your personal information

**You control everything:**
- Your API key stays on your computer
- You choose where to upload training photos
- You decide what to do with generated headshots
- You can delete everything when done
