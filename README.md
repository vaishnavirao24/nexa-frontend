# Nexa

An AI-powered video intelligence system that turns uploaded videos into structured prediction results through a fast, clean web experience.

**Live Website:** https://hello-nexa.vercel.app/

---

## Why Nexa

Most ML projects stop at notebooks. Nexa is built around a real usage workflow:
**Upload → Inference → Structured Output → Clear UI**

It is designed to be simple for users and clean for engineering iteration.

---

## What Nexa Does

- Accepts video uploads directly from the browser
- Runs server-side AI inference on the uploaded video
- Returns prediction results in a structured JSON format
- Displays outputs in a readable, user-friendly interface

---

## How It Works

User uploads a video  
↓  
Website sends the video to the inference API (multipart/form-data)  
↓  
Backend runs the AI pipeline on the video  
↓  
Backend returns structured prediction JSON  
↓  
Website renders results for the user  

---

## Core Capabilities

- Simple upload flow designed for real users
- API-driven inference (clean request/response contract)
- Structured outputs suitable for UI rendering and future extensions
- Deployed workflow (not limited to local execution)

---

## Technology Used

- **Web Interface:** React (Vite), TypeScript, Tailwind CSS, shadcn/ui
- **Inference Service:** Python, FastAPI, Uvicorn
- **AI / Media Pipeline:** PyTorch, OpenCV, NumPy, Pillow
- **Deployment:** Website on Vercel + inference service deployed as a live API

---

## Engineering Notes

- Designed to keep the UI stable while the inference pipeline evolves
- Backend includes health monitoring to support reliability checks
- Deployment configured for CPU-compatible inference environments

---

## Roadmap

- Better result visualisation (confidence, summaries, richer UI)
- Faster inference performance and improved throughput
- Improved error reporting and observability (logs, request tracing)
- Stronger API contract validation to prevent frontend breakages

---

## Author

**Vaishnav Rao**  
GitHub: https://github.com/vaishnavirao24
