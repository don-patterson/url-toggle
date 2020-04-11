/* global chrome */
import React, {Fragment, useEffect, useState} from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {withTheme} from "./theme";

// Constants/Utils:
const PATTERN = "Pattern";
const REPLACEMENT = "Replacement";
const partial = (f, ...args) => f.bind(null, ...args);
const isValidRule = (rule) => rule.every((input) => input.length > 0);
const urlMatcher = ([pattern]) =>
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {urlMatches: pattern},
  });
const syncChromeRules = (rules) => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: rules.map(urlMatcher),
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
};

// Components
const Input = ({label, text, onChange}) => (
  <TextField
    fullWidth
    size="small"
    variant="outlined"
    label={label}
    defaultValue={text}
    onChange={(event) => onChange(label, event.target.value)}
  />
);

const Rule = ({pattern, replacement, onInputChange}) => (
  <Fragment>
    <Grid item xs={6}>
      <Input label={PATTERN} text={pattern} onChange={onInputChange} />
    </Grid>
    <Grid item xs={6}>
      <Input label={REPLACEMENT} text={replacement} onChange={onInputChange} />
    </Grid>
  </Fragment>
);

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [rules, setRules] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(["rules"], ({rules = []}) => {
      setRules(rules);
    });
  }, []);

  const handleRuleInput = (index, label, value) => {
    const newRules = [...rules];
    const newRule = [...rules[index]];
    newRule[label === PATTERN ? 0 : 1] = value;
    newRules[index] = newRule;
    setRules(newRules);
  };

  const handleAddRow = () => {
    setRules([...rules, ["", ""]]);
  };

  const handleSave = () => {
    const validRules = rules.filter(isValidRule);
    chrome.storage.sync.set({rules: validRules}, () => {
      syncChromeRules(validRules);
      setRules(validRules);
    });
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          URL Toggle Rules
        </Typography>
        <Grid container spacing={2}>
          {rules.map(([pattern, replacement], index) => (
            <Rule
              key={index}
              pattern={pattern}
              replacement={replacement}
              onInputChange={partial(handleRuleInput, index)}
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
      </Paper>
    </Container>
  );
};

export default withTheme(App);
