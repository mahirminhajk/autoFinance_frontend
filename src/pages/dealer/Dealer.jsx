import { useEffect, useState } from "react";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import { DealerHeader } from "./DealerComponents/DealerHeader";
import { DealerList } from "./DealerComponents/DealerList";
import LoadingControler from "../../components/controlComps/LoadingControler";
import ErrControler from "../../components/controlComps/ErrControler";
import axiosapi from "../../helpers/axiosapi";

function Dealer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dealers, setDealers] = useState([]);

  const fetchDealers = async (search = "", type = "") => {
    try {
      setLoading(true);
      const res = await axiosapi.get(`/dealer?search=${search}&type=${type}`);
      setDealers(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const onSearchSubmit = async (data) => {
    fetchDealers(data, "");
  };

  const onFilterSubmit = async (data) => {
    fetchDealers("", data);
  };

  if (loading) {
    return <LoadingControler />;
  }

  if (error) {
    return <ErrControler err={error} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <DealerHeader
          onSearchSubmit={onSearchSubmit}
          setLoading={setLoading}
          onFilterSubmit={onFilterSubmit}
        />

        <DealerList dealers={dealers} />
      </div>
    </Sidebar>
  );
}

export default Dealer;
