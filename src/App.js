import React, {useEffect, useState} from "react";
import {Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {loadFromStorage, saveToStorage, randomId} from "./chrome";
import Rule from "./Rule";

const isValidRule = (rule) => rule.from !== "" && rule.to !== "";
const partial = (f, ...args) => f.bind(null, ...args);
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
    const initRules = async () => {
      const {rules} = await loadFromStorage();
      setRules(rules);
    };
    initRules();
  }, []);

  const handleSave = () => {
    const validRules = rules.filter(isValidRule);
    saveToStorage({rules: validRules});
    setRules(validRules);
  };

  const handleRuleChange = (index, rule) => {
    // the index is just for optimization...not sure if it's necessary
    // since we could look up the rule by id, but that seems like a lot
    // of work to do every keystroke. keeping a variable-sized list
    // in state must have been solved (or avoided) before!
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
  };

  const handleAddRow = () => {
    setRules([...rules, {id: randomId(), from: "", to: ""}]);
  };

  return (
    <Container maxWidth="lg">
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          URL Toggle Rules
        </Typography>
        <Grid container spacing={2}>
          {rules.map((rule, index) => (
            <Rule
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
      </Paper>
    </Container>
  );
};

export default App;
