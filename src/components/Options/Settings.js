import React, {Fragment} from "react";
import {TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {VERSION} from "../../chrome";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const Setup = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="body1">Version: {VERSION}</Typography>
      <Typography variant="body1">Chrome PageStateMatchers</Typography>
      <TextField
        InputProps={{
          readOnly: true,
        }}
        multiline
        defaultValue="Blah blah, etc"
      />
    </Fragment>
  );
};

export default Setup;
