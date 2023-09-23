import React from "react";
import CustomDialog from "../Dialog";
import { Button } from "@mui/material";

interface ComponentProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  deleteFn: () => void;
  module?: string;
}

const DeleteConfirmationDialog = ({
  setOpen,
  open,
  module,
  deleteFn,
}: ComponentProps) => {
  const handleCancel = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    deleteFn();
    setOpen(!open);
  };

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title="Confirm Remove"
      description={`Are you sure to remove this ${module}?`}
    >
      <div className="my-3 flex justify-end gap-3">
        <Button
          className="bg-blue-400 hover:bg-blue-500 text-white shadow-lg normal-case"
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-red-400 hover:bg-red-500 text-white shadow-lg normal-case"
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </CustomDialog>
  );
};

export default DeleteConfirmationDialog;
