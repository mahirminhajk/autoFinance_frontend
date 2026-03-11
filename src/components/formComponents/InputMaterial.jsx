import { Input } from "@material-tailwind/react";

function InputMaterial({
  _label,
  _type = "text",
  _value,
  _name,
  handleInputChange,
}) {
  return (
    <div>
      <Input
        type={_type}
        color="blue"
        label={_label}
        name={_name}
        _value={_value}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}

export default InputMaterial;
