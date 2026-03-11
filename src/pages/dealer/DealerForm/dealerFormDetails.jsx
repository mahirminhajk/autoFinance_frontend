// import React, { useState } from "react";
// import { Button } from "@material-tailwind/react";
// import DealerFormStaff from "./dealerFormStaff";
// import FormSubHeading from "../../../components/formComponents/FormSubHeading";
// import InputComponent from "../../../components/formComponents/inputComponent";
// import DropdownComponent from "../../../components/formComponents/dropdownComponent";

// function DealerFormDetails(defaultValue) {
//   const [showModal, setShowModal] = React.useState(false);
//   const [formState, setFormState] = useState(
//     defaultValue || {
//       name: "",
//       shop_name: "",
//       place: "",
//       phone_no: "",
//     }
//   );

//   // const [errors, setErrors] = useState("");

//   // const validateForm = () => {
//   //   if (
//   //     formState.name &&
//   //     formState.shop_name &&
//   //     formState.place &&
//   //     formState.phone_no
//   //   ) {
//   //     setErrors("");
//   //     return true;
//   //   } else {
//   //     let errorFields = [];
//   //     for (const [key, value] of Object.entries(formState)) {
//   //       if (!value) {
//   //         errorFields.push(key);
//   //       }
//   //     }
//   //     setErrors(errorFields, join(", "));
//   //     return false;
//   //   }
//   // };

//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       {/* dealer-details */}
//       <div className="w-max m-3">
//         <div className="w-max grid grid-cols-2 gap-4">
//           <form action="">
//             <FormSubHeading subheading="Details" />
//             <div className="grid justify-center ml-10 mb-5 ">
//               <InputComponent
//                 fieldtitle="* Name :"
//                 type="text"
//                 hint="name.."
//                 name="name"
//                 value={formState.name}
//                 onChange={handleChange}
//               />
//               <InputComponent
//                 fieldtitle="* Shop Name :"
//                 type="text"
//                 hint="shop name.."
//                 name="shop_name"
//                 value={formState.shop_name}
//                 onChange={handleChange}
//               />
//               <InputComponent
//                 fieldtitle="* Place :"
//                 type="text"
//                 hint="place.."
//                 name="place"
//                 value={formState.place}
//                 onChange={handleChange}
//               />
//               <InputComponent
//                 fieldtitle="* Phone No. :"
//                 type="tel"
//                 hint="phone no.."
//                 _value="91"
//                 name="phone_no"
//                 value={formState.phone_no}
//                 onChange={handleChange}
//               />
//               <DropdownComponent
//                 // drtitle="Select Dealer or Brocker"
//                 name="dropdown"
//                 value={formState.dropdown}
//                 onChange={handleChange}
//                 drtype="Select"
//                 drname1="Dealer"
//                 drname2="Brocker"
//               />
//             </div>
//           </form>

//           <div className="w-max mx-3 mt-5">
//             <Button
//               type="add"
//               onClick={() => setShowModal(true)}
//               className=" px-4 py-2 mt-1 text-white text-sm bg-blue-600 hover:bg-purple-800 border-l font-semibold rounded-full shadow-lg float-none"
//             >
//               Add Staffs
//             </Button>
//             {showModal ? (
//               <>
//                 <DealerFormStaff />
//               </>
//             ) : null}
//           </div>
//         </div>
//       </div>
//       {/* dealer-details-end */}
//     </>
//   );
// }

// export default DealerFormDetails;
