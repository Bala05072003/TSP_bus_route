# Smart School Bus Routing System 🚌📍

A production-quality MVP for optimizing school bus routes using Traveling Salesman Problem (TSP) algorithms. Built with **Spring Boot** and **React**.

## 🌟 Features
- **Interactive Map**: Add student houses and school locations via an intuitive Leaflet map.
- **Multiple Algorithms**:
  - **Nearest Neighbor (Greedy)**: Fast, heuristic-based routing.
  - **Held-Karp (DP)**: Exact optimal results for smaller datasets.
  - **Brute Force**: Exhaustive search for absolute precision.
- **Real-time Visualization**: Smooth animations showing the bus traveling through the optimized path.
- **Route Stats**: Instant calculation of total distance and estimated travel time.

## 🚀 Tech Stack
- **Frontend**: React 19, Vite, TailwindCSS, Framer Motion, Leaflet.
- **Backend**: Java 17+, Spring Boot 3.3, Maven.
- **Design**: Premium Dark Mode UI with Glassmorphism and Lucide icons.

## 🛠️ Setup & Installation

### Prerequisites
- Java 17 or higher
- Node.js & npm

### Backend
1. Navigate to `backend/`
2. Run `./mvnw spring-boot:run`

### Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Run `npm run dev`

## 🌍 Hosting
Refer to [GITHUB_HOSTING_GUIDE.md](./GITHUB_HOSTING_GUIDE.md) for detailed instructions on deploying to Vercel (Frontend) and Render (Backend).

## 📝 License
MIT
