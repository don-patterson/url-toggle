import React, {Fragment} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {saveToStorage} from "../../chrome";
import RuleInput from "./RuleInput";
import {partial, randomString, isValidRule} from "../../util";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const RuleList = ({rules, setRules}) => {
  const classes = useStyles();

  const handleSave = () => {
    const validRules = rules.filter(isValidRule);
    saveToStorage({rules: validRules});
    setRules(validRules);
  };

  const handleRuleChange = (index, rule) => {
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
  };

  const handleAddRow = () => {
    setRules([...rules, {id: randomString(), from: "", to: ""}]);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} container justify="flex-end">
          <Button variant="outlined">Import</Button>
          <Button variant="outlined">Export</Button>
        </Grid>
        {rules.map((rule, index) => (
          <RuleInput
            key={rule.id}
            rule={rule}
            onChange={partial(handleRuleChange, index)}
          />
        ))}
        <Grid item xs={6} container justify="flex-end">
          <Button variant="contained" onClick={handleAddRow}>
            +Row
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RuleList;
