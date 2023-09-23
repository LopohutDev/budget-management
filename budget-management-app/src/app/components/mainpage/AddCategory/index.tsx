import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { Button, DialogActions, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import CustomDialog from "../../common/Dialog";
import * as yup from "yup";

interface ComponentProps {
  budgetId: string;
}

interface Values {
  name: string;
}

interface CreateCategory {
  name: string;
  budgetId: string;
}

const createCategory = async (payload: CreateCategory) => {
  const response = await fetch("/api/category", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // TODO: Handle error
  const data = await response.json();
  return data;
};

const AddCategory = ({ budgetId }: ComponentProps) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const initialValues = {
    name: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const handleSubmit = async (values: Values) => {
    await createCategory({ ...values, budgetId: budgetId });

    setOpenDialog(false);
  };

  return (
    <>
      <Button
        onClick={handleDialogOpen}
        className="normal-case bg-lime-400 text-gray-700 hover:bg-lime-300 text-xl font-semibold flex items-center gap-3 shadow-lg"
        fullWidth
      >
        <CategoryIcon />
        Add Category
      </Button>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <CustomDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Create Category"
          description="Please fill in the details to create a new category."
        >
          <Form>
            <div>
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                name="name"
                label="Name"
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
                  Add
                </Button>
              </DialogActions>
            </div>
          </Form>
        </CustomDialog>
      </Formik>
    </>
  );
};

export default AddCategory;
