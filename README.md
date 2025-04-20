# 📈 About

### **Invest Squid**  
Think of this app as your go‑to stock buddy. Get **bullish | neutral | bearish** advice for whatever ticker you’re eyeing. Right now, Claude’s in full Buffett mode, and I’ve got plenty more investor gurus in the pipeline!

### **Get 2 Signals (AI + Algorithm)**  
1. **Data Preprocessing:** I pull in your chosen stock’s key financial metrics, then send only the essentials to Claude with a prompt that says, “Imagine you are Warren Buffett.”  
2. **Claude Signal & Analysis:** Claude issues a straightforward signal (**bullish | neutral | bearish**), then follows up with a detailed, Buffett‑style write‑up of the company’s strengths, risks, and valuation.  
3. **Built‑In Algorithm:** My own on‑device algorithm crunches the full dataset and returns its own signal, plus a breakdown of financial ratios, moat indicators, and performance trends.

# 🛠️ Tech Stack

  * Next.js for both front end and back end (server components & server actions)  
  * TypeScript for end‑to‑end type safety  
  * Redux Toolkit for global state management  
  * Neon PostgreSQL + Drizzle ORM for database and migrations  
  * ShadCN/Tailwind CSS for styling and component library  
  * Clerk for user authentication and profiles  
  * GSAP for subtle UI animations  
  * Claude API for AI report & signal generation  
  * Stripe for secure payments and token purchases  

# ⚠️ Disclaimer

### 🚫 No Financial Advice  
The content, tools, and features provided in this application do **not** constitute financial, investment, or trading advice. This project is for educational and personal tracking purposes only.

### ✅ User Responsibility  
By accessing and using this software, you agree to use it at your own risk. Investing involves risk, and you should only risk capital that you can afford to lose.

# ✨ Features

### 🤖 AI‑Powered Stock Signals

**🧠 Claude‑Investor**  
- We grab the key stats (ROE, debt levels, margins), whisper “Channel Warren Buffett” to Claude, and voilà—Claude spits out a no‑bias signal plus a short, snackable Buffett‑style rundown: what’s awesome, what’s sketchy, and why.

**🔧 Algorithm**  
- Then my built‑in engine chews through the full dataset—scoring fundamentals, checking for consistent earnings, measuring moat strength, sizing up management, and even running a margin‑of‑safety test. You get its own signal and a clear breakdown of the numbers that drove it.

**Extras:**  
- Bookmark tickers and revisit past signals in the Archive.  
- Compare Claude vs. algorithm calls side by side.  
- Coming soon: more investor strategies.  

## 🧮 Buffett Algorithm  
*(For now, it’s just Buffett’s algorithm based on his key investment principles.)*  

It crunches the numbers in five quick steps:  
- **Fundamentals:** ROE, debt levels, margins  
- **Consistency:** steady earnings growth  
- **Moat:** competitive edge strength  
- **Management:** buybacks & dividends  
- **Intrinsic Value:** DCF + margin of safety  

Then it blends those scores and delivers a straight‑up **bullish | neutral | bearish** signal.

---

© 2025 Invest Squid


