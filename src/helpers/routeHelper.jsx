//* main
import Account from "../pages/account/Account";
import Bank from "../pages/bank/Bank";
import Call from "../pages/call/Call";
import Cars from "../pages/cars/Cars";
import Customer from "../pages/customer/Customer";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Settings from "../pages/settings/Settings";
import Groups from "../pages/groups/groups";
//* child
import AddCustomer from "../pages/customer/pages/formPage/AddCustomer";
import GeneralForm from "../pages/customer/pages/formPage/GeneralForm";
import DocForm from "../pages/customer/pages/formPage/DocForm";
import CustomerVerification from "../pages/customer/pages/formPage/CustomerVerification";
import CustomerReadyLogin from "../pages/customer/pages/formPage/CustomerReadyLogin";
import CustomerInfo from "../pages/customer/pages/customerInfo/customerInfo";
import CustomerLoginForm from "../pages/customer/pages/formPage/CustomerLoginForm";
import CustomerFTR from "../pages/customer/pages/formPage/CustomerFTR";
import CustomerLoanApproved from "../pages/customer/pages/formPage/CustomerLoanApproved";
import CustomerLoanDesp from "../pages/customer/pages/formPage/CustomerLoanDesp";
import CustomerRtowork from "../pages/customer/pages/formPage/CustomerRtowork";
import CustomerCompleted from "../pages/customer/pages/formPage/CustomerCompleted";
//*Dealer
import Dealer from "../pages/dealer/Dealer";
import DealerInfo from "../pages/dealer/DealerInfo/dealerInfo";
import DealerCarInfo from "../pages/dealer/DealerInfo/dealerCarInfo/dealerCarInfo";
import DealerMainForm from "../pages/dealer/DealerForm/DealerMainForm";
import DealerEditForm from "../pages/dealer/DealerForm/DealerEditForm";
import BankInfo from "../pages/bank/BankInfo/bankInfo";
import BankForm from "../pages/bank/BankForm/bankForm";
import BankEditForm from "../pages/bank/BankForm/BankEditForm";
import ProfileInfo from "../pages/settings/settingsProfile/profileInfo";
import ProfileForm from "../pages/settings/settingsProfile/profileForm";
import StaffList from "../pages/settings/Staffs/StaffList";
import StaffInfo from "../pages/settings/Staffs/StaffInfo";
import StaffForm from "../pages/settings/Staffs/StaffForm";
import AddStaffs from "../pages/settings/Staffs/AddStaffs";

import Logout from "../pages/login/Logout";
import AppInfo from "../pages/settings/AppInfo/AppInfo";
import ContactUs from "../pages/settings/AppInfo/ContactUs";
import TestPage from "../pages/testPage/TestPage";
import CustomerBankForm from "../pages/customer/pages/formPage/CustomerBankForm";

const routeHelper = [
  //* Main routes
  { path: "/", comp: <Dashboard /> },
  { path: "/customer", comp: <Customer /> },
  { path: "/dealer", comp: <Dealer /> },
  { path: "/call", comp: <Call /> },
  { path: "/cars", comp: <Cars /> },

  { path: "/settings", comp: <Settings /> },
  { path: "/login", comp: <Login /> },
  { path: "/logout", comp: <Logout /> },

  //* customer info
  { path: "/customer/:cusid", comp: <CustomerInfo /> },
  //*child routes
  { path: "/customer/general", comp: <AddCustomer /> },
  { path: "/customer/:cusid/general", comp: <GeneralForm /> },
  { path: "/customer/:cusid/rto", comp: <CustomerRtowork /> },
  { path: "/customer/:cusid/doc", comp: <DocForm /> },
  { path: "/customer/:cusid/ready", comp: <CustomerReadyLogin /> },
  { path: "/customer/:cusid/login", comp: <CustomerLoginForm /> },
  { path: "/customer/:cusid/bank", comp: <CustomerBankForm /> },
  { path: "/customer/:cusid/ftr", comp: <CustomerFTR /> },
  { path: "/customer/:cusid/verification", comp: <CustomerVerification /> },
  { path: "/customer/:cusid/loan", comp: <CustomerLoanApproved /> },
  { path: "/customer/:cusid/desp", comp: <CustomerLoanDesp /> },
  { path: "/customer/:cusid/completed", comp: <CustomerCompleted /> },

  //* dealers
  { path: "/dealer", comp: <Dealer /> },
  { path: "/dealer/create", comp: <DealerMainForm /> },
  { path: "/dealer/:dealerid/edit", comp: <DealerEditForm /> },
  { path: "/dealer/:dealerid", comp: <DealerInfo /> },
  { path: "/dealer/:dealerid/cars/:dcarid", comp: <DealerCarInfo /> },

  //* banks
  { path: "/bank", comp: <Bank /> },
  { path: "/bank/:bankid", comp: <BankInfo /> },
  { path: "/bank/create", comp: <BankForm /> },
  { path: "/bank/:bankid/edit", comp: <BankEditForm /> },

  //* account
  { path: "/account", comp: <Account /> },

  //* groups
  { path: "/groups", comp: <Groups /> },

  //* test
  { path: "/test", comp: <TestPage /> },

  //* settings
  { path: "/settings", comp: <Settings /> },
  { path: "/settings/profile", comp: <ProfileInfo /> },
  { path: "/settings/profile/edit", comp: <ProfileForm /> },
  { path: "/settings/staffs", comp: <StaffList /> },
  { path: "/settings/staffs/add", comp: <AddStaffs /> },
  { path: "/settings/staffs/:id/profile", comp: <StaffInfo /> },
  { path: "/settings/staffs/:id/edit", comp: <StaffForm /> },
  { path: "/settings/appinfo", comp: <AppInfo /> },
  { path: "/settings/appinfo/contactus", comp: <ContactUs /> },
];

export default routeHelper;
