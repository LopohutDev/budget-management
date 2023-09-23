import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ComponentProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const CustomDialog = ({
  setOpen,
  open,
  title,
  description,
  children,
}: ComponentProps) => {
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
