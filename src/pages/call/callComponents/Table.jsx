import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { HiPhone } from "react-icons/hi";
import "./Table.css";
import { convertMongoDateToSimpleDate } from "../../../helpers/dateConverter";
import { Button } from "@material-tailwind/react";

export const Table = ({ rows, handelDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);

  return (
    <>
      <div className=" table-wrapper mb-10 ">
        <table className="table w-full text-center ">
          <thead>
            <tr className="border text-center bg-blue-200 lg:text-base md:text-sm text-xs border-gray-200  ">
              <th>Date</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center  lg:text-base md:text-sm text-xs">
            {rows.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-16 px-6">
                  <div className="flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <HiPhone className="text-blue-400 text-3xl" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-bold text-base">No Call Records Found</p>
                      <p className="text-gray-400 text-sm mt-1">
                        No call records match your current search or filter.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row, i) => {
                const statusText =
                  row.status?.charAt(0).toUpperCase() + row.status?.slice(1) || "";
                const convertData = convertMongoDateToSimpleDate(row.date);
                return (
                  <tr key={i}>
                    <td>{convertData}</td>
                    <td>{row.name}</td>
                    <td className="overflow-hidden whitespace-normal">{row.desc}</td>
                    <td className="text-black">
                      <span className={`label label-${row.status}`}>{statusText}</span>
                    </td>
                    <td className="fit">
                      <span className="actions">
                        <BsFillTrashFill
                          onClick={() => { setShowModal(true); setDeleteRow(row._id); }}
                          className="delete-btn"
                        />
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
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
                      setDeleteRow(null);
                    }}
                  >
                    <span>Close</span>
                  </Button>
                  <span>
                    <Button
                      size="sm"
                      className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        handelDelete(deleteRow);
                        setShowModal(false);
                      }}
                    >
                      Delete
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black" />
        </>
      )}
    </>
  );
};
