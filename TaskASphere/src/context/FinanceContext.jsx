import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultTransactions from '../data/transactions';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const { user } = useAuth();
  const { notify } = useNotification() || {};

  // Keys based on current user
  const txKey = user ? `arthtrack_txns_${user.id}` : null;
  const budgetKey = user ? `arthtrack_budgets_${user.id}` : null;

  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgetsState] = useState({});
  const [role, setRole] = useState('viewer');

  // Load data whenever the user changes
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setBudgetsState({});
      return;
    }

    try {
      const savedTx = localStorage.getItem(txKey);
      setTransactions(savedTx ? JSON.parse(savedTx) : defaultTransactions);

      const savedBudgets = localStorage.getItem(budgetKey);
      setBudgetsState(savedBudgets ? JSON.parse(savedBudgets) : {});
      
      setRole(user.role || 'viewer');
    } catch (err) {
      console.error("Error loading user data:", err);
      setTransactions(defaultTransactions);
      setBudgetsState({});
    }
  }, [user, txKey, budgetKey]);

  // Save changes to localStorage
  useEffect(() => {
    if (txKey && transactions.length > 0) {
      localStorage.setItem(txKey, JSON.stringify(transactions));
    }
  }, [transactions, txKey]);

  useEffect(() => {
    if (budgetKey) {
      localStorage.setItem(budgetKey, JSON.stringify(budgets));
    }
  }, [budgets, budgetKey]);

  function addTransaction(newTx) {
    setTransactions(prev => [{
      ...newTx,
      id: Date.now(),
      amount: Number(newTx.amount),
    }, ...prev]);

    if (notify) {
      notify(`Transaction "${newTx.description}" added successfully`);
    }
  }

  function editTransaction(id, updated) {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updated, amount: Number(updated.amount) } : t)
    );

    if (notify) {
      notify(`Transaction updated correctly`);
    }
  }

  function deleteTransaction(id) {
    const deletedTx = transactions.find(t => t.id === id);
    if (!deletedTx) return;

    setTransactions(prev => prev.filter(t => t.id !== id));

    if (notify) {
      notify(`Deleted "${deletedTx.description}"`, {
        onUndo: () => {
          setTransactions(prev => [deletedTx, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
      });
    }
  }

  function setBudget(category, amount) {
    setBudgetsState(prev => ({ ...prev, [category]: Number(amount) }));
  }

  const [filters, setFilters] = useState({
    type: '',
    category: '',
    search: '',
    dateFrom: '',
    dateTo: '',
  });

  const categories = [...new Set(transactions.map(t => t.category))].sort();

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      setRole,
      filters,
      setFilters,
      addTransaction,
      editTransaction,
      deleteTransaction,
      categories,
      budgets,
      setBudget,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}
