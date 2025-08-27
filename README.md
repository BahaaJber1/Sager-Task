# Sager Drone Task

A full-stack project for real-time drone monitoring and analytics.  
Includes a backend server that streams live drone data via Socket.IO and a modern React frontend for visualization.

<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/5d0f1ef6-4ee2-44ab-b8ae-26e9d87c5e26" />

<img width="1914" height="904" alt="image" src="https://github.com/user-attachments/assets/8649b362-367a-40f8-96fe-e39b8974fbdc" />

<img width="1916" height="912" alt="image" src="https://github.com/user-attachments/assets/ab1756ef-feb0-443c-8d00-0ba2b583cc68" />



---

## Project Structure

```
Sager-Task-Backend/
  ├── index.js
  ├── package.json
  ├── utils/
  │   └── socketUtils.js
  └── README.md

Sager-Task-Frontend/
  ├── src/
  │   ├── App.jsx
  │   ├── main.jsx
  │   ├── index.css
  │   ├── context/
  │   │   ├── DronesContext.jsx
  │   │   └── useDronesData.js
  │   ├── components/
  │   ├── features/
  │   │   └── map/
  │   │       ├── components/
  │   │       ├── hooks/
  │   │       └── utils/
  │   └── pages/
  ├── public/
  ├── package.json
  ├── vite.config.js
  ├── README.md
  └── index.html
```

---

## Features

- **Backend:**  
  - Streams simulated drone geo-location and telemetry data via Socket.IO.
  - See [`Sager-Task-Backend/index.js`](Sager-Task-Backend/index.js) and [`Sager-Task-Backend/utils/socketUtils.js`](Sager-Task-Backend/utils/socketUtils.js).

- **Frontend:**  
  - Real-time dashboard and map visualization of drones.
  - Displays drone stats, flight paths, and authorization status.
  - Built with React, Vite, TailwindCSS, and Mapbox GL.
  - See [`Sager-Task-Frontend/src/App.jsx`](Sager-Task-Frontend/src/App.jsx), [`Sager-Task-Frontend/src/context/DronesContext.jsx`](Sager-Task-Frontend/src/context/DronesContext.jsx), and [`Sager-Task-Frontend/src/context/useDronesData.js`](Sager-Task-Frontend/src/context/useDronesData.js).

---

## Getting Started

### 1. Backend

```sh
cd Sager-Task-Backend
npm install
npm start
```
- Starts the Socket.IO server on port `9013`.

### 2. Frontend

```sh
cd Sager-Task-Frontend
npm install
npm run dev
```
- Starts the React app on [localhost:5173](http://localhost:5173) (default Vite port).

---

## How It Works

- The backend emits a `message` event every second with simulated drone data.
- The frontend connects to the backend via Socket.IO, accumulates drone features, deduplicates by registration, and tracks flight paths.
- The dashboard displays live stats and a preview map.
- The map page shows real-time drone positions and flight paths, color-coded by authorization.

---

## Technologies

- **Backend:** Node.js, Express, Socket.IO
- **Frontend:** React, Vite, TailwindCSS, Mapbox GL

---

## License

MIT

---

## Author

Bahaa Jber
