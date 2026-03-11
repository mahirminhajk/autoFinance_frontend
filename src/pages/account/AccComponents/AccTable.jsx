import { useState } from "react";
import "./AccTable.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { convertMongoDateToSimpleDate } from "../../../helpers/dateConverter";
import { AccModalEdit } from "./AccModalEdit";
import { Button } from "@material-tailwind/react";

export const AccTable = ({ rows, deleteRow, setRows }) => {
  const [showModal, setShowModal] = useState(false);
  const [editModelOpen, setEditModelOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [editTransaction, setEditTransaction] = useState(null);

  return (
    <>
      <div className="table-wrapper mb-10">
        <table className="table w-full text-center ">
          <thead>
            <tr className="border text-center bg-blue-200 lg:text-base md:text-sm text-xs border-gray-200  ">
              <th>Date</th>
              <th>Label</th>
              <th>Details</th>
              <th>Amount DR/CR</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center  lg:text-base md:text-sm text-xs">
            {rows.map((row, idx) => {
              const labelText = row.label;
              const date = convertMongoDateToSimpleDate(row.date);

              return (
                <tr key={idx} className="">
                  <td>{date}</td>
                  <td>
                    <span>{labelText}</span>
                  </td>
                  <td className="overflow-hidden whitespace-normal">
                    {row.details}
                  </td>
                  <td>{row.amount}</td>
                  <td className="fit">
                    <span className="actions">
                      <>
                        <BsFillTrashFill
                          onClick={() => {
                            setDeleteId(row._id);
                            setShowModal(true);
                          }}
                          className="delete-btn"
                        />
                      </>
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => {
                          setEditModelOpen(true);
                          setEditTransaction(row);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-sm md:text-base lg:text-xl font-semibold">
                    Are you sure ?
                  </h3>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    size="sm"
                    className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setDeleteId(null);
                    }}
                  >
                    <span>Close</span>
                  </Button>
                  <span onClick={() => setShowModal(false)}>
                    <Button
                      size="sm"
                      className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        deleteRow(deleteId);
                        setShowModal(false);
                        setDeleteId(null);
                      }}
                    >
                      Delete
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40" />
        </>
      )}
      {editModelOpen && (
        <AccModalEdit
          transaction={editTransaction}
          closeModal={() => {
            setEditModelOpen(false);
            setEditTransaction(null);
          }}
          setRows={setRows}
        />
      )}
    </>
  );
};
