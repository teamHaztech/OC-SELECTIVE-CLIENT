import {
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { useState } from "react";

interface option {
  test_type: string;
  t_name?: string;
  id: number;
}
interface props {
  name: string;
  selectName: string;
  options: option[];
  defaultValue: string;
  func?: (val: number) => void;
}

const SelectBox = (props: props) => {
  const [val, setVal] = useState<string>(props.defaultValue);
  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value as string);
    if (props.func) {
      props.func(parseInt(event.target.value));
    }
  };

  return (
    // <FormControl>
    <Select
      sx={{
        fontSize: "16px",
        width: { xs: "175px", sm: "175px", md: "270px" },
        height: "28px",
        border: "1px #1D1D1D",
        backgroundColor: "#FFFFFF",
        color: "black",
      }}
      value={val}
      onChange={handleChange}
      // defaultValue={String(props.defaultValue)}
      // label={props.label}
      displayEmpty
      name={props.selectName}
      inputProps={{
        name: `${props.name}`,
        // id: "uncontrolled-native",
      }}
    >
      <MenuItem value="" disabled>
        <em>{props.name}</em>
      </MenuItem>
      {props.options?.map((item: option, key) => {
        return (
          <MenuItem key={key} value={String(item.id)}>
            {item.test_type || item.t_name}
          </MenuItem>
        );
      })}
    </Select>
    // </FormControl>
  );
};

export default SelectBox;
