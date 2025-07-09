import pandas as pd

# Load the labeled CSV
df = pd.read_csv("labeled_movies.csv")

# Clean rows where title is missing
df = df.dropna(subset=["title"])

# Save to JSON format for MongoDB import
df.to_json("labeled_movies.json", orient="records", lines=True)

print("✅ labeled_movies.json created successfully.")
