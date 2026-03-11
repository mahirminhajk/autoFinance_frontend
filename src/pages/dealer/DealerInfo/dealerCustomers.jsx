import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function DealerCustomers({ customers }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="m-auto">
      <div className="grid justify-center mx-auto my-5">
        <Button
          size="sm"
          onClick={() => setShowModal(!showModal)}
          type="button"
          className=" text-white text-sm bg-purple-600 hover:bg-blue-600 border-l font-semibold "
        >
          Dealer Customers
        </Button>
      </div>

      {showModal ? (
        <>
          <table className="m-auto mb-10 border border-black-500 shadow-md">
            <thead className="text-xs md:text-sm lg:text-base uppercase">
              <tr className="border bg-blue-100 border-gray-200 hover:bg-blue-100 ">
                <td className="px-4 py-2  font-semibold">Name</td>
                <td className="px-4 py-2  font-semibold">Mobile no</td>
                <td className="px-4 py-2  font-semibold">Category</td>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm lg:text-base">
              {customers.map((customer) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={customer._id}
                >
                  <td className="  px-4 py-2 ">
                    <Link to={`/customer/${customer._id}`}>
                      {customer.name}
                    </Link>
                  </td>
                  <td className=" px-4 py-2">{customer.phoneNo}</td>
                  <td className="  px-4 py-2">{customer.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
}

export default DealerCustomers;
