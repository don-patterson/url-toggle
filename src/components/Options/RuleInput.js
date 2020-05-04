import React, {Fragment} from "react";
import {Grid, TextField} from "@material-ui/core";

const RuleInput = ({rule, onChange}) => {
  const handleChangeFrom = (e) => onChange({...rule, from: e.target.value});
  const handleChangeTo = (e) => onChange({...rule, to: e.target.value});
  return (
    <Fragment>
      <Grid item xs={6}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Pattern"
          defaultValue={rule.from}
          onChange={handleChangeFrom}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Replacement"
          defaultValue={rule.to}
          onChange={handleChangeTo}
        />
      </Grid>
    </Fragment>
  );
};

export default RuleInput;
