"use client";

import React from "react";
import { useSession } from "next-auth/react";
import AddBudget from "../components/mainpage/AddBudget";
import useGetBudgets from "../hooks/useGetBudgets";
import { Budget } from "../models/budget.model";
import BudgetMain from "../components/mainpage/BudgetMain";

const HomePage = () => {
  const { data: session } = useSession();

  const { data: budgetData, mutate } = useGetBudgets();
  const [currentBudget, setCurrentBudget] = React.useState<string>(
    (budgetData && budgetData[0].id) || undefined
  );

  return (
    <div className="flex">
      <div className="border-r shadow-lg min-h-screen w-[30%] p-5">
        <AddBudget />
        {budgetData?.length > 0 &&
          budgetData.map((budget: Budget, i: number) => (
            <div
              key={i}
              onClick={() => setCurrentBudget(budget.id)}
              className="p-5 mt-3 shadow-lg rounded-xl bg-white"
            >
              <h1 className="text-xl">{budget.name}</h1>
              <p className="text-right text-sm">
                ${budget.totalAmount.toLocaleString()} / $
                {budget.allottedAmount.toLocaleString()}
              </p>
            </div>
          ))}
      </div>
      {currentBudget && currentBudget?.length > 0 && (
        <BudgetMain id={currentBudget} mutateBudget={mutate} />
      )}
    </div>
  );
};

export default HomePage;
