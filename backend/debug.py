import pandas as pd

# Load dataset
df = pd.read_csv('Dataset jamu madura(with img).csv')

# =========================
# DETEKSI MISSING VALUE
# =========================

# Jumlah missing value tiap kolom
missing = df.isnull().sum()

print("Jumlah Missing Value Tiap Kolom:")
print(missing)

# =========================
# PERSENTASE MISSING VALUE
# =========================

persentase = (df.isnull().sum() / len(df)) * 100

print("\nPersentase Missing Value:")
print(persentase)

# =========================
# MENAMPILKAN HANYA KOLOM
# YANG ADA MISSING VALUE
# =========================

missing_only = missing[missing > 0]

print("\nKolom yang memiliki missing value:")
print(missing_only)

# =========================
# TOTAL SEMUA MISSING VALUE
# =========================

total_missing = df.isnull().sum().sum()

print("\nTotal semua missing value:", total_missing)