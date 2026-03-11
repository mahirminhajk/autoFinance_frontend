import { Select, Option } from "@material-tailwind/react";

function DropdownMaterial({ _label, _options }) {
  return (
    <div>
      <Select variant="outlined" label={_label}>
        {_options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default DropdownMaterial;
