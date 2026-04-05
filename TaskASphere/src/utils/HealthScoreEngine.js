/**
 * Financial Health Score Algorithm
 * Rates a user's financial habits from 0-100 based on several factors:
 * 1. Savings Rate (Income vs Expenses)
 * 2. Budget Adherence (Actual vs Budgeted)
 * 3. Categorization Quality
 * 4. Transaction Volume
 */

export const calculateHealthScore = (transactions, budgets) => {
  if (!transactions || transactions.length === 0) return 0;

  let score = 50; // Starting baseline

  // 1. Savings Rate Factor (Max +/- 30 points)
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  if (income > 0) {
    const savingsRate = (income - expenses) / income;
    if (savingsRate > 0.3) score += 30;
    else if (savingsRate > 0.1) score += 15;
    else if (savingsRate < 0) score -= 20;
    else score += 5;
  }

  // 2. Budget Adherence Factor (Max +/- 20 points)
  const categories = Object.keys(budgets);
  if (categories.length > 0) {
    let overBudgetCount = 0;
    categories.forEach(cat => {
      const catExpense = transactions
        .filter(t => t.type === 'expense' && t.category === cat)
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      if (catExpense > budgets[cat]) overBudgetCount++;
    });

    const overPercent = overBudgetCount / categories.length;
    if (overPercent === 0) score += 20;
    else if (overPercent < 0.3) score += 10;
    else score -= (overPercent * 30);
  }

  // 3. Consistency Factor (Max +10 points)
  if (transactions.length > 10) score += 10;
  else if (transactions.length > 5) score += 5;

  // Clamp score between 0 and 100
  return Math.min(Math.max(Math.round(score), 0), 100);
};

export const getHealthStatus = (score) => {
  if (score >= 85) return { label: 'Excellent', color: 'emerald', message: 'Your financial habits are top-tier!' };
  if (score >= 70) return { label: 'Good', color: 'emerald', message: 'You are on the right track.' };
  if (score >= 50) return { label: 'Average', color: 'blue', message: 'Consider tightening your budget.' };
  if (score >= 30) return { label: 'Needs Focus', color: 'amber', message: 'Your expenses are high.' };
  return { label: 'Critical', color: 'red', message: 'Immediate budget review needed.' };
};
