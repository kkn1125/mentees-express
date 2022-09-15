import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { capitalize } from "@mui/material";

interface SelectBoxProps {
  name: string;
  label: string;
  formik: any;
}

const typeList = ["Seminar", "Expo", "Conference"];

function SelectBox({ name, label, formik }: SelectBoxProps) {
  const [age, setAge] = useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl size='small'>
      <InputLabel id={name}>{capitalize(label)}</InputLabel>
      <Select
        labelId={name}
        id={name}
        name={name}
        value={formik.values[name]}
        label={label}
        onChange={(e: SelectChangeEvent) => {
          formik.handleChange(e as React.ChangeEvent<any>);
          handleSelectChange(e);
        }}>
        {typeList.map((type, idx) => (
          <MenuItem key={type + idx} value={type}>
            {capitalize(type)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectBox;
