import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

import "./Modal.css";
import { useForm } from "react-hook-form";

export const Modal = ({ closeModal, onSubmit }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const { register, handleSubmit } = useForm({
    defaultValues: {
      date: currentDate,
      name: "",
      desc: "",
      status: "",
    },
  });

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="items-start justify-between border-b border-solid border-slate-200 mb-5">
            <Typography className="text-sm lg:text-base font-semibold">
              Add Call Details
            </Typography>
          </div>

          <div className="form-group">
            <Input label="Date" type="date" {...register("date")} />
          </div>
          <div className="form-group">
            <Input label="Name" type="text" {...register("name")} />
          </div>
          <div className="form-group">
            <label htmlFor="description"></label>
            <Textarea label="Message" type="text" {...register("desc")} />
          </div>
          <div className="form-group">
            <div>
              <Input
                list="label_options"
                id="label"
                label="Select Label"
                {...register("status")}
              />
              <datalist id="label_options">
                <option value="Customer" />
                <option value="Dealer" />
                <option value="Approved" />
                <option value="Cancel" />
              </datalist>
            </div>
          </div>

          <div className="flex justify-center m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
            <Button
              size="sm"
              className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => closeModal(false)}
            >
              <span>Close</span>
            </Button>
            <Button
              size="sm"
              type="submit"
              className="bg-green-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
