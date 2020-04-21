/* global chrome */

const loadRules = () =>
  new Promise((resolve) => {
    chrome.storage.sync.get(["rules"], ({rules = []}) => {
      resolve(rules);
    });
  });

const saveRules = (rules) =>
  new Promise((resolve) => {
    chrome.storage.sync.set({rules}, () => {
      resolve();
    });
  });

// I hope Chrome caches these `new RegExp` calls. They happen a lot...
const applyRule = (rule, url) => url.replace(new RegExp(rule.from), rule.to);

const findMatch = (rules, url) =>
  rules.find((rule) => new RegExp(rule.from).test(url));

const randomId = () => Math.random().toString(36).substring(2);

const migrateRules = () => {
  chrome.storage.sync.get(["rules", "version"], function (data) {
    if (data.version) {
      return; // already migrated to 1.1
    }

    const newRules = (data.rules || []).map(([pattern, replacement]) => {
      return {
        id: randomId(),
        from: pattern,
        to: replacement,
      };
    });

    chrome.storage.sync.set({version: "1.1", rules: newRules});
  });
};

export {applyRule, findMatch, loadRules, saveRules, randomId, migrateRules};
