import { useState } from "react";
import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import "./AccModal.css";
import axiosapi from "../../../helpers/axiosapi";
import ErrControler from "../../../components/controlComps/ErrControler";

export const AccModal = ({ closeModal, setRows }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];

  const { register, handleSubmit } = useForm({
    defaultValues: {
      date: currentDate,
      label: "",
      details: "",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosapi.post("/account/transaction", data);
      setError(false);
      //* add the new transaction to the first of the row
      setRows((prev) => [res.data.transaction, ...prev]);
    } catch (error) {
      setError(error.response.message || error.message);
      setLoading(false);
    }
    setLoading(false);
    closeModal(false);
  };

  if (error) return <ErrControler err={error} />;

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={loading ? "opacity-50" : ""}
        >
          <div className="items-start justify-between border-b border-solid border-slate-200 mb-5">
            <Typography className="text-sm lg:text-base font-semibold">
              Add Account List
            </Typography>
          </div>

          <div className="form-group">
            <Input
              label="Date"
              type="date"
              {...register("date")}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <div>
              <Input
                list="label_options"
                id="label"
                label="Select Label"
                {...register("label")}
                disabled={loading}
              />
              <datalist id="label_options">
                <option value="Dealer amount"></option>
                <option value="Dealer deposit"></option>
                <option value="Dealer car loan amount"></option>
                <option value="Personal amount"></option>
                <option value="Bank to Customer"></option>
                <option value="Commission payout"></option>
                <option value="RTO agent amount"></option>
                <option value="Office expense"></option>
                <option value="Personal expense"></option>
              </datalist>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="details"></label>
            <Textarea
              label="Message"
              type="text"
              {...register("details")}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount"></label>
            <Input
              label="Amount"
              type="number"
              {...register("amount")}
              disabled={loading}
            />
          </div>

          <div className="flex justify-center m-auto gap-5 border-solid border-slate-200 rounded-b">
            <Button
              size="sm"
              className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => closeModal(false)}
              disabled={loading}
            >
              <span>Close</span>
            </Button>
            <Button
              size="sm"
              type="submit"
              className="bg-green-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
              disabled={loading}
            >
              Create
            </Button>
          </div>
        </form>
        {loading && (
          <div className="absolute top-0 right-0 w-full h-full">
            <div className="flex justify-center items-center h-full">
              <Spinner className="h-6 w-6" color="green" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
