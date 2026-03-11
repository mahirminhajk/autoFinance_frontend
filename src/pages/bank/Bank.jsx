import { useEffect, useState } from "react";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import { BankList } from "./BankComponents/bankList";
import { BankHeader } from "./BankComponents/BankHeader";
import axiosapi from "../../helpers/axiosapi";
import LoadingControler from "../../components/controlComps/LoadingControler";
import ErrControler from "../../components/controlComps/ErrControler";

function Bank() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [banks, setBanks] = useState([]);

  const fetchBanks = async (search = "") => {
    try {
      setLoading(true);
      const res = await axiosapi.get(`/bank?search=${search}`);
      setBanks(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const onSearchSubmit = async (data) => {
    fetchBanks(data, "");
  };

  if (loading) {
    return <LoadingControler />;
  }

  if (error) {
    return <ErrControler err={error} />;
  }

  return (
    <Sidebar>
      <BankHeader onSearchSubmit={onSearchSubmit} setLoading={setLoading} />
      <BankList banks={banks} />
    </Sidebar>
  );
}

export default Bank;
