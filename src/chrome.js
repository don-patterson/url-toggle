/* global chrome */

const loadFromStorage = () =>
  new Promise((resolve) => {
    chrome.storage.sync.get(["rules"], ({rules = []}) => {
      resolve({rules});
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
  const {rules} = await loadFromStorage();
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

const getUrlListener = () => {
  return new Promise((resolve) => {
    chrome.declarativeContent.onPageChanged.getRules(
      undefined,
      ([listener]) => {
        resolve(listener);
      }
    );
  });
};

export {loadFromStorage, saveToStorage, syncUrlListener, getUrlListener};
