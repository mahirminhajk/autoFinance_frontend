import { Input } from "@material-tailwind/react";
import PropTypes from "prop-types";

function HookInputMaterial({
  label,
  type,
  name,
  register,
  error,
  _min,
  _max,
  _value,
}) {
  return (
    <div>
      <Input
        label={label}
        defaultValue={_value}
        type={type}
        {...register(name)}
        error={error ? true : false}
        min={_min}
        max={_max}
      />
      <p className="text-red-500">{error?.message}</p>
    </div>
  );
}

HookInputMaterial.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  _min: PropTypes.number,
  _max: PropTypes.number,
  _value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HookInputMaterial;
