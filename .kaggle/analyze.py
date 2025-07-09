import pandas as pd

df = pd.read_csv(
    "C:/Users/cryog/.cache/kagglehub/datasets/rounakbanik/the-movies-dataset/versions/7/movies_metadata.csv",
    low_memory=False
)

print(df.head())