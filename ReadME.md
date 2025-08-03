# Fleet Management Dashboard (Real-Time GPS + Maintenance Alerts)

## Overview
The Fleet Management Dashboard is a full-stack web application designed to monitor and manage a fleet of vehicles in real time. It supports live GPS tracking, vehicle status monitoring, and rule-based maintenance alerts. The system simulates vehicle telemetry and updates a live map using WebSockets, MongoDB, and MapLibre GL JS. This project showcases scalable architecture, real-time data handling, and proactive fleet management capabilities.

## Features
- **Real-Time GPS Tracking**: Visualizes simulated vehicle positions on a live map using MapLibre GL JS.
- **Vehicle Telemetry**: Simulates and updates telemetry data such as speed, fuel level, and mileage.
- **Maintenance Alerts**: Automatically generates alerts when vehicles exceed service thresholds.
- **WebSocket Integration**: Pushes live updates from the backend to all connected clients.
- **Vehicle History Logging**: Persists vehicle movement and maintenance data to MongoDB.
- **Docker Support**: Containerized application for consistent environment setup.

## Technologies Used
- **Frontend**: React, MapLibre GL JS
- **Backend**: Node.js, Express.js, WebSocket (`ws`)
- **Database**: MongoDB (Mongoose)
- **Other Tools**: Docker, dotenv, Nodemon



