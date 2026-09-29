# ORDER SEARCH PANEL

A clean, simple, and professional React web application built for an IT technical assessment. This project simulates an internal e-commerce/enterprise order management system that allows customer service agents and operations teams to search, track, and generate invoices for customer orders.

---

## 📌 Project Description

**Order Search Panel** is an entry-level, production-quality React application that demonstrates core frontend fundamentals without overcomplicating the tech stack. It loads sample orders from a local JSON dataset and provides intuitive search capabilities by **Order ID**, **Mobile**, **Buyer Name**, and **Email**, complete with a real-time order tracking timeline modal and a printable invoice generator.

---

## ✨ Features

1. **Multi-Field Order Search**:
   - Search by **Order ID** (e.g., `ORD1001`)
   - Search by **Mobile** (e.g., `9876543210`)
   - Search by **Name** (case-insensitive substring match, e.g., `Dummy`)
   - Search by **Email** (case-insensitive substring match, e.g., `dummy@gmail.com`)
2. **Input Validation & User Feedback**:
   - Trims whitespace automatically from user input.
   - Displays `"Please enter a search value."` when searching with an empty field.
   - Displays `"No order found."` when no match exists.
   - Shows total matching orders found count.
3. **Professional Order Result Card**:
   - Displays all 13 critical order attributes: Order ID, Order Date, Payment Method, Buyer Name, State, Email, Mobile, Product, Model, Quantity, Delivery Charges, Total, and Status.
   - Color-coded status badges (`Delivered`, `Shipped`, `Out for Delivery`, `Processing`, `Order Placed`).
4. **Order Tracking Modal**:
   - Interactive tracking timeline highlighting the current stage:
     `Order Placed` &rarr; `Processing` &rarr; `Shipped` &rarr; `Out for Delivery` &rarr; `Delivered`.
   - Completed milestones are marked with checkmarks.
5. **Invoice Generator & Print**:
   - Generates a formatted commercial invoice with itemized line items, subtotal, delivery charges, and final total.
   - One-click **Print Invoice** utilizing native `window.print()` with dedicated print CSS media queries (hides modal backdrops, headers, and UI elements during printing).
6. **Responsive Layout**:
   - Fully optimized for desktop, tablet, and mobile displays. Forms stack vertically, cards adapt gracefully, and buttons stretch appropriately on small viewports.

---

## 🛠️ Technologies Used

- **React (v19)** – Functional components, Hooks (`useState`, `useEffect`)
- **JavaScript (ES6+)** – Modern vanilla JavaScript methods (`filter`, `includes`, `trim`, `toLowerCase`)
- **CSS3** – Custom responsive styling, Flexbox, CSS Grid, and print media queries
- **JSON** – Local mock database containing realistic order records
- **Vite** – Fast, modern frontend build tool and local dev server

*No complex state management (Redux), external UI libraries, backend servers, or databases were used, keeping the project lightweight, clean, and 100% explainable in an interview.*

---

## 📂 Project Structure

```text
src/
│
├── components/
│   ├── Header.jsx         # Dark header banner with app title and subtitle
│   ├── SearchOrder.jsx    # Search By dropdown, input field, and action button
│   ├── OrderCard.jsx      # Order information card with Track & Invoice actions
│   ├── TrackingModal.jsx  # Order tracking milestone timeline modal
│   └── InvoiceModal.jsx   # Clean printable tax invoice modal
│
├── data/
│   └── orders.json        # 10 realistic sample orders (with required test cases)
│
├── App.jsx                # Main application state, filtering logic, and modal control
├── App.css                # Polished design system, responsive styles, and print CSS
├── index.css              # Global CSS baseline
└── main.jsx               # React DOM entry point
```

---

## 🚀 Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 1. Clone or Extract Project
Open your terminal in the project directory:
```bash
git clone <your-repository-url>
cd react-example
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev -- --port 3000
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🔍 How Search Works

The search logic is located in `src/App.jsx` inside the `handleSearch` function:

1. **Trimming**: User input is trimmed via `.trim()` to eliminate accidental leading/trailing spaces.
2. **Validation**: If the trimmed input is empty, `errorMessage` is set to `"Please enter a search value."` and the search aborts.
3. **Filtering**: The `orders.json` array is filtered using standard JavaScript `.filter()`:
   - **Order ID**: Case-insensitive substring match (`order.orderId.toLowerCase().includes(query)`).
   - **Mobile**: Match string digits (`order.mobile.includes(trimmedInput)`).
   - **Name**: Case-insensitive substring match (`order.buyerName.toLowerCase().includes(query)`). Searching for `"Dummy"` matches both `"Dummy User"` and `"Dummy Singh"`.
   - **Email**: Case-insensitive match (`order.email.toLowerCase().includes(query)`).
4. **Conditional Rendering**:
   - If `results.length === 0`, `errorMessage` is set to `"No order found."`.
   - If results exist, `searchResults` is updated and matching `OrderCard` components are rendered.

---

## 🧪 How to Test (Verification Guide)

Test the following test scenarios directly in the application:

| Search By | Search Value | Expected Result |
| :--- | :--- | :--- |
| **Order ID** | `ORD1001` | Displays order for **Dummy User** with Smart Watch |
| **Mobile** | `9876543210` | Displays order for **Dummy User** |
| **Name** | `Dummy` | Displays **2 matching orders** (`Dummy User` and `Dummy Singh`) |
| **Email** | `dummy@gmail.com` | Displays order for **Dummy User** |
| **Any** | *(empty input)* | Displays error alert: `Please enter a search value.` |
| **Order ID** | `ORD9999` | Displays error alert: `No order found.` |
| **Track Order** | *(Click on any card)* | Opens modal showing current stage highlighted in the 5-step timeline |
| **Generate Invoice** | *(Click on any card)* | Opens invoice modal with breakdown and working **Print Invoice** button |

*(Tip: Click the convenient **Quick Test Values** buttons located directly beneath the search bar to test instantly without typing!)*

---

## 📤 How to Upload to GitHub

Follow these steps to push this project to your GitHub account:

1. **Initialize Git** (if not already initialized):
   ```bash
   git init
   ```

2. **Add all files to staging**:
   ```bash
   git add .
   ```

3. **Commit the changes**:
   ```bash
   git commit -m "feat: complete order search panel technical assessment"
   ```

4. **Create a new repository** on [GitHub](https://github.com/new).

5. **Link and push to remote**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
