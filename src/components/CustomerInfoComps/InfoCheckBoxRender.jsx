import {
  RiCheckboxFill as TrueIcon,
  RiCheckboxIndeterminateFill as FalseIcon,
} from "react-icons/ri";
import PropTypes from "prop-types";

function InfoCheckBoxRender({ label, value }) {

  if (value === undefined) value = false;

  //* make sure the value is a boolean, if not convert it to boolean
  const parseBoolean = (value) => {
    if (typeof value !== "boolean") {
      value = value === "true" ? true : false;
    }
    return value;
  };

  return (
    <tr className="border-b-2">
      <td className="  px-4 py-2 text-xs lg:text-sm ">{label} :</td>
      <td className=" px-4 py-2 text-xs lg:text-sm">
        {parseBoolean(value) === true ? (
          <TrueIcon size="18px" color="green" />
        ) : (
          <FalseIcon size="18px" color="red" />
        )}
      </td>
    </tr>
  );
}

InfoCheckBoxRender.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default InfoCheckBoxRender;
