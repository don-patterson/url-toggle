import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import {loadFromStorage} from "../../chrome";
import RuleList from "./RuleList";
import Tabbed from "../Tabbed";
import Settings from "./Settings";

const Options = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const initRules = async () => {
      const {rules} = await loadFromStorage();
      setRules(rules);
    };
    initRules();
  }, []);

  return (
    <Container maxWidth="lg">
      <Tabbed>
        <RuleList label="URL Toggle Rules" rules={rules} setRules={setRules} />
        <Settings label="Settings" />
      </Tabbed>
    </Container>
  );
};

export default Options;
