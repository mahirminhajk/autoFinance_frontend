//*comp
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { Breadcrumbs } from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";

function Cars() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <Breadcrumbs fullWidth>
        <a
          onClick={() => navigate("/")}
          className="opacity-60 text-xs lg:text-sm"
        >
          <AiFillHome />
        </a>
        <a className="text-sm">Cars</a>
      </Breadcrumbs>
    </Sidebar>
  );
}

export default Cars;
