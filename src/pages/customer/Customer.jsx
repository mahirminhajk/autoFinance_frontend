import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  Breadcrumbs,
  Spinner,
  IconButton,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { MdPersonSearch } from "react-icons/md";
import { RiWhatsappFill as WhatsappIcon } from "react-icons/ri";
import {
  BsPersonPlusFill,
  BsFillArrowRightSquareFill as RightArrow,
  BsFillArrowLeftSquareFill as LeftArrow,
} from "react-icons/bs";
import { AiFillHome, AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import axiosapi from "../../helpers/axiosapi";
import {
  getCurrentStatusWithComp,
  getNextStatusWithButton,
} from "../../helpers/StatusHelper";

//*Custome Table
const TABLE_HEAD = [
  "ID",
  "NAME",
  "MOBILE NO",
  "CATEGORY",
  "DEALER",
  "STATUS",
  "WHATSAPP",
  "OPERATION",
  "ACTION",
];

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  //* filter
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [CIBILFilter, setCIBILFilter] = useState("");

  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();

  //* pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);

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

  const fetchCustomers = async () => {
    setLoading(true);

    try {
      const res = await axiosapi.get(
        `/cus?category=${categoryFilter}&status=${statusFilter}&cibil=${CIBILFilter}&page=${currentPage}`
      );
      setCustomers(res.data.customers);
      setPageNumberLimit(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [categoryFilter, statusFilter, CIBILFilter, currentPage]);

  const onSearchSubmit = async (data) => {
    setLoading(true);
    const searchQuery = data.searchQuery;

    try {
      const res = await axiosapi.get(
        `/cus?search=${searchQuery}&status=${statusFilter}&category=${categoryFilter}&page=${currentPage}`
      );
      setPageNumberLimit(res.data.totalPages);
      setCustomers(res.data.customers);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const setCategory = (category) => {
    if (category === categoryFilter) {
      setCategoryFilter("");
    } else {
      setCategoryFilter(category);
    }
  };

  const setCIBIL = (filter) => {
    if (filter === CIBILFilter) {
      setCIBILFilter("");
    } else {
      setCIBILFilter(filter);
    }
  };

  const setStatusFil = (status) => {
    if (status === statusFilter) {
      setStatusFilter("");
    } else {
      setStatusFilter(status);
    }
  };

  return (
    <Sidebar>
      <section className="_heading-container">
        <Breadcrumbs fullWidth>
          <a
            onClick={() => navigate("/")}
            className="opacity-60 text-xs lg:text-sm"
          >
            <AiFillHome />
          </a>
          <a className=" text-xs lg:text-sm">Customers</a>
        </Breadcrumbs>

        <div className="_head-comp grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 mx-8 mt-4">
          <div className="_search md:col-span-2 lg:col-span-2">
            <form onSubmit={handleSubmit(onSearchSubmit)}>
              <div className="flex items-center rounded-full border border-gray-300 px-3 py-1 lg:py-2">
                <MdPersonSearch className="text-gray-500 text-sm md:text-lg lg:text-2xl" />
                <input
                  type="text"
                  name="searchQuery"
                  className="w-full outline-none ml-2"
                  placeholder="Search Customer"
                  {...register("searchQuery")}
                />
              </div>
            </form>
          </div>
          <div className="_head-btn flex md:justify-end lg:justify-end gap-4">
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
                  <div className="grid lg:grid-rows-0 md:gap-1 lg:gap-2">
                    <Typography className="text-base lg:text-lg font-medium lg:font-semibold">
                      CATEGORY
                    </Typography>

                    <div className="grid lg:grid-cols-3 lg:grid-flow-row grid-flow-row gap-3">
                      <Button
                        size="sm"
                        color="yellow"
                        className={
                          categoryFilter === "Gold"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setCategory("Gold")}
                      >
                        Gold
                      </Button>
                      <Button
                        size="sm"
                        color="gray"
                        className={
                          categoryFilter === "Platinum"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setCategory("Platinum")}
                      >
                        Platinum
                      </Button>
                      <Button
                        size="sm"
                        color="amber"
                        className={
                          categoryFilter === "Diamond"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setCategory("Diamond")}
                      >
                        Diamond
                      </Button>
                    </div>
                  </div>
                  <div className="grid lg:grid-rows-0 md:gap-1 lg:gap-2 mt-1">
                    <Typography className="text-base lg:text-lg font-medium lg:font-semibold">
                      CUSTOMER STATUS
                    </Typography>
                    <div className="grid lg:grid-cols-3 lg:grid-flow-row grid-flow-row gap-3">
                      <Button
                        size="sm"
                        color="indigo"
                        className={
                          statusFilter === "pending"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setStatusFil("pending")}
                      >
                        Pending
                      </Button>

                      <Button
                        size="sm"
                        color="lime"
                        className={
                          statusFilter === "login"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setStatusFil("login")}
                      >
                        Login
                      </Button>
                      <Button
                        size="sm"
                        color="orange"
                        className={
                          statusFilter === "pending_doc"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setStatusFil("pending_doc")}
                      >
                        Pending Docs
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        className={
                          statusFilter === "reject"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setStatusFil("reject")}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        color="green"
                        className={
                          statusFilter === "conform"
                            ? "border-4 border-black"
                            : ""
                        }
                        onClick={() => setStatusFil("conform")}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>

                  <div className="grid lg:grid-rows-0 md:gap-1 lg:gap-2 mt-1">
                    <Typography className="text-base lg:text-lg font-medium lg:font-semibold">
                      CIBIL REPORT
                    </Typography>

                    <div className="grid lg:grid-cols-3 lg:grid-flow-row grid-flow-row gap-3">
                      <Button
                        size="sm"
                        color="green"
                        onClick={() => setCIBIL("forward")}
                      >
                        FORWARD
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => setCIBIL("reject")}
                      >
                        REJECT
                      </Button>
                    </div>
                  </div>
                </MenuList>
              </Menu>
            </div>
            {/**ADD Customer */}
            <div className="col-span-3 md:col-span-2">
              <Link to="/customer/general">
                <Button
                  type="button"
                  size="sm"
                  className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-purple-900 hover:bg-primary"
                >
                  <BsPersonPlusFill size={14} /> Add New
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="_custoemr-table m-auto ">
        {loading ? (
          <div>
            <div className="flex justify-center items-center h-screen">
              <Spinner color="blue" className="w-8 h-8" />
            </div>
          </div>
        ) : (
          <div className="bg-white pt-3 mt-3 rounded-sm flex-1">
            {customers.length === 0 ? (
              <div className="flex justify-center flex-col items-center h-[70vh]">
                <Typography className="text-base" color="red">
                  No Customer Found
                </Typography>
                <Typography variant="lead" className="text-base" color="green">
                  Please Add Customer
                </Typography>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border text-center bg-blue-200 lg:text-base md:text-sm text-xs border-gray-200  ">
                    {TABLE_HEAD.map((head) => (
                      <th className="px-4 py-2 font-semibold" key={head}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-center  lg:text-base md:text-sm text-xs">
                  {customers.map((cus) => (
                    <tr
                      className=" border-b border-gray-200 hover:bg-gray-200"
                      key={cus._id}
                    >
                      <td className="px-3 md:py-1 lg:py-2 text-left pl-5 ">
                        {cus.index}
                      </td>
                      <td className="px-3 md:py-1 lg:py-2 text-left pl-5 ">
                        {cus.name}
                      </td>
                      <td className="px-3 md:py-1 lg:py-2 ">
                        {cus.phoneNo || "--"}
                      </td>
                      <td className="px-3 md:py-1 lg:py-2 ">
                        {cus.category || "--"}
                      </td>
                      <td className="px-3 md:py-1 lg:py-2 ">
                        {" "}
                        {`${cus.dealerName || "-"} - ${cus.shopname || "-"}`}
                      </td>
                      <td className="px-3 md:py-1 lg:py-2 font-medium">
                        {getCurrentStatusWithComp(cus.status)}
                      </td>

                      <td className="px-3 md:py-1 lg:py-2 text-sm">
                        <span className="grid place-items-center">
                          <Link
                            to={`https://wa.me/${cus.phoneNo}`}
                            target="_blank"
                          >
                            <WhatsappIcon size={24} color="green" />
                          </Link>
                        </span>
                      </td>

                      <td className="px-3 md:py-1 lg:py-2 flex text-sm justify-center m-2">
                        <Link to={`/customer/${cus._id}`}>
                          <AiOutlineEye
                            size={24}
                            className="text-base mr-2 text-black"
                          />
                        </Link>

                        <Link to={`/customer/${cus._id}/general`}>
                          <FiEdit
                            className="text-base ml-2 text-black "
                            size={24}
                          />
                        </Link>
                      </td>
                      <td className="px-3 md:py-1 lg:py-2 font-medium">
                        {getNextStatusWithButton(cus.status, cus._id, navigate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
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
      {/* Loop through the page numbers with conditional rendering */}
      {new Array(pageNumberLimit).fill("").map((_, idx) => {
        const index = idx + 1;
        
        // Only render certain page numbers or ellipses based on the index
        if (
          index === 1 || // Always show the first page
          index === pageNumberLimit || // Always show the last page
          index === currentPage || // Always show the current page
          Math.abs(index - currentPage) <= 1 // Show pages close to currentPage
        ) {
          return (
            <IconButton key={index} {...getItemProps(index)}>
              {index}
            </IconButton>
          );
        } else if ( // Show ellipses where needed
          (index === currentPage - 2 && currentPage > 3) ||
          (index === currentPage + 2 && currentPage < pageNumberLimit - 2)
        ) {
          return <span key={index}>...</span>;
        }
        return null;
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

      </section>
    </Sidebar>
  );
}

export default Customer;
