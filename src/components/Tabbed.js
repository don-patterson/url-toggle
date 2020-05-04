import React, {useState, Fragment} from "react";
import {Paper, Tab, Tabs, makeStyles, AppBar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
}));

const Tabbed = ({children, ...tabProps}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectTab = (_, selected) => setSelectedTab(selected);
  const items = React.Children.toArray(children);

  return (
    <Fragment>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleSelectTab} {...tabProps}>
          {items.map(({props}) => (
            <Tab key={props.label} label={props.label} />
          ))}
        </Tabs>
      </AppBar>
      <Paper square className={classes.content}>
        {items[selectedTab]}
      </Paper>
    </Fragment>
  );
};

export default Tabbed;
