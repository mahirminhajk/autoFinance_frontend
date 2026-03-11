import {
  Breadcrumbs,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { BsPersonPlusFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export const DealerHeader = ({
  onSearchSubmit,
  setLoading,
  onFilterSubmit,
}) => {
  const [serachQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSearchSubmit(serachQuery);
    setLoading(false);
  };

  return (
    <>
      <section className="_heading-container ">
        <Breadcrumbs fullWidth>
          <a
            onClick={() => navigate("/")}
            className="opacity-60 text-xs lg:text-sm"
          >
            <AiFillHome />
          </a>
          <a className="text-xs lg:text-sm">Dealers or Brockers</a>
        </Breadcrumbs>

        <div className="_head-comp grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 mx-8 mt-4">
          <div className="_search md:col-span-2 lg:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="flex items-center rounded-full border border-gray-300 px-3 py-1 lg:py-2">
                <MdPersonSearch className="text-gray-500 text-sm md:text-lg lg:text-2xl" />
                <input
                  type="text"
                  name="searchQuery"
                  className="w-full outline-none ml-2"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Dealer or Brocker"
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
                          className="bg-red-100 text-black"
                          onClick={() => onFilterSubmit("dealer")}
                        >
                          Dealer
                        </Button>
                        <Button
                          size="sm"
                          className="bg-yellow-100 text-black"
                          onClick={() => onFilterSubmit("broker")}
                        >
                          Broker
                        </Button>
                      </div>
                    </div>
                  </div>
                </MenuList>
              </Menu>
            </div>
            {/**ADD Dealer */}
            <div className="col-span-3 md:col-span-2">
              <Link to="/dealer/create">
                <Button
                  size="sm"
                  type="button"
                  className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-purple-900 hover:bg-primary"
                >
                  <BsPersonPlusFill size={14} /> Add New
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
