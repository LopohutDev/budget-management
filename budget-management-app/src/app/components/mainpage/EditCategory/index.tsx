import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Button, DialogActions, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { Field, FieldProps, Form, Formik } from "formik";
import CustomDialog from "../../common/Dialog";
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { KeyedMutator } from "swr";

interface ComponentProps {
  categoryId: string;
  mutateBudget: KeyedMutator<any>;
  categoryName: string;
}

interface Values {
  name: string;
}

interface CreateTransaction {
  name: string;
  categoryId: string;
}

const editCategory = async (payload: CreateTransaction) => {
  const response = await fetch(`/api/category/${payload.categoryId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // TODO: Handle error
  const data = await response.json();
  return data;
};

const EditCategory = ({
  categoryId,
  mutateBudget,
  categoryName,
}: ComponentProps) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const initialValues = {
    name: categoryName || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const handleSubmit = async (values: Values) => {
    await editCategory({ ...values, categoryId: categoryId });

    mutateBudget();
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        className="shadow-lg bg-yellow-400 text-gray-800  normal-case hover:bg-yellow-500"
        onClick={handleDialogOpen}
      >
        Edit
      </Button>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <CustomDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Edit Category"
          description="Please fill in the details to update the category."
        >
          <Form>
            <div>
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                name="description"
                label="Category Name"
                required
                fullWidth
                variant="standard"
              />
              <DialogActions>
                <Button
                  variant="outlined"
                  className="normal-case text-black border border-gray-500"
                  onClick={() => setOpenDialog(!openDialog)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gray-600 text-gray-50 normal-case"
                  type="submit"
                >
                  Edit
                </Button>
              </DialogActions>
            </div>
          </Form>
        </CustomDialog>
      </Formik>
    </>
  );
};

export default EditCategory;
