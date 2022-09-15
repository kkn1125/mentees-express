import TagIcon from "@mui/icons-material/Tag";
import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import useSnack from "../../hooks/useSnack";

interface TagFieldProps {
  autoCompleteList: React.MutableRefObject<string[]>;
  id: string;
  name: string;
  handleTagChange: (tags: string[]) => void;
}

function TagField({
  autoCompleteList,
  id,
  name,
  handleTagChange,
}: TagFieldProps) {
  const { warningSnack } = useSnack();
  // 자동완성 태그 리스트 담는 배열
  const [customList, setCustomList] = useState([]);
  const [currentText, setCurrentText] = useState("");

  const handleKyeboard = (e: React.KeyboardEvent) => {
    if (currentText.length > 0 && e.key === "Enter") {
      const isDup = customList.find((item) => item.title === currentText);
      if (Boolean(isDup)) {
        warningSnack("중복되는 태그가 존재합니다.");
      } else {
        setCustomList([
          ...customList.reduce((acc, cur) => {
            if (acc.length === 0 || acc.find((ac) => ac.title !== cur.title)) {
              acc.push(cur);
            }
            return acc;
          }, []),
          {
            title: currentText,
            value: currentText,
          },
        ]);
      }
      setCurrentText("");
    } else {
      setCurrentText((e.target as HTMLInputElement).value);
    }
  };

  useEffect(() => {
    handleTagChange(autoCompleteList.current);
  }, [autoCompleteList.current]);

  return (
    <Autocomplete
      multiple
      id={id}
      options={customList.map((option) => option.title)}
      freeSolo
      onKeyUp={handleKyeboard}
      renderTags={(value: readonly string[], getTagProps) => {
        autoCompleteList.current = value.slice(0);
        return value.map((option: string, index: number) => (
          <Chip
            color='primary'
            variant='outlined'
            icon={<TagIcon />}
            label={option}
            {...getTagProps({ index })}
          />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          size='small'
          variant='outlined'
          label='태그'
          placeholder='Seminar'
        />
      )}
    />
  );
}

export default memo(TagField);
