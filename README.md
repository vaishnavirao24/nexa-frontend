```md
# Nexa

Nexa is an AI-powered video intelligence system that analyses uploaded videos and returns structured prediction results through a simple, modern web interface.

**Live Website:** https://hello-nexa.vercel.app/

---

## What Nexa Does

- Lets users upload a video from the browser
- Runs AI inference on the server
- Returns prediction outputs in a structured format
- Presents results through a clean and responsive UI

---

## How It Works (High Level)

1. A user uploads a video on the website  
2. The video is sent to the inference service via an API request (file upload)  
3. The backend processes the video using an AI pipeline  
4. The system returns a JSON response containing prediction results  
5. The UI displays the output in a readable format

---

## Technology Used

- **Web Interface:** React (Vite), TypeScript, Tailwind CSS, shadcn/ui  
- **Inference Service:** Python, FastAPI, Uvicorn  
- **AI / Media Pipeline:** PyTorch, OpenCV, NumPy, Pillow  
- **Deployment:** Website on Vercel, inference service deployed as a live API

---

## Highlights

- Real deployment (not a notebook-only demo)
- Clean API-driven inference workflow
- Responsive UI designed for straightforward usage
- Service health monitoring endpoint for reliability

---

## Roadmap

- Improved result visualisation and UX polish
- Faster inference and better performance
- Stronger error reporting and observability

---

## Author

**Sree Vaishnavi Rao**  
GitHub: https://github.com/vaishnavirao24

---

## License

Intended for learning, experimentation, and portfolio demonstration.
```
