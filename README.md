# 🎥 Movie Explorer Project

[![React Application](https://img.shields.io/badge/React-v18.2.0-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v4.0.0-green)](https://vitejs.dev/)


A movie discovery application that lets users search for movies, view details, and keep track of watched films with ratings.

---


## 🎬 Features
- 🔍 Real-time movie search with debounced API calls
- 🎥 Detailed movie information display (Plot, Cast, Ratings)
- ⭐ User rating system for watched movies
- 📚 Watched movies library with sorting and filtering
- 📱 Responsive design for mobile and desktop
- 💾 Local storage persistence

---

## 🧰 Tech Stack

| Layer          | Technology                    | Purpose                                                                 |
|----------------|-------------------------------|-------------------------------------------------------------------------|
| Framework      | React 18.2.0                  | Component-based UI development for the movie explorer application       |
| Build Tool     | Vite 4.0.0                    | High-performance build tool and development server for rapid iteration  |
| State Management | React Hooks                 | Client-side state management and data flow between components           |
| Architecture   | JavaScript ES6+ Modules       | Modular, maintainable codebase organized using standard JavaScript modules |
| Styling        | CSS                           | Scalable stylinCSS variables          |
| API Integration| OMDb API                      | Integration with external movie database for search and details         |
| Data Storage   | Web Storage API (localStorage)| Persistent watched movie tracking and user preferences                |
| Code Quality   | ESLint & Prettier             | Code consistency and formatting standards                               |

---

## 📦 Project Structure
```bash
├── public/             # Static assets (Vite.svg)
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── NavBar/     # Navigation and search UI
│   │   ├── MovieList/  # Display movie grid/cards
│   │   ├── Watched/    # Watched movies section
│   │   └── StarRating/ # Custom rating component
│   ├── hook/           # Custom hooks (useMovie.js)
│   ├── assets/         # Application images and icons
│   ├── style/          # Global styles and CSS variables
│   ├── App.jsx         # Main application component
│   └── main.jsx        # React entry point
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 📦 Installation
1. Clone the repository
```bash
git clone https://github.com/your-username/movie-project.git
```

2. Install dependencies
```bash
npm install
```

### ▶️ Development Server
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) to see the application in action.

### 🧪 Building for Production
```bash
npm run build
```

### 🧾 Linting & Formatting
```bash
npm run lint
npm run format
```

---

## 📝 Usage Instructions
1. **Search Movies**: Type in the search bar to find movies by title
2. **View Details**: Click on any movie poster to view detailed information
3. **Track Watched Movies**: 
   - Add movies to your watchlist by clicking "Add to list"
   - Rate movies with the star rating component
4. **Manage Watched List**:
   - Remove movies with the delete button
   - See summary statistics with average ratings

---

## 📦 API Used
This project uses the [OMDb API](http://www.omdbapi.com/) (Free tier) for movie data.

---

## 🛠️ Custom Hooks
### `useMovie(query)`
A custom hook that handles movie data fetching and caching:
- Debounces search input
- Manages loading and error states
- Provides caching mechanism

---

