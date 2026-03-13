import { useEffect, useRef, useState } from "react";
import { RiWhatsappFill, RiWhatsappFill as WhatsappIcon } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axiosapi from "../../../helpers/axiosapi";
import { Breadcrumbs, Button, Menu, MenuHandler, MenuList, Typography } from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";

//* create a function which will pass a argu of object, check if the object have dealer or bank key and return one of them
function checkDealerOrBank(obj) {
  if (obj.dealer) {
    return {
      name: obj.dealer.name,
      link: `/dealer/${obj.dealer._id}`,
    };
  } else if (obj.bank) {
    return {
      name: obj.bank.bankName,
      link: `/bank/${obj.bank._id}`,
    };
  } else {
    return {
      name: obj.shopname || obj.name,
      link: `/dealer/${obj._id}`,
    }
  }
}

function GroupList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //* quer
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    const result = await axiosapi.get(`/group?filter=${filterQuery}`);
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filterQuery]);

  //* serach input ref
  const searchInputRef = useRef(null);

  const onSearchSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const searchQuery = searchInputRef.current.value;
    setSearchQuery(searchQuery);
    const result = await axiosapi.get(`/group/search?query=${searchQuery}`);
    setData(result.data);
    setLoading(false);
  };

  const handleFilterBtn = (filter) => {
    if (filterQuery === filter)
      setFilterQuery("all");
    else
      setFilterQuery(filter);

  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (<>
      <Breadcrumbs fullWidth>
        <a
          onClick={() => navigate("/")}
          className="opacity-60 text-xs lg:text-sm"
        >
          <AiFillHome />
        </a>
        <a className="text-xs lg:text-sm">Groups</a>
      </Breadcrumbs>

      {/* this code for future updation */}

      <div className="_head-comp grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 mx-8 mt-4">
        <div className="_search md:col-span-2 lg:col-span-2">
          <form onSubmit={onSearchSubmit} >
            <div className="flex items-center rounded-full border border-gray-300 px-3 py-1 lg:py-2">
              <RiWhatsappFill className="text-gray-500 text-sm md:text-lg lg:text-2xl" />
              <input
                type="text"
                name="searchQuery"
                ref={searchInputRef}
                className="w-full outline-none ml-2 "
                placeholder="Search WhatsApp"
              />
            </div>
          </form>
        </div>
        <div className="_head-btn  flex md:justify-end lg:justify-end gap-4">
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
                <div className="grid lg:grid-rows-2 ">
                  <div className="grid lg:grid-rows-2">
                    <div>
                      <Typography className="text-base lg:text-lg font-medium lg:font-semibold">
                        Category
                      </Typography>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-[3px]">
                      <Button size="sm" color="purple" onClick={() => handleFilterBtn("dealer")}>
                        Dealer
                      </Button>
                      <Button size="sm" color="purple" onClick={() => handleFilterBtn("staffs")}>
                        Dealer Staffs
                      </Button>
                    </div>
                  </div>
                  <div className="grid lg:grid-rows-2 ">
                    <div>
                      <Typography className="text-base lg:text-lg font-medium lg:font-semibold">
                        Bank
                      </Typography>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-[3px] ">
                      <Button size="sm" color="red" onClick={() => handleFilterBtn("manager")}>
                        Managers
                      </Button>
                      <Button size="sm" color="green" onClick={() => handleFilterBtn("executive")}>
                        Executives
                      </Button>
                    </div>
                  </div>
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      <div className="bg-white pt-3 mt-3 pb-4 rounded-sm flex-1">
        <table className="w-full">
          <thead>
            <tr className="border text-center bg-blue-200 lg:text-base md:text-sm text-xs border-gray-200  ">
              <td className="px-4 py-2 font-semibold">Name</td>
              <td className="px-4 py-2 font-semibold">Mobile No</td>
              <td className="px-4 py-2 font-semibold">Email</td>
              <td className="px-4 py-2 font-semibold">Role</td>
              <td className="px-4 py-2 font-semibold">Workplace</td>
              <td className="px-4 py-2 font-semibold">Whatsapp</td>
            </tr>
          </thead>

          <tbody className="text-center  lg:text-base md:text-sm text-xs">
            {
              //* if the data is empty then show no data found, else show the data}
              data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 px-6">
                    <div className="flex flex-col items-center justify-center text-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                        <RiWhatsappFill className="text-green-400 text-3xl" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-bold text-base">No Groups Found</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {searchQuery
                            ? `No results for "${searchQuery}". Try a different search.`
                            : filterQuery !== "all"
                            ? `No groups match the current filter. Try changing the filter.`
                            : "No groups have been founded yet."}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((order, i) => {
                  const data = checkDealerOrBank(order);

                  return (
                    <tr
                      className=" border-b  border-gray-200 hover:bg-gray-200 "
                      key={i}
                    >
                      <td className="px-0 py-0 text-left pl-5 ">{order.name}</td>
                      <td className="px-0 py-0 ">{order.phoneNo}</td>
                      <td className="px-0 py-0 ">
                        {order.email || "---"}
                      </td>
                      <td className="px-0 py-0 ">
                        {order.role || "---"}
                      </td>
                      <td className="px-0 py-0 ">
                        <Link to={data.link}>
                          {data.name}
                        </Link>
                      </td>
                      <td className="px-0 py-0 m-2 flex justify-center ">
                        <Link
                          to={`https://wa.me/91${order.phoneNo}`}
                          target="_blank"
                        >
                          <WhatsappIcon size={30} color="green" />
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )
            }
          </tbody>
        </table>
      </div>
    </>
    );
  }
}

export default GroupList;