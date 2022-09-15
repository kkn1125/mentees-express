import React, { memo, useState } from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Badge, capitalize } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";

interface PointDatePickerProps {
  name: string;
  label: string;
  dates?: {
    start: Dayjs;
    end: Dayjs;
    until: Dayjs;
  };
  handleChange?: (name: string, newValue: any, setValue: any) => void;
}

const badgeIcon = {
  start: "Start",
  end: "End",
  until: "Last",
};

function PointDatePicker({
  name,
  label,
  handleChange,
  dates,
}: PointDatePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={capitalize(label)}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          handleChange(name, newValue, setValue);
        }}
        renderInput={(params) => <TextField size='small' {...params} />}
        renderDay={(day, _value, DayComponentProps) => {
          let icon = undefined;
          let isSameAll = false;
          const datesTimeSet = Object.keys(dates).map((key) => ({
            date: dates[key],
            icon: badgeIcon[key],
          }));

          if (datesTimeSet.some((date) => Boolean(date))) {
            isSameAll = datesTimeSet.some(({ date, icon: icons }) => {
              if (date === null) return false;
              const mainDate = date.toDate();
              const dayTime = day.toDate();
              const isSameYear =
                mainDate.getFullYear() === dayTime.getFullYear();
              const isSameMonth = mainDate.getMonth() === dayTime.getMonth();
              const isSameDate = mainDate.getDate() === dayTime.getDate();
              const allSame = isSameYear && isSameMonth && isSameDate;
              if (allSame) {
                icon = icons;
              }
              return isSameYear && isSameMonth && isSameDate;
            });
          }
          return (
            <Badge
              key={day.toString()}
              overlap='circular'
              badgeContent={isSameAll ? icon : undefined}
              sx={{
                color: "#ffffff",
                textShadow: "0 0 3px black",
              }}>
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
      />
    </LocalizationProvider>
  );
}

export default memo(PointDatePicker);
