import Sidebar from "../sidebar/Sidebar";
import { Progress, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

function LoadingProgressControler({ progress }) {
  return (
    <Sidebar>
      <section className="flex items-center justify-center h-full">
        <div className="w-1/2">
          <div className="flex items-center justify-center mb-2">
            <Typography color="blue" variant="h6">
              {progress}%
            </Typography>
          </div>
          <Progress value={progress} />
        </div>
      </section>
    </Sidebar>
  );
}

LoadingProgressControler.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default LoadingProgressControler;
