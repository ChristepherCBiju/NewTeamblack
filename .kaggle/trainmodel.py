import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from joblib import dump


df = pd.read_csv("synthetic_training_data.csv")

features = ["mood", "company", "genres", "ratings", "releaseRange", "occasion"]
X = df[features]
y = df["liked_movie"]

for col in ["genres", "ratings"]:
    X.loc[:, col] = X[col].apply(lambda x: ",".join(sorted(set(str(x).split(",")))))


preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), features)
    ]
)

model_pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42))
])


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model_pipeline.fit(X_train, y_train)


dump(model_pipeline, "movie_recommender_model.joblib")

print("✅ Model trained and saved as movie_recommender_model.joblib")

accuracy = model_pipeline.score(X_test, y_test)
print(f"🎯 Accuracy: {accuracy:.2f}")
