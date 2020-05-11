import React from "react";
import {Typography, Button, Grid, Link, Divider} from "@material-ui/core";
import {getUrlListener, syncUrlListener} from "../../chrome";

const Row = ({label, children}) => (
  <>
    <Grid item xs={1} container justify="flex-end">
      {label}
    </Grid>
    <Grid item xs={11}>
      {children}
    </Grid>
  </>
);

const Setup = () => {
  const logUrlListener = async () => {
    console.log(await getUrlListener());
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Example Rules</Typography>
      </Grid>
      <Row label="Gist:">
        <Link
          href="https://gist.github.com/deek80/026355f967a41b925f7d2e4d4d364e91"
          target="_blank"
          rel="noopener"
        >
          Demo
        </Link>
      </Row>
      <Row label="Raw:">
        <Link
          href="https://gist.githubusercontent.com/deek80/026355f967a41b925f7d2e4d4d364e91/raw/demo.tsv"
          target="_blank"
          rel="noopener"
        >
          demo.tsv
        </Link>
      </Row>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4">About</Typography>
      </Grid>
      <Row label="Version:">1.3</Row>
      <Row label="Source:">
        <Link
          href="https://github.com/deek80/url-toggle"
          target="_blank"
          rel="noopener"
        >
          Github
        </Link>
      </Row>
      <Row label="Extension:">
        <Link
          href="https://chrome.google.com/webstore/detail/url-toggle/jhiijhgkpbjjeifjceflmihoialokegd"
          target="_blank"
          rel="noopener"
        >
          Chrome Web Store
        </Link>
      </Row>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4">Chrome PageStateMatcher</Typography>
      </Grid>
      <Row label="Actions:">
        <Button variant="contained" size="small" onClick={syncUrlListener}>
          Sync Now
        </Button>
        <Button variant="contained" size="small" onClick={logUrlListener}>
          Log to Console
        </Button>
      </Row>
    </Grid>
  );
};

export default Setup;
