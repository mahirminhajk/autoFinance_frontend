import Sidebar from "../sidebar/Sidebar";
import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

function ErrControler({ err }) {
  return (
    <Sidebar>
      <section className="flex items-center justify-center h-full">
        <div className="text-center">
          <Typography color="red" variant="h3">
            Please Try Again
          </Typography>
          <Typography color="red" variant="paragraph">
            {err?.message || "some thing went wrong"}{" "}
          </Typography>
        </div>
      </section>
    </Sidebar>
  );
}

ErrControler.propTypes = {
  err: PropTypes.object.isRequired,
};

export default ErrControler;
