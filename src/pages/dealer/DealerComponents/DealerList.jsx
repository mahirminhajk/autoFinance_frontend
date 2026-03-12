import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { RiUserSearchFill } from "react-icons/ri";

export const DealerList = ({ dealers }) => {
  const navigate = useNavigate();
  return (
    <>
      {dealers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-3">
            <RiUserSearchFill className="text-teal-500 text-3xl" />
          </div>
          <p className="text-gray-700 font-bold text-base">No Dealers Found</p>
          <p className="text-gray-400 text-sm mt-1">
            No dealers match your search or filter. Try a different query or add a new dealer.
          </p>
        </div>
      ) : (
        <div className=" border-gray-200 py-2 md:py-3 lg:py-5 px-2 md:px-3 lg:px-5 gap-5 grid grid-cols grid-cols-{n} md:grid-cols-2 lg:grid-cols-4  gap-y-3 gap-x-3 ">
          {/* Card-Start */}

          {dealers.map((dealer) => (
            <button
              key={dealer._id}
              onClick={() => navigate(`/dealer/${dealer._id}`)}
              className=" transform transition duration-500 hover:scale-110"
            >
              <Card className="mx-auto lg:mx-5 my-3 w-64 md:w-64 lg:w-64 h-52 md:h-52 lg:h-52  relative items-center flex flex-col ">
                <Avatar
                  src={
                    dealer.photo ||
                    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  }
                  alt="img-blur-shadow"
                  layout="fill"
                  className="my-2"
                  size="lg"
                />
                {/* </CardHeader> */}
                <CardBody className="p-3">
                  <Typography
                    className="text-base md:text-base lg:text-lg font-bold"
                    color="blue-gray"
                  >
                    {dealer.name}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-sm md:text-base lg:text-lg font-medium"
                  >
                    {dealer.type}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-sm md:text-base lg:text-lg font-normal"
                  >
                    {dealer.place}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-sm md:text-base lg:text-lg font-medium"
                  >
                    {dealer.shopname}
                  </Typography>
                </CardBody>
              </Card>
            </button>
          ))}

          {/* Card-End */}
        </div>
      )}
    </>
  );
};
