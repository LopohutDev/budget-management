import useGetBudget from "@/app/hooks/useGetBudget";
import React from "react";

import AddCategory from "../AddCategory";
import CategoryCard from "../CategoryCard";
import { Category } from "@/app/models/category.model";
import { Button } from "@mui/material";
import DeleteConfirmationDialog from "../../common/DeleteConfirmationDialog";
import { KeyedMutator } from "swr";

interface ComponentProps {
  id?: string;
  mutateBudget: KeyedMutator<any>;
}

interface RemoveBudget {
  budgetId: string;
}

const removeBudget = async (payload: RemoveBudget) => {
  const response = await fetch(`/api/budget/${payload.budgetId}`, {
    method: "DELETE",
  });

  // TODO: Handle error
  const data = await response.json();
  return data;
};

const BudgetMain = ({ id = "", mutateBudget }: ComponentProps) => {
  const { data: budgetData, mutate } = useGetBudget({ params: { id } });
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState<boolean>(false);

  if (!budgetData) return null;

  const handleRemoveBudget = () => {
    mutateBudget();
    removeBudget({ budgetId: budgetData.id });
  };

  return (
    <div className="flex-1 p-5 flex flex-col gap-5">
      <div className="bg-white shadow-xl rounded-xl p-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">{budgetData?.name}</h1>
          <p>
            ${budgetData.totalAmount.toLocaleString()} / $
            {budgetData.allottedAmount.toLocaleString()}
          </p>
        </div>
        <Button
          className="shadow-lg bg-red-400 normal-case hover:bg-red-500"
          variant="contained"
          onClick={() => setOpenConfirmationDialog(true)}
        >
          Delete
        </Button>
        <DeleteConfirmationDialog
          open={openConfirmationDialog}
          setOpen={setOpenConfirmationDialog}
          module="budget"
          deleteFn={() => {
            handleRemoveBudget();
          }}
        />
      </div>
      <div className="bg-white shadow-xl rounded-xl p-5">
        <AddCategory budgetId={budgetData.id} />
        <div className="flex flex-col gap-3 mt-5">
          {budgetData.categories &&
            budgetData.categories.map((cat: Category) => (
              <CategoryCard mutateBudget={mutate} category={cat} key={cat.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetMain;
