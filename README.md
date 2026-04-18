# CineSearch - Professional Movie Search App

CineSearch is a modern, high-performance movie discovery platform built with React, Tailwind CSS, and the OMDb API. It offers a cinematic experience for exploring movies, TV series, and more.

## Features

- **Dynamic Search**: Instantly find titles using keywords or exact names.
- **Advanced Filtering**: Narrow down results by type (Movie, Series, Episode) directly via API query parameters.
- **Detailed Insights**: View comprehensive details including plot, cast, ratings, box office performance, and more.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Modern UI/UX**: Built with a "dark luxury" cinematic aesthetic, featuring smooth animations powered by Motion (Framer Motion).
- **Pagination**: Efficiently browse through large result sets.

## Tech Stack

- **Framework**: React 19 (JavaScript)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Data Source**: OMDb API

## Getting Started

1. Set up your OMDb API key in `.env`.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Implementation Details

- **No client-side filtering**: All data filtering (type) is handled by the OMDb API parameters, ensuring better performance and accurate results.
- **Error Handling**: Robust error boundaries and user-friendly messages for API failures or missing data.
- **Performance**: Optimized images and lazy-loaded route components for a smooth experience.

---
Built with ❤️ for movie enthusiasts.
