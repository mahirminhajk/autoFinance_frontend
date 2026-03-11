import { useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import DealerInfoDetails from "./dealerInfoDetails";
import { useNavigate, useParams } from "react-router-dom";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import { AiFillHome } from "react-icons/ai";

function DealerInfo() {
  const navigate = useNavigate();

  const dealerId = useParams().dealerid;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return <LoadingControler />;
  }

  if (error) {
    return <ErrControler err={error} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <Breadcrumbs fullWidth>
          <a
            onClick={() => navigate("/")}
            className="opacity-60 text-xs lg:text-sm"
          >
            <AiFillHome />
          </a>
          <a
            onClick={() => navigate("/dealer")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Dealers or Brockers
          </a>
          <a className="text-xs lg:text-sm">Dealer or Brocker Info</a>
        </Breadcrumbs>

        <DealerInfoDetails
          dealerId={dealerId}
          setError={setError}
          setLoading={setLoading}
        />
      </div>
    </Sidebar>
  );
}

export default DealerInfo;
