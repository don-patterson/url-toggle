import React, {Fragment, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {saveToStorage} from "../../chrome";
import {partial, isValidRule, newRule} from "../../util";
import RuleInput from "./RuleInput";

const useStyles = makeStyles({
  hidden: {
    display: "none",
  },
});

const RuleList = ({rules, setRules}) => {
  const classes = useStyles();
  const [saveEnabled, setSaveEnabled] = useState(false);

  const handleSave = () => {
    const validRules = rules.filter(isValidRule);
    saveToStorage({rules: validRules});
    setRules(validRules);
    setSaveEnabled(false);
  };

  const handleRuleChange = (index, rule) => {
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
    setSaveEnabled(true);
  };

  const handleAddRow = () => {
    setRules([...rules, newRule()]);
    setSaveEnabled(true);
  };

  const handleImport = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imported = reader.result
        .split(/[\r\n]+/)
        .map((row) => {
          const [from, to] = row.split("\t");
          return newRule({from, to});
        })
        .filter(isValidRule);

      setRules([...rules, ...imported]);
      setSaveEnabled(true);
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} container justify="flex-end">
          <input
            accept=".tsv"
            className={classes.hidden}
            id="import-button"
            type="file"
            onChange={handleImport}
          />
          <label htmlFor="import-button">
            <Button variant="outlined" component="span">
              Import
            </Button>
          </label>
          <Button variant="outlined" disabled>
            Export
          </Button>
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
            +Add
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!saveEnabled}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RuleList;
