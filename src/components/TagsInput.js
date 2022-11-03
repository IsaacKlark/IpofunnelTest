import React, { useEffect, useState } from "react";
import { Chip, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Downshift from "downshift";
import styled from "@emotion/styled";

const Wrapper = styled(Box)`
  .css-8j6b76-MuiInputBase-root-MuiOutlinedInput-root {
    flex-wrap: wrap;
    padding: 0 14px;
    gap: 0 7px;
  }
`;

const TagsInput = ({ ...props }) => {
  const { selectedTags, placeholder, tags, ...other } = props;
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(tags || []);
  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  useEffect(() => {
    if (JSON.stringify(tags) !== JSON.stringify(selectedItem)) {
      selectedTags(selectedItem);
    }
    //eslint-disable-next-line
  }, [selectedItem]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <Wrapper>
                <TextField
                  InputProps={{
                    startAdornment: selectedItem.map((item) => (
                      <Chip
                        key={item}
                        tabIndex={-1}
                        label={item}
                        onDelete={handleDelete(item)}
                        sx={{
                          maxWidth: "200px",
                          overFlow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "no-wrap",
                          marginTop: "7px",
                        }}
                      />
                    )),
                    onBlur,
                    onChange: (event) => {
                      handleInputChange(event);
                      onChange(event);
                    },
                    onFocus,
                  }}
                  {...other}
                  {...inputProps}
                />
              </Wrapper>
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
};

export default TagsInput;
