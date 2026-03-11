import PropTypes from "prop-types";
function FormSubHeading(props) {
  return (
    <p className="text-sm font-semibold md:text-lg lg:text-xl md:font-semibold lg:font-semibold text-gray-950 ">
      {props.subheading}
    </p>
  );
}

FormSubHeading.propTypes = {
  subheading: PropTypes.string.isRequired,
};

export default FormSubHeading;

