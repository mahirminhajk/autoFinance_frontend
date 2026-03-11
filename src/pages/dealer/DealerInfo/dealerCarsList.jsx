import React from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { DealerCarPage } from "./dummyDataD";

function DealerCars() {
  const navigate = useNavigate();
  const [viewModal, setViewModal] = React.useState(false);

  return (
    <>
      <div className="container justify-items-center">
        <div className="grid justify-center mx-auto">
          <Button
            onClick={() => setViewModal(true)}
            type="button"
            className="px-4 py-2 text-white text-sm bg-purple-600 hover:bg-blue-600 border-l float-right font-semibold rounded-full shadow-lg"
          >
            Uploaded Cars
          </Button>
        </div>
        {viewModal ? (
          <>
            <div className="container h-screen w-auto grid grid-flow-row auto-rows-max ">
              <div className="bg-white m-3">
                {/* Card-Start */}
                <>
                  {DealerCarPage.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => navigate(`/dealers/1000/cars/${order.id}`)}
                      className=" transform transition duration-500 hover:scale-110"
                    >
                      <Card className="border border-gray-200 mx-3 my-2 relative flex w-72 flex-col ">
                        <CardHeader
                          color="blue-gray"
                          className="relative w-60 h-32 my-3 flex items-center mx-3 shadow-lg"
                        >
                          <img
                            src={order.img}
                            alt="img-blur-shadow"
                            className=" mb-2 my-3"
                          />
                        </CardHeader>
                        <CardBody className=" p-3 text-left">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                          >
                            Car Name: <b>{order.car_name}</b>
                          </Typography>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                          >
                            Modal: <b>{order.modal}</b>
                          </Typography>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                          >
                            Dealer Name: <b>{order.dealer_name}</b>
                          </Typography>
                        </CardBody>
                      </Card>
                    </button>
                  ))}
                  {/* Card-End */}
                </>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default DealerCars;
