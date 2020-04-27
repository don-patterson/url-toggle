/* global chrome */

const VERSION = "1.2";

const loadFromStorage = () =>
  new Promise((resolve) => {
    chrome.storage.sync.get(["rules", "version"], ({rules = [], version}) => {
      resolve({rules, version});
    });
  });

const saveToStorage = (data) =>
  new Promise((resolve) => {
    chrome.storage.sync.set(data, () => {
      resolve();
    });
  });

const applyRule = (rule, url) => url.replace(new RegExp(rule.from), rule.to);

const findMatch = (rules, url) =>
  rules.find((rule) => new RegExp(rule.from).test(url));

const randomId = () => Math.random().toString(36).substring(2);

const _urlMatcher = (rule) =>
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {urlMatches: rule.from},
  });

const syncUrlListener = async () => {
  const {rules, version} = await loadFromStorage();
  if (version !== VERSION) {
    return;
  }

  // enable the icon when the URL matches one of your patterns
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: rules.map(_urlMatcher),
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
};

const migrateRules = async () => {
  const {rules, version} = await loadFromStorage();
  const migrated = {version: VERSION};

  if (!version) {
    // v1 rules were [pattern, replacement] pairs
    migrated.rules = rules.map(([pattern, replacement]) => {
      return {
        id: randomId(),
        from: pattern,
        to: replacement,
      };
    });
  }

  saveToStorage(migrated);
};

export {
  applyRule,
  findMatch,
  loadFromStorage,
  migrateRules,
  randomId,
  saveToStorage,
  syncUrlListener,
};
