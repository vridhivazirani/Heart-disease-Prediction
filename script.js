/**
 * Heart Disease Risk Prediction — In-browser Logistic Regression
 *
 * Weights derived from the UCI Cleveland Heart Disease dataset.
 * Model: Logistic Regression with StandardScaling applied.
 *
 * Features (order matters):
 *   age, sex, cp, trestbps, chol, fbs, restecg,
 *   thalach, exang, oldpeak, slope, ca, thal
 */

// ---- Pre-trained parameters ------------------------------------------------
// StandardScaler parameters (mean & std) fitted on the Cleveland dataset
const SCALER_MEAN = [54.37, 0.683, 0.967, 131.62, 246.69, 0.149, 0.530,
                     149.60, 0.327, 1.040, 1.399, 0.730, 2.314];

const SCALER_STD  = [9.082, 0.466, 1.032, 17.538, 51.777, 0.356, 0.526,
                     22.875, 0.470, 1.161, 0.616, 1.023, 0.612];

// Logistic regression weights (bias first, then one per feature)
const LR_BIAS    = -0.074;
const LR_WEIGHTS = [
  -0.302,  // age
  -0.498,  // sex
  -0.713,  // cp
   0.216,  // trestbps
   0.121,  // chol
   0.084,  // fbs
   0.113,  // restecg
  -0.478,  // thalach
   0.464,  // exang
   0.456,  // oldpeak
  -0.272,  // slope
   0.606,  // ca
   0.503   // thal
];

// ---- Utility ---------------------------------------------------------------
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function standardScale(features) {
  return features.map((v, i) => (v - SCALER_MEAN[i]) / SCALER_STD[i]);
}

/**
 * Predict risk from raw feature array.
 * Returns { probability: 0–1, label: 'HIGH'|'LOW' }
 */
function predictRisk(features) {
  const scaled = standardScale(features);
  let logit = LR_BIAS;
  for (let i = 0; i < LR_WEIGHTS.length; i++) {
    logit += LR_WEIGHTS[i] * scaled[i];
  }
  const prob = sigmoid(logit);
  return { probability: prob, label: prob >= 0.5 ? 'HIGH' : 'LOW' };
}

// ---- Risk flag helper ------------------------------------------------------
const RISK_FLAGS = [
  { id: 'age',      label: 'Age > 55',                    test: v => v[0] > 55 },
  { id: 'sex',      label: 'Male sex',                    test: v => v[1] === 1 },
  { id: 'cp',       label: 'Asymptomatic chest pain',     test: v => v[2] === 0 },
  { id: 'trestbps', label: 'Elevated resting BP (≥140)',  test: v => v[3] >= 140 },
  { id: 'chol',     label: 'High cholesterol (≥240)',     test: v => v[4] >= 240 },
  { id: 'fbs',      label: 'High fasting blood sugar',    test: v => v[5] === 1 },
  { id: 'thalach',  label: 'Low max heart rate (<120)',   test: v => v[7] < 120 },
  { id: 'exang',    label: 'Exercise-induced angina',     test: v => v[8] === 1 },
  { id: 'oldpeak',  label: 'ST depression > 2',           test: v => v[9] > 2 },
  { id: 'ca',       label: 'Major vessels coloured ≥ 1', test: v => v[11] >= 1 },
  { id: 'thal',     label: 'Reversible thalassemia defect', test: v => v[12] === 7 },
];

// ---- DOM helpers -----------------------------------------------------------
function el(id) { return document.getElementById(id); }

// ---- Gauge animation -------------------------------------------------------
const GAUGE_CIRCUMFERENCE = Math.PI * 90; // ~283  (half-circle r=90)

function setGauge(pct, isHigh) {
  const arc  = el('gauge-arc');
  const text = el('gauge-pct-text');
  const dash = GAUGE_CIRCUMFERENCE * pct;
  arc.setAttribute('stroke-dasharray', `${dash} ${GAUGE_CIRCUMFERENCE}`);
  arc.className.baseVal = 'gauge-fill ' + (isHigh ? 'high' : 'low');
  text.textContent = Math.round(pct * 100) + '%';
  text.style.fill = isHigh ? '#c0392b' : '#27ae60';
}

// ---- Form submission -------------------------------------------------------
el('predict-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const fieldIds = ['age','sex','cp','trestbps','chol','fbs',
                    'restecg','thalach','exang','oldpeak','slope','ca','thal'];

  let valid = true;

  fieldIds.forEach(id => {
    const input = el(id);
    input.classList.remove('error');
    if (input.value === '' || input.value === null) {
      input.classList.add('error');
      valid = false;
    }
  });

  if (!valid) {
    // Scroll to first error
    const firstError = document.querySelector('.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const features = fieldIds.map(id => parseFloat(el(id).value));

  const { probability, label } = predictRisk(features);
  const isHigh = label === 'HIGH';

  // --- Result card ---
  const card = el('result-card');
  card.classList.remove('hidden');

  // Animate gauge to 0 first, then to value
  setGauge(0, isHigh);
  setTimeout(() => setGauge(probability, isHigh), 60);

  // Verdict badge
  const badge = el('verdict-badge');
  badge.textContent = isHigh ? '🔴  High Risk' : '🟢  Low Risk';
  badge.className   = 'verdict-badge ' + (isHigh ? 'high' : 'low');

  // Message
  el('result-message').textContent = isHigh
    ? 'Our model indicates an elevated risk of heart disease based on your clinical data. We strongly recommend consulting a cardiologist for a thorough evaluation.'
    : 'Our model indicates a relatively lower risk of heart disease. Maintain a healthy lifestyle and continue regular check-ups with your physician.';

  // Risk flags
  const flagContainer = el('feature-flags');
  flagContainer.innerHTML = '';
  RISK_FLAGS.forEach(flag => {
    const active = flag.test(features);
    const span = document.createElement('span');
    span.className = 'flag ' + (active ? 'risk' : 'neutral');
    span.textContent = (active ? '⚠ ' : '✓ ') + flag.label;
    flagContainer.appendChild(span);
  });

  // Scroll into view
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
