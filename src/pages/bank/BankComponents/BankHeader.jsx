import { Breadcrumbs, Button } from "@material-tailwind/react";
import { useState } from "react";
import { AiFillBank, AiFillHome } from "react-icons/ai";
import { BiSolidBank } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export const BankHeader = ({ onSearchSubmit, setLoading }) => {
  const navigate = useNavigate();

  const [serachQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSearchSubmit(serachQuery);
    setLoading(false);
  };

  return (
    <>
      <section className="_heading-container">
        <Breadcrumbs fullWidth>
          <a
            onClick={() => navigate("/")}
            className="opacity-60 text-xs lg:text-sm"
          >
            <AiFillHome />
          </a>
          <a className="text-xs lg:text-sm">Banks</a>
        </Breadcrumbs>

        <div className="_head-comp grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 mx-8 mt-4">
          <div className="_search md:col-span-2 lg:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="flex items-center rounded-full border border-gray-300 px-3 py-1 lg:py-2">
                <BiSolidBank className="text-gray-500 text-sm md:text-lg lg:text-2xl" />
                <input
                  type="text"
                  name="searchQuery"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none ml-2 "
                  placeholder="Search Bank"
                />
              </div>
            </form>
          </div>
          <div className="_head-btn  flex md:justify-end lg:justify-end gap-4">
            <div></div>
            {/**ADD Dealer */}
            <div className="col-span-3 md:col-span-2">
              <Link to="/bank/create">
                <Button
                  size="sm"
                  type="button"
                  className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-purple-900 hover:bg-primary"
                >
                  <AiFillBank size={14} /> Add New
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
