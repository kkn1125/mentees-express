import TagIcon from "@mui/icons-material/Tag";
import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { Fragment, memo, useEffect, useState } from "react";
import useSnack from "../../hooks/useSnack";

interface TagFieldProps {
  autoCompleteList: React.MutableRefObject<string[]>;
  id: string;
  name: string;
  values: string[];
  handleTagChange: (tags: string[]) => void;
}

function TagField({
  autoCompleteList,
  id,
  name,
  values,
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
    <Fragment>
      {values.length > 0 && (
        <AutocompleteWithValues
          id={id}
          name={name}
          values={values}
          customList={customList}
          handleKyeboard={handleKyeboard}
          autoCompleteList={autoCompleteList}
        />
      )}
      {values.length === 0 && (
        <AutocompleteWithValues
          id={id}
          name={name}
          customList={customList}
          handleKyeboard={handleKyeboard}
          autoCompleteList={autoCompleteList}
        />
      )}
    </Fragment>
  );
}

const AutocompleteWithValues = (props) => {
  const { values, id, customList, handleKyeboard, autoCompleteList, name } =
    props;
  return (
    <Autocomplete
      multiple
      id={id}
      options={customList.map((option) => option.title)}
      freeSolo
      {...(values && { defaultValue: values })}
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
};

export default memo(TagField);
