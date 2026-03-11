import Sidebar from "../sidebar/Sidebar";
import { Typography } from "@material-tailwind/react";

export function fallbackRender({ error }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <Sidebar>
      <section className="flex items-center justify-center h-full">
        <div className="text-center">
          <Typography color="red" variant="h3">
            Something went wrong:
          </Typography>
          <Typography color="red" variant="paragraph">
            {error.message || "some thing went wrong"}{" "}
          </Typography>
        </div>
      </section>
    </Sidebar>
  );
}

export const logError = (error, info) => {
  console.log("error:", error, "info:", info);
};
// onError={logError}
