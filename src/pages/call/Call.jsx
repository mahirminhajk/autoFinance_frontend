import { useEffect, useState, useRef } from "react";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { HiPhone } from "react-icons/hi";
import {
  BsFillArrowRightSquareFill as RightArrow,
  BsFillArrowLeftSquareFill as LeftArrow,
} from "react-icons/bs";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import axiosapi from "../../helpers/axiosapi";
import LoadingControler from "../../components/controlComps/LoadingControler";
import { Table } from "./callComponents/Table";
import { Modal } from "./callComponents/Modal";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdLocalLibrary, MdPersonSearch } from "react-icons/md";

function Call() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(true);

  //*filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  //*pagination
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

  const fetchCallRecords = async () => {
    try {
      setLoading(true);
      await axiosapi
        .get(
          `/call?search=${searchQuery}&status=${statusFilter}&page=${currentPage}`
        )
        .then((res) => {
          setPageNumberLimit(res.data.totalPages);
          setRows(res.data.callRecords);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCallRecords();
  }, [currentPage, statusFilter, searchQuery]);

  const handleDeleteRow = async (id) => {
    try {

      setLoading(true);
      await axiosapi.delete(`/call/${id}`).then((res) => {
        if (res.data.success) {
          //* remove the row from the table using _id
          setRows(rows.filter((row) => row._id !== id));
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await axiosapi.post("/call", data).then((res) => {

        if (res.data.success) {
          //* add the res to the table
          setRows([res.data.callRecord, ...rows]);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current.value;
    setSearchQuery(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setStatusFilter("");
    if(searchInputRef.current) searchInputRef.current.value = "";
  }

  if (loading) {
    return <LoadingControler />;
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
            <a className="text-xs lg:text-sm">Call Records</a>
          </Breadcrumbs>

          <div className="_head-comp grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 mx-8 mt-4">
            <div className="_search md:col-span-2 lg:col-span-2">
              <form onSubmit={onSearchSubmit}>
                <div className="flex items-center rounded-full border border-gray-300 px-3 py-1 lg:py-2">
                  <MdLocalLibrary className="text-gray-500 text-sm md:text-lg lg:text-2xl" />
                  <input
                    type="text"
                    name="searchQuery"
                    className="w-full outline-none ml-2"
                    ref={searchInputRef}
                    placeholder="Search Call Details"
                  />
                </div>
              </form>
            </div>

            <div className="_head-btn  flex md:justify-end lg:justify-end gap-4">
              <Button size="sm" onClick={handleClearSearch}>Clear search</Button>
              {/* Filter */}
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
                        <div className="grid gap-2 mt-1">
                          <Button
                            size="sm"
                            className="bg-green-100 text-black"
                            onClick={() => setStatusFilter("Approved")}
                          >
                            Approved
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-100 text-black"
                            onClick={() => setStatusFilter("Cancel")}
                          >
                            Canceled
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-100 text-black"
                            onClick={() => setStatusFilter("Customer")}
                          >
                            Customer
                          </Button>
                          <Button
                            size="sm"
                            className="bg-yellow-100 text-black"
                            onClick={() => setStatusFilter("Dealer")}
                          >
                            Dealer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </MenuList>
                </Menu>
              </div>

              <div className="col-span-3 md:col-span-2">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-purple-900 hover:bg-primary"
                >
                  <HiPhone size={14} /> Add New
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="w-auto h-auto ">
          <Table rows={rows} handelDelete={handleDeleteRow} />
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
              }}
              onSubmit={handleSubmit}
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

export default Call;

//! Delete all modal and function
//const [showModal, setShowModal] = useState(false);
// const handleDeleteAll = async () => {
//   try {
//     setLoading(true);
//     await axiosapi.delete(`/call`).then((res) => {
//       console.log(res.data);
//       if (res.data.success) {
//         //* remove the row from the table using _id
//         setRows([]);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

//<div className="justify-self-end">
//              <>
//                <Button
//                 size="sm"
//                  type="button"
//                  onClick={() => setShowModal(true)}
//                  // onClick={handleDeleteAll}
//                  className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-red-900 hover:bg-primary"
//                >
//                  <MdAccountBalanceWallet size={14} /> Delete All
//                </Button>
//
//                {showModal ? (
//                  <>
//                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//                      <div className="relative w-auto my-6 mx-auto max-w-sm">
//                        {/*content*/}
//                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                          {/*header*/}
//                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                            <h3 className="text-sm md:text-base lg:text-xl font-semibold">
//                              Are you sure ?
//                            </h3>
//                          </div>
//
//                          {/*footer*/}
//                          <div className="flex items-center justify-end m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
//                            <Button
//                              size="sm"
//                              className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
//                              type="button"
//                              onClick={() => setShowModal(false)}
//                            >
//                              <span>Close</span>
//                            </Button>
//                            <Button
//                              size="sm"
//                              className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
//                              type="button"
//                              // onClick={() => deleteDealer()}
//                              onClick={handleDeleteAll}
//                            >
//                              Delete
//                            </Button>
//                          </div>
//                        </div>
//                      </div>
//                    </div>
//                    <div className="opacity-50 fixed inset-0 z-40 bg-black" />
//                  </>
//                ) : null}
//              </>
//            </div>
