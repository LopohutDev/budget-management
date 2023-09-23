"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Category } from "@/app/models/category.model";
import useGetTransactionsByCategory from "@/app/hooks/useGetTransactionsByCategory";
import TransactionCard from "../TransactionCard";
import AddTransaction from "../AddTransaction";
import DeleteConfirmationDialog from "../../common/DeleteConfirmationDialog";
import EditCategory from "../EditCategory";
import { KeyedMutator } from "swr";

interface ComponentProps {
  category: Category;
  mutateBudget: KeyedMutator<any>;
}

interface RemoveCategory {
  categoryId: string;
}

const removeCategory = async (payload: RemoveCategory) => {
  const response = await fetch(`/api/transaction/${payload.categoryId}`, {
    method: "DELETE",
  });

  // TODO: Handle error
  const data = await response.json();
  return data;
};

const CategoryCard: React.FC<ComponentProps> = ({ category, mutateBudget }) => {
  const [expandedCategory, setExpandedCategory] =
    React.useState<boolean>(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState<boolean>(false);

  const { data, mutate } = useGetTransactionsByCategory(category.id);

  const transactions = data?.transactions;

  const handleRemoveCategory = () => {
    removeCategory({ categoryId: category.id });
  };

  return (
    <Accordion
      expanded={expandedCategory}
      className="shadow-lg rounded-t-xl overflow-hidden border-gray-100 border bg-gray-50"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpandedCategory(!expandedCategory)}
        className="shadow-sm"
      >
        <div className="flex flex-col">
          <h1 className="font-medium">{category.name}</h1>
          <div className="flex gap-3 mt-3">
            <EditCategory
              mutateBudget={mutateBudget}
              categoryId={category.id}
              categoryName={category.name}
            />
            <Button
              variant="contained"
              size="small"
              className="shadow-lg bg-red-400 normal-case hover:bg-red-500"
              onClick={() => setOpenConfirmationDialog(true)}
            >
              Delete
            </Button>
          </div>
        </div>
        <DeleteConfirmationDialog
          open={openConfirmationDialog}
          setOpen={setOpenConfirmationDialog}
          module="category"
          deleteFn={() => {
            handleRemoveCategory();
          }}
        />
      </AccordionSummary>
      <AccordionDetails className="bg-white">
        <AddTransaction mutateTransaction={mutate} categoryId={category.id} />
        <div className="max-h-[500px]">
          {transactions &&
            transactions.map((transaction: Transaction) => (
              <TransactionCard
                mutateTransaction={mutate}
                transaction={transaction}
                key={transaction.id}
              />
            ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryCard;
