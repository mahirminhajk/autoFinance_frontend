import { Checkbox } from "@material-tailwind/react";
import PropTypes from "prop-types";

function HookCheckboxMaterial({
    label,
    name,
    register,
    defaultChecked = false,
}) {
    return (
        <Checkbox
            id={name}
            label={label}
            name={name}
            {...register(name)}
            defaultChecked={defaultChecked}
        />
    );
}

HookCheckboxMaterial.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
};

export default HookCheckboxMaterial;
