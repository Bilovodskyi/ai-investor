# ⭐️ Support the project
This project is a personal passion, developed in my free time. If you find it useful, please give it a ⭐️. Your support means a lot and motivates me to keep improving the bot.

# 📈 About

https://github.com/user-attachments/assets/3fd58f6f-e3e3-47fb-84e3-a112eff79eb8

### Invest Squid  
Think of this app as your new favorite investing tool. Get quick, clear signals (**bullish | neutral | bearish**) on any stock you're curious about. Right now, Claude is supporting only Warren Buffett’s investing style. But soon, I'm going to add more legendary investors!

### Two Signals (AI + Custom Algorithm)  
1. **Data Simplified:** I fertch the key financial data for chosen stock, then filter it and pass just the essentials to Claude, prompting it with: *“Imagine you’re Warren Buffett.”*  
2. **Claude’s Insight:** Claude provides an easy signal (**bullish | neutral | bearish**) and follows it up with a Buffett-style breakdown, highlighting the company's strengths, risks, and valuation.  
3. **Custom Algorithm:** My own algorithm processing the complete dataset separately, generating its own independent signal, along with detailed insights into financial ratios, competitive moat indicators, and historical performance trends.

# 🛠️ Tech Stack

  * Next.js for both front end and back end (server components & server actions)  
  * TypeScript for type safety  
  * Redux Toolkit for global state management  
  * Neon PostgreSQL + Drizzle ORM for database and migrations  
  * ShadCN/Tailwind CSS for styling and component library  
  * Clerk for user authentication and profiles  
  * GSAP for UI animations  
  * Claude API for AI report & signal generation  
  * Stripe for secure payments and token purchases  

# ⚠️ Disclaimer

### 🚫 No Financial Advice  
The content, tools, and features provided in this application do **not** constitute financial, investment, or trading advice. This project is for educational and personal tracking purposes only.

### ✅ User Responsibility  
By accessing and using this software, you agree to use it at your own risk. Investing involves risk, and you should only risk capital that you can afford to lose.

# ✨ Algorithms

## 🧮 Buffett Algorithm  
*(For now, it’s just Buffett’s algorithm based on his key investment principles.)*  

  This file implements a comprehensive investment analysis inspired by Warren Buffett's principles. 
  It evaluates a company's stock using five key metrics:
  
  1. **Fundamental Analysis**:  
     Assesses core financial health indicators including:
     - **Return on Equity (ROE)** – indicates how efficiently a company uses shareholder funds.
     - **Debt-to-Equity Ratio** – evaluates financial leverage and risk exposure.
     - **Operating Margin** – measures profitability and pricing power.
     - **Current Ratio** – evaluates short-term financial liquidity.
  
  2. **Consistency Analysis**:  
     Reviews historical earnings growth and stability to identify predictable business performance and long-term value creation potential.
  
  3. **Economic Moat Analysis**:  
     Determines the strength and sustainability of a company's competitive advantage by analyzing historical consistency of:
     - **Return on Equity**
     - **Operating Margins**
  
  4. **Management Quality Analysis**:  
     Examines management’s capital allocation practices through:
     - Share repurchases or issuance (indicating alignment with shareholder interests).
     - Dividend distributions (demonstrating management's commitment to shareholder returns).
  
  5. **Intrinsic Value Calculation**:  
     Computes intrinsic value based on Buffett’s preferred "owner earnings" formula, using a conservative Discounted Cash Flow (DCF) model with specific assumptions:
     - **Owner Earnings** = Net Income + Depreciation - Maintenance CapEx
     - Conservative growth and discount rates to ensure margin of safety.
  
  Finally, these analyses combine to generate a clear investment signal (**bullish**, **neutral**, **bearish**).


# Extras: 
- Saved favorite reports to “My List” using Neon PostgreSQL for user and report data, with optimizations like indexing to boost database loading speed.  
- Implemented Stripe payments (which can be tricky) and added a token system to limit API usage.  
- Since the Claude API is pricey, I added caching for generated reports, storing them in session storage.  
- The financial data API is free but limited to 200 calls/day, so I implemented caching to reduce external requests.  


---

© 2025 Invest Squid


