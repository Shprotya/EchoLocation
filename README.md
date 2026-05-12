# Echo-Location

**Echo-Location** is a web application designed to break music "echo chambers" by allowing users to explore trending music across the globe through an interactive map. By clicking on a country or using the search bar, users can instantly discover the top 10 most-listened-to tracks in that region.

## 🚀 Key Features

* **Interactive World Map**: Powered by Leaflet.js and GeoJSON, allowing users to click and highlight specific countries to fetch local music data.
* **Real-time Music Discovery**: Integrates with the Last.fm API to retrieve the top 10 trending tracks for any selected country.
* **Exploration History**: Automatically saves your musical journey to a MongoDB database, allowing you to revisit previously explored countries and their top tracks.
* **Country Search**: A dedicated search bar with "flyTo" animations to find and highlight countries by name.
* **Fully Responsive UI**: Built with Tailwind CSS, featuring a collapsible sidebar for a seamless experience on both desktop and mobile.

## 🏗️ Architecture

The application follows a robust three-tier architecture:

* **Frontend**: Angular application hosted as a static website on **Amazon S3**.
* **Backend**: Express.js server running on an **Amazon EC2** instance (t3.micro), facilitating communication with the database.
* **Database**: **MongoDB Atlas** cloud-hosted NoSQL database for persistent storage of exploration history.

## 🛠️ Tech Stack

* **Frontend**: Angular (v17+), TypeScript, Tailwind CSS, Leaflet.js.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB.
* **APIs**: Last.fm (geo.getTopTracks).
* **DevOps**: Amazon S3, Amazon EC2, PM2.

## 🔧 Key Technical Decisions

* **Angular Signals**: Used for modern, reactive state management across components like `CountryService`.
* **GeoJSON Integration**: Replaced traditional reverse geocoding with a GeoJSON world dataset to enable instant country detection and visual highlighting upon clicking the map.
* **ISO Country Mapping**: Utilized the `i18n-iso-countries` package to ensure country names from the map match the specific format required by the Last.fm API.

## 💻 Getting Started

### Prerequisites
* Node.js (v20 recommended)
* MongoDB Atlas account
* Last.fm API Key

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables in a `.env` file for the backend and `environment.ts` for the frontend.

### Running the Application
To start both the Angular development server and the Express backend simultaneously, use the following command:
```bash
npm run dev