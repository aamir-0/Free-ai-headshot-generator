# Security & Privacy Notice

## 🔒 Your Security is Our Priority

**This script is designed with security and privacy in mind:**

### ✅ What Makes This Secure:

1. **100% Local Execution**: Everything runs on YOUR computer
2. **Direct API Communication**: Only talks to Astria's official API
3. **No Third Parties**: No external services, analytics, or tracking
4. **No Data Storage**: Script doesn't save your API key or personal data
5. **Open Source**: You can inspect every line of code

### 🛡️ Data Flow (Completely Transparent):

```
Your Computer → PostImages.org (photos you upload manually)
Your Computer → Astria API (direct, official API calls)
Astria API → Your Computer (generated headshot URLs)
```

**That's it!** No other services, servers, or third parties involved.

### 🔐 What Stays Private:

- ✅ **API Key**: Never saved to files, only in memory during execution
- ✅ **Training Photos**: You upload them yourself to PostImages
- ✅ **Generated Images**: Hosted by Astria, URLs returned to you
- ✅ **Personal Info**: Never collected, stored, or transmitted
- ✅ **Usage Data**: No analytics or tracking whatsoever

## For Repository Maintainers

⚠️ **Important: Never commit your real API key or personal data!**

### ✅ Before Making This Repository Public:

1. **API Key Removed** - All example files use placeholder keys
2. **Personal Data Removed** - No real names, tune IDs, or image URLs
3. **Results File Sanitized** - `headshot_results.json` contains example data only

## For Users:

### 🔐 Keep Your API Key Safe
- Never share your actual Astria API key
- Don't commit it to version control
- Use environment variables for production apps

### 🎯 Getting Your API Key
1. Go to https://www.astria.ai/users/edit#api
2. Copy your key (format: `sd_XXXXXX`)
3. Enter it when the script prompts you

### 💡 Pro Tips
- Enable "Idempotency" in your Astria API settings
- Start with $5 credit (enough for your first model + headshots)
- Keep your generated `headshot_results.json` file private

## Example vs Real Data

**This repo contains example/template data only:**
- `headshot_results.json` - Template with placeholder URLs
- All documentation uses example API keys
- No real image URLs or personal information

**Your actual usage will generate:**
- Real tune IDs
- Real image URLs  
- Personal model names
- Keep these files private!
