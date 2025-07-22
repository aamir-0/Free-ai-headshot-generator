@echo off
echo.
echo 🤳 Simple Astria Headshot Generator
echo.
echo Starting the headshot generator...
echo.
echo Make sure you have:
echo - Your Astria API key (get from: https://www.astria.ai/users/edit#api)
echo - 4+ photos uploaded to PostImages.org
echo - Copy the "Direct Link" URLs (ending in .jpg/.png)
echo.
echo 📝 Process:
echo 1. Enter your API key
echo 2. Enter image URLs one by one (press ENTER after each)
echo 3. Press ENTER on empty line when done with all URLs
echo 4. Wait for training and generation (~30 minutes)
echo.
echo 📸 Photo Tips:
echo - Close-up face shots, good lighting
echo - No sunglasses, hats, or multiple people
echo - Various angles and expressions
echo.
pause
node simple_headshot_generator.js
pause
