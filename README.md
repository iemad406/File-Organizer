📂 File Organizer API

A RESTful API built with Python and Flask that automates file organization by categorizing files into structured directories based on their extensions.

🚀 Project Overview

Managing messy directories can be time-consuming. This API simplifies the process by automatically scanning a given folder and organizing files into categorized subfolders such as Documents, Images, Videos, and more.

This project highlights backend development skills including API design, file handling, and system automation.

✨ Key Features
📁 Automatic file organization by type
⚡ Fast and lightweight REST API
🔄 Handles dynamic directory paths
❌ Robust error handling for invalid inputs
🧪 Tested using Postman
🧩 Modular and clean code structure
🛠️ Tech Stack
Python 3
Flask
OS / Shutil (File System Handling)
Postman (API Testing)
📌 API Usage
🔹 Endpoint

POST /api/organizer

🔹 Request Example
{
  "path": "C:/Users/YourName/Downloads"
}
🔹 Response Example
{
  "status": "success",
  "message": "Files organized successfully"
}
⚙️ How It Works
Receive directory path via API request
Scan all files in the directory
Classify files based on extension
Create folders if they don’t exist
Move files into their respective categories
📁 Example
Before:
Downloads/
  report.pdf
  photo.png
  video.mp4
After:
Downloads/
  Documents/
    PDF/
       report.pdf
  Images/
    PNG/
       photo.png
