import pandas as pd
import random

# Load real movie titles from your dataset
movies_df = pd.read_csv("labeled_movies.csv")  # <- Ensure this file exists here
movies = movies_df["title"].dropna().unique().tolist()

moods = ["happy", "sad", "chill", "thrilled"]
companies = ["alone", "partner", "friends", "family", "kids"]
genres_list = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance"]
ratings_list = ["G", "PG", "PG-13", "R", "NC-17"]
release_ranges = ["classic", "older", "mid", "recent"]
occasions = ["casual", "party", "date", "holiday", "birthday", "me-time"]

data = []

for _ in range(500):  # generate 500 quiz-response examples
    mood = random.choice(moods)
    company = random.choice(companies)
    genres = random.sample(genres_list, k=random.randint(1, 3))
    ratings = random.sample(ratings_list, k=random.randint(1, 2))
    release = random.choice(release_ranges)
    occasion = random.choice(occasions)
    liked_movie = random.choice(movies)

    data.append({
        "mood": mood,
        "company": company,
        "genres": ",".join(genres),
        "ratings": ",".join(ratings),
        "releaseRange": release,
        "occasion": occasion,
        "liked_movie": liked_movie
    })

df = pd.DataFrame(data)
df.to_csv("synthetic_training_data.csv", index=False)
print("✅ synthetic_training_data.csv generated using real movie titles.")
