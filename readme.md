# Budget Management

## Overview

This project combines a Next.js web application, a Nest.js API, and a Dockerized database to create a modern web application called Budget Management. The Next.js app serves as the frontend user interface, while the Nest.js API acts as the backend to handle data and business logic. The Dockerized database provides persistent storage for the application.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
  - [Running Locally](#running-locally)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14 or later).
- Docker installed for running the database.
- Git for version control.
- Text editor or IDE of your choice.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LopohutDev/budget-management

   ```

2. Change to the project directory:

   ```bash
   cd budget-management

   ```

3. Install dependencies for the Next.js app:

   ```bash
   cd budget-management-app
   npm install

   ```

4. Install dependencies for the Nest.js API:

   ```bash
   cd budget-management-api
   npm install
   ```

## Development

### Running Locally

1. Start the Dockerized database:

   ```bash
   docker-compose up -d

   ```

2. Start the Nest.js API:

   ```bash
   cd budget-management-api
   npm run start:dev
   The API should now be accessible at http://localhost:4000.

   ```

3. Start the Next.js app:

   ```bash
   cd budget-management-app
   npm run dev
   The Next.js app should now be accessible at http://localhost:3000.
   ```
