# Manufacturing Execution System (MES) with Docker

## Overview
This project implements a Manufacturing Execution System (MES) to manage production tracking and quality control, built using Vue.js for the frontend and Express.js for the backend. The system integrates with a PostgreSQL database, and the entire application is containerized using Docker.

## Features
- **Production Tracking:** Track production status, quantity, and other relevant details. Performs CRUD operation
- **Quality Control:** Schedule and track quality control inspections, flag defects, and see the flagged lists.
- **Real-time Updates:** Real-time updates for production data using axios communication.

## Technologies
- **Frontend:** Vue.js, Tailwind CSS, ChartJs
- **Backend:** Express.js
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Setup Instructions

### Prerequisites
- Docker and Docker Compose should be installed on your machine. Follow the installation guide on [Docker's official site](https://docs.docker.com/get-docker/).

### Running the Application

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sonu-yadavv/mes-system.git
   cd mes-system
