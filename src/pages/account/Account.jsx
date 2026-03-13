import { useState, useRef } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
  Breadcrumbs,
  IconButton,
} from "@material-tailwind/react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { TbZoomMoney } from "react-icons/tb";
import {
  BsFillArrowRightSquareFill as RightArrow,
  BsFillArrowLeftSquareFill as LeftArrow,
} from "react-icons/bs";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import { AccTable } from "./AccComponents/AccTable";
import { AccModal } from "./AccComponents/AccModal";
import axiosapi from "../../helpers/axiosapi";
import { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(true);
  //* filter
  const [labelFilter, setLabelFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //* pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);

  //* serach input ref
  const searchInputRef = useRef(null);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => setCurrentPage(index),
  });

  const next = () => {
    if (currentPage === pageNumberLimit) return;

    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  const fetchAccData = async () => {
    setLoading(true);
    try {
      const res = await axiosapi.get(
        `/account/transactions?search=${searchQuery}&label=${labelFilter}&page=${currentPage}`
      );
      setPageNumberLimit(res.data.totalPages);
      setRows(res.data.transactions);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAccData();
  }, [labelFilter, currentPage, searchQuery]);

  const handleDeleteTransaction = async (id) => {
    try {
      setLoading(true);
      await axiosapi.delete(`/account/transaction/${id}`);
      //* remove the deleted transaction from the rows
      setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // const handleDeleteAll = async () => {
  //   try {
  //     setLoading(true);
  //     await axiosapi.delete(`/account/transactions`);
  //     //* set rows to empty array
  //     setRows([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current.value;
    setSearchQuery(searchQuery);
  };

  const handleClearSearch =async () => {
    setSearchQuery("");
    setLabelFilter("");
    if(searchInputRef.current) searchInputRef.current.value = "";
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <section className="_heading-container">
          <Breadcrumbs fullWidth>
            <a
              onClick={() => navigate("/")}
              className="opacity-60 text-xs lg:text-sm"
            >
              <AiFillHome />
            </a>
            <a className="text-xs lg:text-sm">Account</a>
          </Breadcrumbs>

          <div className="_head-comp grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 mx-8 mt-4">
            <div className="_search md:col-span-2 lg:col-span-2">
              <form onSubmit={onSearchSubmit}>
                <div className="flex items-center rounded-full border border-gray-300 px-3 py-1 lg:py-2">
                  <TbZoomMoney className="text-gray-500 text-sm md:text-lg lg:text-2xl" />
                  <input
                    type="text"
                    name="searchQuery"
                    ref={searchInputRef}
                    className="w-full outline-none ml-2"
                    placeholder="Search Account Detail"
                  />
                </div>
              </form>
            </div>

            <div className="_head-btn  flex md:justify-end lg:justify-end gap-2">
              <Button size="sm"
                onClick={handleClearSearch}
              >Clear search</Button>
              {/**Filter */}
              <div className="_filter">
                <Menu>
                  <MenuHandler>
                    <Button
                      size="sm"
                      className="flex items-center text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-primary hover:bg-cyan-900"
                    >
                      Filter
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <div className="grid grid-rows-1 gap-2">
                      <div className="grid grid-rows-1">
                        <div>
                          <Typography className="text-base lg:text-lg font-medium lg:font-semibold">
                            Category
                          </Typography>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mt-1">
                          <Button
                            size="sm"
                            className="bg-yellow-800 text-black"
                            onClick={() => setLabelFilter("Dealer Amount")}
                          >
                            Dealer Amount
                          </Button>
                          <Button
                            size="sm"
                            className="bg-orange-800 text-black"
                            onClick={() => setLabelFilter("Dealer Deposit")}
                          >
                            Dealer Deposit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gray-400 text-black"
                            onClick={() =>
                              setLabelFilter("Dealer Car Loan Amount")
                            }
                          >
                            Dealer Car Loan Payment
                          </Button>
                          <Button
                            size="sm"
                            className="bg-indigo-400 text-black"
                            onClick={() => setLabelFilter("Personal Amount")}
                          >
                            Personal Amount
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-400 text-black"
                            onClick={() => setLabelFilter("Bank to Customer")}
                          >
                            Bank to Customer
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-400 text-black"
                            onClick={() => setLabelFilter("Commission payout")}
                          >
                            Commission payout
                          </Button>
                          <Button
                            size="sm"
                            className="bg-yellow-400 text-black"
                            onClick={() => setLabelFilter("RTO agent amount")}
                          >
                            RTO agent amount
                          </Button>
                          <Button
                            size="sm"
                            className="bg-orange-400 text-black"
                            onClick={() => setLabelFilter("Office expense")}
                          >
                            Office expense
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-400 text-black"
                            onClick={() => setLabelFilter("Personal Expense")}
                          >
                            Personal Expense
                          </Button>
                        </div>
                      </div>
                    </div>
                  </MenuList>
                </Menu>
              </div>

              {/**ADD transaction */}
              <div>
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-purple-900 hover:bg-primary"
                >
                  <MdAccountBalanceWallet size={14} /> Add New
                </Button>
              </div>

              {/**DELETE transaction */}
              {/* <div className="">
                <>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-red-900 hover:bg-primary"
                  >
                    <MdAccountBalanceWallet size={14} /> Delete All
                  </Button>
                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
  
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                              <h3 className="text-sm md:text-base lg:text-xl font-semibold">
                                Are you sure ?
                              </h3>
                            </div>

                    
                            <div className="flex items-center justify-end m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
                              <Button
                                size="sm"
                                className="bg-slate-500 text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                <span>Close</span>
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                // onClick={() => deleteDealer()}
                                onClick={handleDeleteAll}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                    </>
                  ) : null}
                </>
              </div> */}
            </div>
          </div>
        </section>

        <div className="w-auto h-auto ">
          {loading ? (
            <div className="flex justify-center items-center">
              <h1>Loading...</h1>
            </div>
          ) : (
            <AccTable
              rows={rows}
              deleteRow={handleDeleteTransaction}
              setRows={setRows}
            />
          )}
          {modalOpen && (
            <AccModal
              closeModal={() => {
                setModalOpen(false);
              }}
              setRows={setRows}
            />
          )}
        </div>

        {rows.length > 0 && (
          <div className="flex justify-center items-center my-3 lg:my-5">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
                color="light-blue"
                onClick={prev}
                disabled={currentPage === 1}
              >
                <LeftArrow className="h-4 w-4" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                {new Array(pageNumberLimit).fill("").map((_, idx) => {
                  const index = idx + 1;
                  return (
                    <IconButton key={index} {...getItemProps(index)}>{index}</IconButton>
                  );
                })}
              </div>
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
                color="light-blue"
                onClick={next}
                disabled={currentPage === pageNumberLimit}
              >
                Next
                <RightArrow className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}

export default Account;