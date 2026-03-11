import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["No", "Name", "Email", "Phone No"];
function BankEmployees({ employees }) {
  const BankStaffsDetails = employees || [];

  return (
    <>
      <Typography className="mb-3 text-xl font-bold text-left text-black-700 ml-2 ">
        Employees
      </Typography>

      <Card className=" h-auto w-auto mx-10">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="text-xs md:text-sm lg:text-base uppercase">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm lg:text-base">
            {BankStaffsDetails.map((employee, index) => {
              const isLast = index === BankStaffsDetails.length - 1;
              const classes = isLast
                ? "p-2"
                : "p-2 border-b border-blue-gray-50";

              return (
                <tr key={employee.index}>
                  <td className={classes}>{employee.index}</td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    {employee.name || "N/A"}
                  </td>
                  <td className={classes}>{employee.email || "N/A"}</td>
                  <td className={classes}>{employee.phoneNo || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default BankEmployees;
