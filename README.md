# 📽️ PopcornPix

PopcornPix is a full-stack movie recommendation web application that suggests movies to users based on data analysis and machine learning. It integrates a React frontend, a Node.js backend, and Python-based machine learning models trained on real-world movie datasets.

## 📌 Features

- 🎬 Movie recommendation system using trained ML models.
- 📊 Backend with MongoDB for storing user data and predictions.
- ⚛️ Frontend built with Vite + React for a fast and interactive UI.
- 📁 Integration with Kaggle dataset and joblib model for predictions.

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- HTML/CSS/JS

**Backend**
- Node.js
- Express.js
- MongoDB

**Machine Learning**
- Python
- scikit-learn, joblib, pandas
- Kaggle movie dataset

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.x
- MongoDB
- Kaggle API key

## 📦 Installation

### Clone the repository
```bash
git clone https://github.com/ChristepherCBiju/NewTeamblack.git
cd NewTeamblack
```

### Install Frontend Dependencies
```bash
cd Frontend
npm install
npm run dev
```

### Install Backend Dependencies
```bash
cd ../Backend
npm install
node Index.js
```

### Setup Machine Learning Environment
```bash
cd ../.kaggle
pip install -r requirements.txt  # if requirements file exists
python trainmodel.py            # to train the model
python app.py                   # to serve predictions
```

## 📂 Project Structure
```
NewTeamblack/
├── Backend/              # Node.js backend code
│   ├── Index.js
│   ├── Model.js
│   ├── UserModel.js
├── Frontend/             # React frontend (Vite)
│   ├── src/
│   ├── index.html
├── .kaggle/              # ML model and Kaggle data
│   ├── movie_recommender_model.joblib
│   ├── trainmodel.py
│   ├── app.py
```

## 🧠 Machine Learning

- Trained using `trainmodel.py` with `labeled_movies.csv`.
- The final model is saved as `movie_recommender_model.joblib`.
- Flask or similar can be used in `app.py` to serve the model.

## 🧪 Example Usage

Once the services are running:

1. Go to [http://localhost:3000](http://localhost:3000) (React app).
2. Enter your preferences.
3. Receive personalized movie recommendations!
