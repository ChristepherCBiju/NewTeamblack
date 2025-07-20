from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
model = load("movie_recommender_model.joblib")

@app.route("/", methods=["GET"])
def home():
    return " Movie ML API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

     
        input_df = pd.DataFrame([data])

        
        proba = model.predict_proba(input_df)[0] 
        top_n = np.argsort(proba)[::-1][:5]       
        recommendations = model.classes_[top_n]   

        return jsonify({"recommendation": recommendations.tolist()})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
