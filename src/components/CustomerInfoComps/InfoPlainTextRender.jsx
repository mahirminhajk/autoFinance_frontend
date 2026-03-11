import PropTypes from "prop-types";

function InfoPlainTextRender({ label, value }) {
  return (
    <tr className="border-b-2">
      <td className="  px-4 py-2 text-xs lg:text-sm ">{label} :</td>
      <td className=" px-4 py-2  text-xs lg:text-sm">{value || "----"}</td>
    </tr>
  );
}

InfoPlainTextRender.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default InfoPlainTextRender;
