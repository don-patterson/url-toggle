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

export {loadFromStorage, saveToStorage, syncUrlListener, VERSION};
