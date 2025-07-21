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
    X[col] = X[col].astype(str).apply(lambda x: ",".join(sorted(set(x.split(",")))))

preprocessor = ColumnTransformer(
    transformers=[("cat", OneHotEncoder(handle_unknown="ignore"), features)]
)

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_train, y_train)

dump(pipeline, "movie_recommender_model.joblib")
print("✅ Model trained and saved.")
