import React from "react";
import { NumericFormat } from "react-number-format";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Button, DialogActions, TextField } from "@mui/material";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { Field, Form, Formik, FieldProps } from "formik";
import CustomDialog from "@/app/components/common/Dialog";

import * as yup from "yup";

import dayjs from "dayjs";

interface Values {
  name: string;
  amount: string;
  startDate: string;
  endDate: string;
}

interface CreateBudget {
  name: string;
  amount: string;
  startDate: string;
  endDate: string;
}

const createBudget = async (payload: CreateBudget) => {
  const response = await fetch("/api/budget", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // TODO: Handle error
  const data = await response.json();
  return data;
};

const AddBudget = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const initialValues = {
    name: "",
    amount: "",
    startDate: dayjs().toISOString(),
    endDate: dayjs().add(3, "day").toISOString(),
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    amount: yup.string().required("Required"),
    startDate: yup.date().required("Required"),
    endDate: yup.date().required("Required"),
  });

  const handleSubmit = async (values: Values) => {
    const fixAmount = values.amount.replace("$", "").replace(",", "");

    await createBudget({ ...values, amount: fixAmount });
  };

  return (
    <>
      <Button
        onClick={handleDialogOpen}
        className="normal-case bg-lime-400 text-gray-700 hover:bg-lime-300 text-xl font-semibold flex items-center gap-3 shadow-lg"
        fullWidth
      >
        <PaidOutlinedIcon />
        Add Budget
      </Button>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <CustomDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Create Budget"
          description="Please fill in the details to create a new budget."
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
              <Field
                as={NumericFormat}
                variant="standard"
                label="Amount"
                margin="dense"
                name="amount"
                customInput={TextField}
                thousandSeparator={true}
                prefix={"$"}
                fullWidth
                allowNegative={false}
                required
              />
              <div className="flex gap-5 mt-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Field name="startDate">
                    {({ form, field }: FieldProps) => (
                      <DatePicker
                        label="Start Date"
                        value={dayjs(field.value)}
                        onChange={(date: any) => {
                          const formattedDate = dayjs(date).toISOString();
                          form.setFieldValue(field.name, formattedDate);
                        }}
                      />
                    )}
                  </Field>
                  <Field name="endDate">
                    {({ field, form }: FieldProps) => (
                      <DatePicker
                        label="End Date"
                        value={dayjs(field.value)}
                        onChange={(date: any) => {
                          const formattedDate = dayjs(date).toISOString();
                          form.setFieldValue(field.name, formattedDate);
                        }}
                      />
                    )}
                  </Field>
                </LocalizationProvider>
              </div>
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

export default AddBudget;
