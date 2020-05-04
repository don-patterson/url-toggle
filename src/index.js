import React from "react";
import ReactDOM from "react-dom";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {cyan} from "@material-ui/core/colors";
import Options from "./components/Options";

const theme = createMuiTheme({
  palette: {
    primary: cyan,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Options />
  </ThemeProvider>,
  document.getElementById("root")
);
