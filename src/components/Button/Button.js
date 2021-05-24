import { makeStyles, withTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

export default function CustomButton({ text, color }) {
  return (
    <div>
      <Button
        variant="contained"
        color={{ backgroundColor: color }}
        type="submit"
      >
        {text}
      </Button>
    </div>
  );
}

Button.defaultProps = {
  color: "steelblue",
};

// Button.PropTypes = {
//   text: PropTypes.string,
//   color: PropTypes.string,
// };
