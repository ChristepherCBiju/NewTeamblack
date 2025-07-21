from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load("movie_recommender_model.joblib")
movies_df = pd.read_csv("labeled_movies.csv")

@app.route("/", methods=["GET"])
def home():
    return "✅ ML API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        input_df = pd.DataFrame([data])
        proba = model.predict_proba(input_df)[0]
        top_n = np.argsort(proba)[::-1][:5]
        recommended_titles = model.classes_[top_n]

        results = []
        for title in recommended_titles:
            movie = movies_df[movies_df["title"] == title].iloc[0]
            results.append({
                "title": movie["title"],
                "genres": movie["genres"],
                "overview": movie["overview"],
                "poster_path": movie["poster_path"]
            })

        return jsonify({"recommendation": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
