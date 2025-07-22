#!/usr/bin/env python3
"""
Simple Headshot Generator using Astria API
This script allows you to train a model and generate headshots using your Astria API key.
"""

import os
import requests
import time
import json
from typing import List, Dict, Any

class AstriaHeadshotGenerator:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.astria.ai"
        self.headers = {"Authorization": f"Bearer {api_key}"}
    
    def upload_training_images(self, image_paths: List[str]) -> List[str]:
        """
        Upload training images and return their URLs.
        Note: In a production app, you'd upload to a storage service first.
        For this simple script, we'll assume you have accessible URLs.
        """
        print("For this simple script, you'll need to provide image URLs.")
        print("You can upload your images to any image hosting service (imgur, etc.)")
        print("and then provide the direct URLs.")
        
        image_urls = []
        for i, path in enumerate(image_paths, 1):
            url = input(f"Enter URL for training image {i} (or provide local path for reference): ")
            image_urls.append(url)
        
        return image_urls
    
    def create_tune(self, name: str, training_images: List[str], person_type: str = "man") -> Dict[str, Any]:
        """
        Create a new tune (model) for training.
        """
        print(f"Creating tune: {name}")
        
        tune_data = {
            "tune": {
                "title": name,
                "name": person_type,
                "base_tune_id": 690204,  # Realistic Vision v5.1
                "branch": "sd15",
                "token": "ohwx",
                "image_urls": training_images,
                "prompts_attributes": [
                    {
                        "text": f"portrait of ohwx {person_type} wearing a business suit, professional photo, white background, Amazing Details, Best Quality, Masterpiece, dramatic lighting highly detailed, analog photo, overglaze, 80mm Sigma f/1.4 or any ZEISS lens",
                        "num_images": 8,
                    },
                    {
                        "text": f"8k close up linkedin profile picture of ohwx {person_type}, professional jack suite, professional headshots, photo-realistic, 4k, high-resolution image, workplace settings, upper body, modern outfit, professional suit, business, blurred background, glass building, office window",
                        "num_images": 8,
                    }
                ]
            }
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/tunes",
                headers=self.headers,
                json=tune_data
            )
            
            if response.status_code == 201:
                result = response.json()
                print(f"✅ Tune created successfully! Tune ID: {result['id']}")
                return result
            else:
                print(f"❌ Error creating tune: {response.status_code}")
                print(response.text)
                return None
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return None
    
    def check_tune_status(self, tune_id: int) -> Dict[str, Any]:
        """
        Check the status of a tune.
        """
        try:
            response = requests.get(
                f"{self.base_url}/tunes/{tune_id}",
                headers=self.headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"❌ Error checking tune status: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return None
    
    def wait_for_training_completion(self, tune_id: int, max_wait_minutes: int = 30):
        """
        Wait for training to complete, checking status periodically.
        """
        print(f"⏳ Waiting for tune {tune_id} to complete training...")
        print("This usually takes 10-20 minutes...")
        
        start_time = time.time()
        max_wait_seconds = max_wait_minutes * 60
        
        while time.time() - start_time < max_wait_seconds:
            status = self.check_tune_status(tune_id)
            
            if status:
                if status.get('trained_at'):
                    print("🎉 Training completed!")
                    return True
                elif status.get('expires_at'):
                    print("❌ Training failed or expired")
                    return False
                else:
                    print(f"⏳ Still training... (elapsed: {int((time.time() - start_time) / 60)} minutes)")
            
            time.sleep(60)  # Check every minute
        
        print(f"⏰ Timeout after {max_wait_minutes} minutes")
        return False
    
    def create_prompt(self, tune_id: int, prompt_text: str, num_images: int = 4) -> Dict[str, Any]:
        """
        Create a prompt to generate images using the trained tune.
        """
        print(f"Creating prompt for tune {tune_id}")
        
        prompt_data = {
            "prompt": {
                "text": prompt_text,
                "num_images": num_images,
                "tune_id": tune_id
            }
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/prompts",
                headers=self.headers,
                json=prompt_data
            )
            
            if response.status_code == 201:
                result = response.json()
                print(f"✅ Prompt created successfully! Prompt ID: {result['id']}")
                return result
            else:
                print(f"❌ Error creating prompt: {response.status_code}")
                print(response.text)
                return None
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return None
    
    def check_prompt_status(self, prompt_id: int) -> Dict[str, Any]:
        """
        Check the status of a prompt and get generated images.
        """
        try:
            response = requests.get(
                f"{self.base_url}/prompts/{prompt_id}",
                headers=self.headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"❌ Error checking prompt status: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return None
    
    def wait_for_images(self, prompt_id: int, max_wait_minutes: int = 10):
        """
        Wait for image generation to complete.
        """
        print(f"⏳ Waiting for images to be generated...")
        
        start_time = time.time()
        max_wait_seconds = max_wait_minutes * 60
        
        while time.time() - start_time < max_wait_seconds:
            status = self.check_prompt_status(prompt_id)
            
            if status and status.get('images'):
                images = status['images']
                if len(images) > 0:
                    print(f"🎉 {len(images)} images generated!")
                    return images
            
            print(f"⏳ Still generating... (elapsed: {int((time.time() - start_time) / 60)} minutes)")
            time.sleep(30)  # Check every 30 seconds
        
        print(f"⏰ Timeout after {max_wait_minutes} minutes")
        return None
    
    def get_available_packs(self) -> List[Dict[str, Any]]:
        """
        Get available packs from Astria.
        """
        try:
            response = requests.get(
                f"{self.base_url}/gallery/packs",
                headers=self.headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"❌ Error getting packs: {response.status_code}")
                return []
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return []

def main():
    print("🤳 Simple Astria Headshot Generator")
    print("=" * 40)
    
    # Get API key
    api_key = input("Enter your Astria API key: ").strip()
    if not api_key:
        print("❌ API key is required!")
        return
    
    generator = AstriaHeadshotGenerator(api_key)
    
    # Get training images
    print("\n📸 Training Images Setup")
    print("You need at least 4 training images of yourself.")
    print("For best results:")
    print("- Use close-up photos of your face")
    print("- Only one person in each photo")
    print("- Various angles and expressions")
    print("- Good lighting")
    print("- No sunglasses or hats")
    
    num_images = int(input("\nHow many training images do you have? (minimum 4): "))
    if num_images < 4:
        print("❌ You need at least 4 images for good results!")
        return
    
    image_paths = []
    for i in range(num_images):
        path = input(f"Path/URL for training image {i+1}: ").strip()
        image_paths.append(path)
    
    # Upload/get URLs for training images
    training_urls = generator.upload_training_images(image_paths)
    
    # Get model details
    print("\n🎯 Model Configuration")
    model_name = input("Enter a name for your model: ").strip()
    person_type = input("Are you a 'man' or 'woman'? ").strip().lower()
    
    if person_type not in ['man', 'woman']:
        person_type = 'person'
    
    # Create tune
    print("\n🚀 Creating and training your model...")
    tune_result = generator.create_tune(model_name, training_urls, person_type)
    
    if not tune_result:
        print("❌ Failed to create tune")
        return
    
    tune_id = tune_result['id']
    
    # Wait for training
    print("\n⏳ Training your model...")
    if not generator.wait_for_training_completion(tune_id):
        print("❌ Training failed or timed out")
        return
    
    # Generate headshots
    print("\n📷 Generating your headshots...")
    
    # Predefined professional prompts
    prompts = [
        f"professional headshot of ohwx {person_type}, business attire, white background, high quality, 4k",
        f"corporate portrait of ohwx {person_type}, professional suit, office setting, linkedin style photo",
        f"executive headshot of ohwx {person_type}, formal business wear, studio lighting, clean background",
    ]
    
    all_images = []
    
    for i, prompt_text in enumerate(prompts, 1):
        print(f"\n🎨 Generating set {i}/3: {prompt_text[:50]}...")
        
        prompt_result = generator.create_prompt(tune_id, prompt_text, num_images=4)
        if prompt_result:
            prompt_id = prompt_result['id']
            images = generator.wait_for_images(prompt_id)
            if images:
                all_images.extend(images)
                print(f"✅ Generated {len(images)} images for set {i}")
    
    # Display results
    print(f"\n🎉 SUCCESS! Generated {len(all_images)} headshot images!")
    print("\n📁 Your headshot URLs:")
    print("=" * 50)
    
    for i, image_url in enumerate(all_images, 1):
        print(f"{i:2d}. {image_url}")
    
    print("\n💡 Tips:")
    print("- Right-click and 'Save image as...' to download")
    print("- Use these for LinkedIn, resumes, business cards, etc.")
    print("- The model will be available for future use with tune ID:", tune_id)
    
    # Save results to file
    results = {
        "tune_id": tune_id,
        "model_name": model_name,
        "generated_images": all_images,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    
    with open("headshot_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"\n💾 Results saved to 'headshot_results.json'")

if __name__ == "__main__":
    main()
