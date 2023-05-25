import React from "react";
import TextField from "@mui/material/TextField";

const TextInput = (props) => {
  return (
    <TextField id='outlined-controlled' style={{ margin: "10px" }} {...props} />
  );
};

export default TextInput;
