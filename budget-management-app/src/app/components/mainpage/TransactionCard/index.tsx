"use client";

import React from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { KeyedMutator } from "swr";

interface ComponentProps {
  mutateTransaction: KeyedMutator<any>;
  transaction: Transaction;
}

interface RemoveTransaction {
  transactionId: string;
}

const removeTransaction = async (payload: RemoveTransaction) => {
  const response = await fetch(`/api/transaction/${payload.transactionId}`, {
    method: "DELETE",
  });

  // TODO: Handle error
  const data = await response.json();
  return data;
};

const TransactionCard = ({
  transaction,
  mutateTransaction,
}: ComponentProps) => {
  const handleRemoveTransaction = () => {
    removeTransaction({ transactionId: transaction.id });
    mutateTransaction();
  };

  return (
    <div className="py-5 px-4 flex justify-between my-3 rounded-lg shadow-xl items-center">
      <div>
        <h1 className="font-medium">{transaction.description}</h1>
        <p className="text-gray-500 text-sm">
          {dayjs(transaction.date).format("MMMM DD, YYYY (hh:mmA)")}
        </p>
        <p>$ {transaction.amount.toLocaleString()}</p>
      </div>
      <div>
        <Button
          className="shadow-lg bg-red-400  normal-case hover:bg-red-500"
          variant="contained"
          onClick={handleRemoveTransaction}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TransactionCard;
