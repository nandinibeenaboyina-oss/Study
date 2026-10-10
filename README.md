# B.Tech CSE Study Planner & Exam Preparation App

A comprehensive student study planner, curriculum tracker, interactive quiz engine, notes organizer, and placement preparation suite designed specifically for B.Tech Computer Science & Engineering students.

---

## 🚀 Key Features

1. **Dashboard Command Center**
   - Daily study hours tracking & active streak counter.
   - Interactive Pomodoro Focus Timer with focus, short break, and long break presets.
   - Upcoming exams timeline with countdowns, venues, and target scores.
   - High-priority task checklist with 1-click completion.

2. **Curriculum & Subject Management (7 Core Domains)**
   - **Quantitative Aptitude**: Number systems, Time & Work, Speed-Time-Distance, Profit & Loss, Permutations & Probability.
   - **Logical Reasoning**: Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding, Critical Reasoning.
   - **Verbal Ability & English**: Grammar rules, Subject-Verb agreement, Vocabulary, Reading Comprehension.
   - **Programming & DSA**: Complexity analysis, Linked Lists, Trees/BST, Graphs, OOP pillars.
   - **Database Management Systems (DBMS)**: Relational model, SQL queries, Normalization (1NF to BCNF), ACID transactions.
   - **Operating Systems (OS)**: Process scheduling, Coffman deadlock conditions, Memory management, Paging.
   - **Data Mining & Warehousing**: KDD process, Apriori algorithm, FP-Growth, OLAP operations, Clustering (k-Means vs DBSCAN).
   - Unit-by-unit syllabus checklists and formula cheatsheets.

3. **Study Task Management**
   - Multi-criteria filtering by Subject, Priority (High/Medium/Low), and Status (Pending/In Progress/Completed).
   - Search tasks, track deadlines, and receive overdue alerts.

4. **Study Notes Hub**
   - Create, edit, search, and pin high-yield revision notes.
   - Markdown writing with real-time preview.
   - Pre-loaded with high-yield exam notes and one-click copy to clipboard.

5. **Interactive Quiz Engine**
   - Timed Mock Exam Mode and Practice Mode with instant answer reveals.
   - Full scored reports with percentages and in-depth technical explanations.
   - Quiz history logs and custom MCQ question generator.

6. **Campus Placement & Interview Prep**
   - Technical interview questions tagged by top companies (Amazon, Microsoft, Google, TCS, Infosys, Cognizant, Wipro).
   - Coding practice sandbox with multi-language code snippets (JavaScript, Python 3, C++ 17) and test-case simulator.

7. **Data Persistence & Portability**
   - LocalStorage auto-save layer.
   - 1-click JSON backup export & restore.

---

## 🛠️ Quick Start & Local Setup

### Prerequisites
- Node.js 18 or higher
- npm (Node Package Manager)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/btech-cse-study-planner.git

# 2. Navigate to the project directory
cd btech-cse-study-planner

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 📦 Build for Production

```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🌐 Deploy to Vercel or Netlify

### Vercel (Recommended)
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and import the repository.
3. Keep default settings (`Vite` framework, `npm run build`, `dist` output directory) and click **Deploy**.

### Netlify
1. Sign in to [Netlify](https://netlify.com) and choose **Import an existing project from GitHub**.
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Click **Deploy**.
