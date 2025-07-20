import pandas as pd
from textblob import TextBlob

path = "C:/Users/cryog/.cache/kagglehub/datasets/rounakbanik/the-movies-dataset/versions/7/movies_metadata.csv"
df = pd.read_csv(path, low_memory=False)

genre_to_mood = {
    "Comedy": "happy",
    "Drama": "sad",
    "Romance": "romantic",
    "Thriller": "thrilled",
    "Action": "intense",
    "Fantasy": "chill",
    "Horror": "thrilled",
    "Animation": "happy",
    "Adventure": "curious"
}

def guess_mood_by_genre(genres):
    if not isinstance(genres, str):
        return "chill"
    for g, mood in genre_to_mood.items():
        if g.lower() in genres.lower():
            return mood
    return "chill"

def sentiment_mood(overview):
    if not isinstance(overview, str) or overview.strip() == "":
        return "chill"
    polarity = TextBlob(overview).sentiment.polarity
    if polarity > 0.4:
        return "happy"
    elif polarity < -0.3:
        return "sad"
    else:
        return "intense"

df["genre_mood"] = df["genres"].apply(guess_mood_by_genre)
df["overview_mood"] = df["overview"].apply(sentiment_mood)

def combine_moods(row):
    if row["overview_mood"] in ["happy", "sad"]:
        return row["overview_mood"]
    return row["genre_mood"]

df["final_mood"] = df.apply(combine_moods, axis=1)

df[["title", "genres", "overview", "final_mood"]].to_csv("labeled_movies.csv", index=False)

print("✅ Movies labeled with mood and saved to labeled_movies.csv")
