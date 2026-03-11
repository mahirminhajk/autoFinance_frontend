import { Select, Option } from "@material-tailwind/react";
import PropTypes from "prop-types";

function DropdownComponent(props) {
  return (
    <div className="mt-10">
      <p>{props.drtitle}</p>

      <Select label="Select Version">
        <Option>{props.drtype}</Option>
        <Option>{props.drname}</Option>
        <Option>{props.drname1}</Option>
        <Option>{props.drname2}</Option>
      </Select>
    </div>
  );
}

DropdownComponent.propTypes = {
  drtitle: PropTypes.string.isRequired,
  drtype: PropTypes.string.isRequired,
  drname: PropTypes.string.isRequired,
  drname1: PropTypes.string.isRequired,
  drname2: PropTypes.string.isRequired,
};

export default DropdownComponent;
