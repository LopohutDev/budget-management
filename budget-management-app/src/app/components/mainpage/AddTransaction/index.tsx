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
  mutateTransaction: KeyedMutator<any>;
}

interface Values {
  description: string;
  amount: string;
  date: string;
}

interface CreateTransaction {
  description: string;
  amount: string;
  date: string;
  categoryId: string;
}

const createTransaction = async (payload: CreateTransaction) => {
  const response = await fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // TODO: Handle error
  const data = await response.json();
  return data;
};

const AddTransaction = ({ categoryId, mutateTransaction }: ComponentProps) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const initialValues = {
    description: "",
    amount: "",
    date: dayjs().toISOString(),
  };

  const validationSchema = yup.object().shape({
    description: yup.string().required("Required"),
    amount: yup.string().required("Required"),
    date: yup.date().required("Required"),
  });

  const handleSubmit = async (values: Values) => {
    const fixAmount = values.amount.replace("$", "").replace(",", "");
    await createTransaction({
      ...values,
      categoryId: categoryId,
      amount: fixAmount,
    });

    mutateTransaction();
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        onClick={handleDialogOpen}
        className="normal-case bg-lime-400 text-gray-700 hover:bg-lime-300 text-xl font-semibold flex items-center gap-3 shadow-lg"
        fullWidth
      >
        <ReceiptIcon />
        Add Transaction
      </Button>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <CustomDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Add Transaction"
          description="Please fill in the details to create a new transaction."
        >
          <Form>
            <div>
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                name="description"
                label="Transaction Description"
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
              <div className="mt-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Field name="date">
                    {({ form, field }: FieldProps) => (
                      <DatePicker
                        label="Transaction Date"
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

export default AddTransaction;
