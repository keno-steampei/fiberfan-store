# Fiber Fan — Interactive Textile & Wardrobe Sustainability Matrix

**Fiber Fan** is an educational React web application built with **Vite** and styled using **Tailwind CSS v4**. It empowers students and users to explore how clothing choices directly impact the environment by parsing garment lifecycle data from local CSV files or live Google Spreadsheets.

---

## 🌟 Key Features

* **Interactive Shopping Grid:** Browse clothing items with custom category filtering, real-time keyword search, and sorting options (Price & Durability).
* **Selection Outfit & Eco-Impact Assessment:** Users add items to their outfit cart and proceed to checkout, where clicking any garment brings up a detailed environmental impact breakdown.
* **Printable Impact Receipt / Invoice:** Exporting selection data generates a printable invoice/receipt summary detailing cumulative water consumption, carbon intensity, and per-item lifecycle metrics.
* **Dual Data Source Engine:**
  * **Google Sheets Integration:** Automatically fetches, parses, and caches data from standard share links or "Publish to the web" CSV links using `localStorage`.
  * **Local CSV Support:** Paste or edit raw CSV data in-app or upload `.csv` files directly.
* **Tailwind CSS v4 Color Palette:** Built using a distinct educational color scheme:
  * Primary Accent: `#7757a5` (Purple)
  * Secondary Accent: `#1a8dcd` (Blue)
  * Energy / Highlight: `#f6861f` (Orange)
  * Eco / Success: `#6bb345` (Green)
  * Warning / Alert: `#b62025` (Red)

---

## 📊 Required CSV Data Schema

Whether loading from a local file or a Google Spreadsheet, the first row of your sheet must contain the following exact column headers:

| Header Name | Description | Example Value |
| :--- | :--- | :--- |
| `Clothing item` | Name of the garment | `Organic Cotton T-Shirt` |
| `Category` | Garment category | `Tops`, `Pants`, `Outerwear` |
| `Material / composition` | Specific fabric breakdown | `100% GOTS Certified Organic Cotton` |
| `Fiber type` | Fiber classification | `Natural Plant-based`, `Synthetic` |
| `Example made in` | Country or location of origin | `Portugal` |
| `Water impact` | Water usage severity / notes | `Low (Rain-fed)`, `Extremely High (~7500L)` |
| `Climate impact` | Carbon & emissions impact | `Low (No Synthetic Pesticides)` |
| `Durability (1–5)` | Durability rating from 1 to 5 | `4` |
| `Expected useful life` | Lifespan estimate | `3–5 years` |
| `Repairability` | Ease of repair | `High (Easy to stitch)` |
| `End-of-life options` | Recycling / disposal options | `Compostable / Biodegradable` |
| `Key environmental point` | Primary educational take-away | `Saves ~2400L of water compared to conventional cotton.` |
| `Price` | Retail price | `45.00` |
| `Public image url` | Publicly accessible image link | `https://images.unsplash.com/...` |

---

## 🔗 Connecting to a Google Spreadsheet

### Step 1: Set Google Sheet Permissions
1. Open your sheet in **Google Sheets**.
2. Click **Share** $\rightarrow$ Change General Access to **"Anyone with the link can view"**.
3. *(Alternative)* Select **File** $\rightarrow$ **Share** $\rightarrow$ **Publish to web** $\rightarrow$ choose **Comma-separated values (.csv)** and click **Publish**.

### Step 2: Hardcoding Default Sheet in Code (Optional)
If you want the application to load your spreadsheet by default on first visit, update the constant in `App.jsx`:

```javascript
const DEFAULT_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit?usp=sharing';
```

---

## 🛠️ Local Development & Setup

### Prerequisites
* **Node.js** (v18 or higher)
* **pnpm** (or `npm` / `yarn`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fiber-fan.git
   cd fiber-fan
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🚀 Building & Deploying to Netlify

### Option A: Automatic Git Deployment (Recommended)
1. Push your repository to **GitHub**.
2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site** $\rightarrow$ **Import an existing project**.
3. Select your GitHub repository.
4. Set the build parameters:
   * **Build Command:** `pnpm run build`
   * **Publish Directory:** `dist`
5. Click **Deploy Site**.

### Option B: Drag-and-Drop Build (`dist`)
1. Run the production build command locally:
   ```bash
   pnpm run build
   ```
2. Navigate to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder into your browser window.

---

## 📁 Project Component Structure

```text
src/
├── components/
│   ├── ProductCard.jsx          # Card component for grid display
│   ├── CartDrawer.jsx           # Cart sidebar drawer with outfit list
│   ├── GarmentImpactModal.jsx   # Detailed eco-impact breakdown popup
│   ├── ImpactReceiptModal.jsx   # Printable summary receipt / invoice modal
│   └── DataSourceModal.jsx      # Modal for switching CSV or Google Sheets link
├── App.jsx                      # Main app controller & state initialization
├── index.css                    # Tailwind CSS v4 entry (@import "tailwindcss";)
└── main.tsx                     # React application root mount
```

---

## 📜 License

This project is licensed under the MIT License — free for educational and non-commercial use.