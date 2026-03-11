import { Typography } from "@material-tailwind/react";
import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";
import InfoPlainTextRender from "../../../../components/CustomerInfoComps/InfoPlainTextRender";

export const CustomerReadyLogin = ({ readyLogin }) => {

  return (
    <>
      {readyLogin !== 0 && <>
        <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
          Ready to Login
        </Typography>
        <div
          className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-3 md:gap-3 lg:gap-5"
        >
          {readyLogin.map((item, index) => {
            return (
              <div key={index} className="mb-2">
                <Typography className=" text-sm lg:text-base font-semibold text-blue-700">
                  {item.head}
                </Typography>
                <table>
                  <tbody className="text-xs lg:text-sm ">
                    {Object.entries(item.values).map(([key, value]) => {
                      const convertedLabel = key.replace(/_/g, " ");
                      if (item.head === "Other Details" || item.head === "RTO old owners") {
                        return (
                          <InfoCheckBoxRender
                            key={key}
                            label={convertedLabel}
                            value={value}
                          />
                        );
                      } else {
                        return (
                          <InfoPlainTextRender
                            key={key}
                            label={convertedLabel}
                            value={value}
                          />
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </>}
    </>
  );
};
