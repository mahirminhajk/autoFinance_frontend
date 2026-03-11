import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import {
  Breadcrumbs,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axiosapi from "../../helpers/axiosapi";
import LoadingControler from "../../components/controlComps/LoadingControler";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosapi.get("/das");
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingControler />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <Breadcrumbs fullWidth>
          <a href="/" className="text-xs lg:text-sm">
            <AiFillHome />
          </a>
        </Breadcrumbs>

        <section className="_heading-container">
          <div className="ml-10 mb-3">
            <Typography className="text-center lg:text-left text-2xl  font-bold">
              Hi, <span className="uppercase">{data?.username || "-"}</span>
            </Typography>
          </div>
          <div className="ml-10">
            <Typography className="text-left text-lg lg:text-xl font-semibold ">
              Customers Overview
            </Typography>
          </div>
          <div className="grid grid-cols lg:grid-cols-3 grid-cols-1 lg:mt-10 md:mt-5  gap-5 mx-auto mb-10">
            <div className="lg:ml-10 ">
              <Card
                className="cursor-pointer h-28 lg:h-56 lg:w-auto md:w-64 w-auto lg:mx-auto mx-10 text-white hover:text-black bg-[#003f5c] hover:bg-blue-200"
                onClick={() => navigate("/customer")}
              >
                <CardBody className="self-center lg:my-3  uppercase">
                  <div className="my-2 lg:my-4 mx-auto">
                    <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                      {data?.totalCustomers || "-"}+
                    </Typography>
                  </div>
                  <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                    Total
                  </Typography>
                </CardBody>
              </Card>
            </div>

            <div className="lg:mx-5">
              <Card
                className="cursor-pointer h-28 lg:h-56 lg:w-auto md:w-64 w-auto lg:mx-auto mx-10 text-white hover:text-black bg-[#E83D17] hover:bg-blue-200"
                onClick={() => navigate("/customer")}
              >
                <CardBody className="self-center lg:my-3  uppercase">
                  <div className="my-2 lg:my-4 mx-auto">
                    <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                      {data?.totalPendingCustomers || "-"}+
                    </Typography>
                  </div>
                  <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                    Pending
                  </Typography>
                </CardBody>
              </Card>
            </div>

            <div className="lg:mr-10">
              <Card
                className="cursor-pointer h-28 lg:h-56 lg:w-auto md:w-64 w-auto lg:mx-auto mx-10 text-white hover:text-black bg-[#1CD70F] hover:bg-blue-200"
                onClick={() => navigate("/customer")}
              >
                <CardBody className="self-center lg:my-3  uppercase">
                  <div className="my-2 lg:my-4 mx-auto">
                    <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                      {data?.totalConformCustomers || "-"}+
                    </Typography>
                  </div>
                  <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                    Conform
                  </Typography>
                </CardBody>
              </Card>
            </div>

            <div className=" mx-6 md:col-span-2 lg:col-span-3 mt-5">
              <Card
                className="cursor-pointer h-28 lg:h-30 w-auto mx-5 text-white hover:text-black bg-[#36B38D] hover:bg-blue-200"
                onClick={() => navigate("/dealer")}
              >
                <CardBody className="my-auto  uppercase  grid lg:grid-cols-2">
                  <div className="lg:ml-5 justify-items-start ">
                    <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                      Total Dealers and Brockers
                    </Typography>
                  </div>
                  <div className="mr-5 justify-self-end">
                    <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                      {data?.totalDealers || "-"}+
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="mx-6 md:col-span-2 lg:col-span-3 mt-5">
              <Card
                className="cursor-pointer h-28 lg:h-30 w-auto mx-5  text-white hover:text-black bg-[#B39136] hover:bg-blue-200"
                onClick={() => navigate("/bank")}
              >
                <CardBody className="my-auto uppercase grid lg:grid-cols-2">
                  <div className="lg:ml-5 justify-items-start ">
                    <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                      Total Banks
                    </Typography>
                  </div>
                  <div className="mr-5 justify-self-end">
                    <Typography className="text-base md:text-lg lg:text-2xl font-bold">
                      {data?.totalBanks || "-"}+
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Sidebar>
  );
}

export default Dashboard;
