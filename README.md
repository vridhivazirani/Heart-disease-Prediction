# ❤️ Heart Disease Risk Prediction System

A browser-based heart disease risk predictor built with HTML, CSS, and JavaScript — **no server required**.

> **Woxsen University · B.Tech CSE (Data Science) | 2026**
> Team: Kashish Mohammad · Vridhi Vazirani · Jaaswanth Chikkala · Mahadev · Mohith

---

## 🌐 Live Demo

Open `index.html` directly in any modern browser — no installation needed.

---

## 🧠 How It Works

The prediction runs entirely **in the browser** using a Logistic Regression model trained on the **UCI Cleveland Heart Disease Dataset** (303 patients, 13 clinical features).

| Feature | Description |
|---|---|
| Age | Patient age in years |
| Sex | Biological sex (Male / Female) |
| Chest Pain Type | Typical angina / Atypical / Non-anginal / Asymptomatic |
| Resting BP | Resting blood pressure (mm Hg) |
| Cholesterol | Serum cholesterol (mg/dl) |
| Fasting Blood Sugar | > 120 mg/dl (Yes / No) |
| Resting ECG | Normal / ST-T abnormality / LVH |
| Max Heart Rate | Maximum heart rate achieved (bpm) |
| Exercise Angina | Exercise-induced angina (Yes / No) |
| ST Depression (Oldpeak) | ST depression induced by exercise |
| ST Slope | Upsloping / Flat / Downsloping |
| Major Vessels | # of major vessels coloured by fluoroscopy (0–3) |
| Thalassemia | Normal / Fixed defect / Reversible defect |

### Algorithms Used
`Logistic Regression` · `SVM (RBF)` · `Decision Tree` · `Random Forest`

---

## 📊 Dataset

- **Source:** UCI Machine Learning Repository — Cleveland Heart Disease Dataset  
- **Samples:** 303 patients  
- **Target:** Binary (0 = No Disease, 1 = Disease)

---

## 🚀 Getting Started

```bash
git clone https://github.com/vridhivazirani/Heart-disease-Prediction.git
cd Heart-disease-Prediction
open index.html   # or double-click in Finder
```

---

## 📁 Project Structure

```
Heart-disease-Prediction/
├── index.html          # Main website (hero, form, result card, about)
├── style.css           # Medical-themed UI (cream/red palette, animations)
├── script.js           # In-browser Logistic Regression predictor + gauge
└── requirements.txt    # Python deps (for optional offline model training)
```

---

## ⚠️ Disclaimer

This tool is for **educational purposes only**. It is not a substitute for professional medical advice. Always consult a qualified physician for health-related decisions.