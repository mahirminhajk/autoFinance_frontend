import { Spinner } from "@material-tailwind/react";
import Sidebar from "../sidebar/Sidebar";
import PropTypes from "prop-types";

//* size chart smaller-0, bigger-4
const sizeChart = ["h-4 w-4", "h-6 w-6", "h-8 w-8", "h-10 w-10", "h-12 w-12"];

function LoadingControler({ size = 1, color = "blue" }) {
  return (
    <Sidebar>
      <section className="flex items-center justify-center h-full">
        <Spinner className={sizeChart[size]} color={color} />
      </section>
    </Sidebar>
  );
}

LoadingControler.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default LoadingControler;
