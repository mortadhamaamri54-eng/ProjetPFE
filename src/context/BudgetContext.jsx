import { createContext, useState } from "react";

export const BudgetContext = createContext();

export function BudgetProvider({ children }) {

  const [budgets, setBudgets] = useState({
    DI: {
      exploitation: [],
      investissement: [],
      maintenance: []
    },
    RH: {
      fonctionnement: [],
      medical: [],
      social: [],
      projets: []
    },
    AJ: {
      fonctionnement: [],
      projets: []
    }
  });

  const addBudget = (direction, type, newItem) => {
    setBudgets(prev => {

      if (!prev[direction]) {
        console.error("Direction invalide:", direction);
        return prev;
      }

      if (!prev[direction][type]) {
        console.error("Type invalide:", type);
        return prev;
      }

      return {
        ...prev,
        [direction]: {
          ...prev[direction],
          [type]: [
            ...(prev[direction][type] || []),
            newItem
          ]
        }
      };
    });
  };

  const getBudgets = (direction, type) => {
    return budgets[direction]?.[type] || [];
  };

  const calculateTotal = (direction, type) => {
    const data = budgets[direction]?.[type] || [];
    return data.reduce((acc, item) => acc + (item.montant || 0), 0);
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        getBudgets,
        calculateTotal
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}