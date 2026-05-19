import os
import re
import string
import pandas as pd
import nltk
import joblib

from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.metrics.pairwise import cosine_similarity  # Untuk simulasi ranking
from imblearn.over_sampling import RandomOverSampler
from imblearn.pipeline import Pipeline

# Download resource stopwords dari NLTK
nltk.download('stopwords')

# ====================================================================
# 📂 1. LOAD DATASET CSV MILIK ABANG
# ====================================================================
# Jalur path disesuaikan dengan posisi file CSV Abang
CSV_PATH = "../../backend/Dataset jamu madura(with img).csv"

if not os.path.exists(CSV_PATH):
    print(f"❌ File tidak ditemukan di: {CSV_PATH}")
    print("Silakan sesuaikan kembali letak string CSV_PATH jika posisinya bergeser, Bang!")
    exit()

df = pd.read_csv(CSV_PATH)
df = df.dropna(subset=['KHASIAT']).reset_index(drop=True)
print(f"✅ Berhasil memuat dataset. Jumlah data setelah drop row kosong: {len(df)}")


# ====================================================================
# 🏷️ 2. LOGIKA LABELLING OTOMATIS BERDASARKAN KATA KUNCI KHASIAT
# ====================================================================
def labeling(text):
    text = str(text).lower()
    if any(k in text for k in [
        'stamina','tenaga','energi','lelah','capek','letih','lesu','loyo',
        'ejakulasi','perkasa','kejantanan','sperma','vitalitas','daya tahan',
        'kuat','kebugaran','fit','tidak mudah capek','menambah tenaga',
        'bab','buang air besar','nafsu makan','maag','asam lambung',
        'lemak','diet','kolesterol','berat badan','melangsingkan',
        'pelangsing','gemuk','kurus','metabolisme','pencernaan',
        'kembung','mual','perut','lambung','pegal','linu',
        'nyeri','rematik','encok','sendi','otot',
        'demam','flu','batuk','pilek',
        'diabetes','hipertensi','imun',
        'asma','ginjal','jantung','radang'
    ]):
        return 'stamina'

    elif any(k in text for k in [
        'keputihan','vagina','rahim','haid','menstruasi',
        'asi','kandungan','organ intim','hormonal'
    ]):
        return 'kesehatan_wanita'

    elif any(k in text for k in [
        'kulit','wajah','jerawat','komedo','cerah','halus',
        'glowing','keriput','flek','cantik',
        'gatal','alergi','jamur','eksim','panu',
        'bau badan','bau mulut','keringat'
    ]):
        return 'perawatan'
    else:
        return 'lainnya'

# Terapkan fungsi pelabelan kelompok kategori
df['label'] = df['KHASIAT'].apply(labeling)


# ====================================================================
# 🧽 3. CUSTOM TEXT PREPROCESSOR CLASS (SKLEARN COMPATIBLE)
# ====================================================================
class TextPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.stop_words = set(stopwords.words('indonesian'))
        # 🔥 Menambahkan kata 'melalui' sebagai stopword wajib sesuai kebutuhan proyek
        self.stop_words.add('melalui')

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        return [self.clean_text(text) for text in X]

    def clean_text(self, text):
        text = str(text).lower()
        text = re.sub(r'http\S+|www\S+', '', text)  # Hapus URL
        text = re.sub(r'\d+', '', text)             # Hapus angka
        text = text.translate(str.maketrans('', '', string.punctuation)) # Hapus tanda baca
        text = re.sub(r'\s+', ' ', text).strip()    # Hapus spasi berlebih
        tokens = text.split()
        tokens = [w for w in tokens if w not in self.stop_words] # Filter stopword
        return " ".join(tokens)


# ====================================================================
# 🏋️ 4. PROSES SPLIT DATA & TRAINING MACHINE LEARNING PIPELINE
# ====================================================================
X = df['KHASIAT']
y = df['label']

# Split data (90% Training, 10% Testing)
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.1,
    random_state=42,
    stratify=y
)

# Susun Pipeline Imbalanced-Learn (Preprocessing -> TFIDF -> OverSampling -> Naive Bayes)
pipeline = Pipeline([
    ('prep', TextPreprocessor()),
    ('tfidf', TfidfVectorizer()),
    ('ros', RandomOverSampler(random_state=42)),
    ('nb', MultinomialNB())
])

print("\n🏋️ Sedang melatih model pipeline Machine Learning...")
pipeline.fit(X_train, y_train)

# Evaluasi performa akurasi klasifikasi model
y_pred = pipeline.predict(X_test)
print("\n======================= 📊 HASIL EVALUASI MODEL =======================")
print(classification_report(y_test, y_pred))
print("=======================================================================")


# ====================================================================
# 💾 5. PROSES CETAK EXPORT KE FILE .PKL (SAVING MODEL)
# ====================================================================
OUTPUT_NAME = "model_pipeline.pkl"
joblib.dump(pipeline, OUTPUT_NAME)
print(f"\n🚀 BOOM! Berkas sakti berhasil dicetak ➔ '{OUTPUT_NAME}'")


# ====================================================================
# 🧪 6. SIMULASI UJI INFERENCE LANGSUNG (CEK TYPO + RANKING TOP 10)
# ====================================================================
def typo_correction(text):
    kamus_typo = {
        "sya": "saya", "pegel": "pegal", "bdan": "badan", "capek": "capai",
        "bnyak": "banyak", "utk": "untuk", "dgn": "dengan", "yg": "yang",
        "smbuh": "sembuh", "skit": "sakit", "kpl": "kepala", "lsh": "lesu",
        "perot": "perut", "kmbug": "kembung", "niri": "nyeri", "lunu": "linu"
    }
    words = text.lower().split()
    corrected_words = [kamus_typo.get(w, w) for w in words]
    return " ".join(corrected_words)

print("\n\n====================== 🔎 SIMULASI UJI COBA MODEL ======================")
# Test string dengan typo kompleks
text_uji_coba = "sya sering perot kmbug dan niri bdan"

# Jalankan anti-typo
text_bersih_typo = typo_correction(text_uji_coba)

# Prediksi Kategori Utama via Pipeline .pkl yang baru dibuat
label_hasil = pipeline.predict([text_bersih_typo])[0]
skor_probabilitas = pipeline.predict_proba([text_bersih_typo]).max()

print(f"Input User Mentah : {text_uji_coba}")
print(f"Setelah Anti-Typo : {text_bersih_typo}")
print(f"Prediksi Kategori : {label_hasil} (Confidence: {skor_probabilitas:.4f})")
print("========================================================================\n")

# Perhitungan Matematika Cosine Similarity internal untuk meranking Top 10
transformer_prep = pipeline.named_steps['prep']
transformer_tfidf = pipeline.named_steps['tfidf']

# Ekstrak matriks vektor khasiat dataset
dataset_clean = transformer_prep.transform(df['KHASIAT'])
matrix_dataset = transformer_tfidf.transform(dataset_clean)

# Ekstrak matriks vektor input user
query_clean = transformer_prep.transform([text_bersih_typo])
matrix_query = transformer_tfidf.transform(query_clean)

# Hitung bobot kedekatan teks
skor_sim = cosine_similarity(matrix_query, matrix_dataset).flatten()
df['skor_matching'] = skor_sim

# Ambil 10 baris dengan nilai kemiripan tertinggi
df_top_10 = df.sort_values(by='skor_matching', ascending=False).head(10)

# ====================================================================
# 🏆 SELESAI! GANTI BAGIAN PRINT RANKING PALING BAWAH DENGAN INI
# ====================================================================
print("🏆 HASIL RANKING TOP 10 PRODUK JAMU TERDEKAT DI TERMINAL:")
print("-" * 80)

# Menggunakan iterrows() agar bisa membaca nama kolom yang menggunakan spasi
for urutan, (idx, data_row) in enumerate(df_top_10.iterrows(), 1):
    nama_jamu = data_row['NAMA JAMU']
    khasiat   = data_row['KHASIAT']
    skor      = data_row['skor_matching']
    
    print(f"{urutan}. [{nama_jamu}] | Skor: {skor:.4f}")
    print(f"   🎯 Khasiat: {khasiat}")
    print("-" * 80)