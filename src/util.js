const partial = (f, ...args) => f.bind(null, ...args);

const newRule = ({
  id = Math.random().toString(36).substring(2),
  from = "",
  to = "",
} = {}) => ({
  id,
  from,
  to,
});

const findRule = (rules, url) =>
  rules.find((rule) => new RegExp(rule.from).test(url));

const applyRule = (rule, url) => url.replace(new RegExp(rule.from), rule.to);

const isValidRule = (rule) => rule.from !== "" && rule.to !== "";

export {partial, newRule, findRule, applyRule, isValidRule};
