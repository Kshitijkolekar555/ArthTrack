# ArthTrack Finance Suite 💎
### *Bespoke Submission for Zorvyn Frontend Internship*

ArthTrack is a professional-grade, high-performance personal finance dashboard built to demonstrate advanced React engineering patterns and premium UI/UX design. This project was developed specifically for the **Zorvyn Frontend Developer Intern** assignment.

---

## 🚀 Project Overview & Origin
> [!NOTE]
> This project is adapted from a dashboard-based system I had previously built, where the original use case was task and employee management. Since the assignment required a finance dashboard, I reused the core structure and modified the data model and UI to represent financial transactions instead of tasks.

The dashboard layout, state management using Context API, and role-based UI were already part of the original system. I updated the logic to handle transactions (income/expense), added summary cards like balance, income, and expenses, and included charts to show trends and category-wise breakdown.

I also implemented filtering and basic insights such as highest spending category to make the data more meaningful. Data persistence is handled using localStorage. The main idea was to reuse a working architecture and adapt it to a different domain, focusing on clarity, usability, and clean structure rather than adding unnecessary complexity.

---

## 📸 Visuals & Demo

### 🌐 [Live Deployment](https://arth-track.vercel.app/)
### 🎥 [Prototype Video Demo](file:///c:/KshitijKolekar/WebDev/Projects/ArthTrack/Prototype%20Demo/Screen%20Recording%202026-04-05%20182057.mp4)

### 🖼 Screenshots 
*(Check the `/Screenshots` directory for more)*
![Dashboard Preview](Screenshots/Screenshot%202026-04-05%20181305.png)
![HomePage](Screenshots/Screenshot%202026-04-05%20180545.png)
---

## ✨ Assignment Requirement Mapping
| Required Feature | Implementation Detail | Status |
| :--- | :--- | :--- |
| **Dashboard Overview** | Dynamic balance, income, and expense cards + Balance Trend & Spending Charts. | ✅ **Exceeded** |
| **Transactions Section** | Full CRUD, advanced searching, multi-parameter filtering, and table sorting. | ✅ **Exceeded** |
| **Role-Based UI** | Real-time "Viewer" vs "Admin" mode toggle with action-level security. | ✅ **Exceeded** |
| **Insights Section** | Custom "Health Score" engine + Top Category Analysis + Monthly Comparison. | ✅ **Exceeded** |
| **State Management** | Strategic use of multiple React Contexts (Auth, Finance, Settings, Notify). | ✅ **Exceeded** |
| **Optional Enhancements** | Dark Mode, LocalStorage persistence, Framer Motion animations, CSV Export. | ✅ **Bonus Included** |

---

## 🛠 Engineering Decisions (The "Why")

### 1. Context API over Redux
For a single-user dashboard focused on performance and simplicity, **React Context API** was chosen to manage global state. This avoids the boilerplate of Redux while maintaining clean data flow and separation of concerns.

### 2. Multi-User Data Isolation
To simulate a real-world scenario, I implemented a **LocalStorage Adapter** that keys data to the specific User ID. Even without a backend, different logged-in users will see *only their own data*, ensuring total privacy.

### 3. Framer Motion for Perceived Performance
Premium software isn't just fast; it *feels* fast. I used **Framer Motion** for cinematic animations, success feedback, and hover-tilt effects on dashboard cards to elevate the user experience.

### 4. Financial Health Engine
Rather than hardcoding insights, I built a `HealthScoreEngine.js` that calculates a 0-100 score based on savings rates, budget adherence, and consistency.

---

## 🎨 Design System
- **Colors**: Cinematic `Zinc` & `Emerald` (Selected for fiscal professionality and premium comfort).
- **Typography**: Clean, sans-serif hierarchy optimized for density and readability.
- **Glassmorphism**: Backdrop blur utilized on navigation, cards, and auth modals for depth.

---

## 🏗 Setup & Installation

1. **Clone & Install**:
   ```bash
   npm install
   ```
2. **Launch Development Server**:
   ```bash
   npm run dev
   ```
3. **Demo Access**:
   - Access the landing page first.
   - Click **"Quick Demo Login"** on the sign-in page to explore the full dashboard instantly.

---

## 👨‍💻 Author
**Kshitij Kolekar**  
*Aspiring Frontend Developer*

---
*Created with focus on Frontend Excellence for Zorvyn FinTech Pvt. Ltd.*
