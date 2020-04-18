/* global chrome process */

const urlMatcher = ([pattern]) =>
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {urlMatches: pattern},
  });

const syncUrlMatcher = (rules) => {
  // enable the icon when the URL matches one of your patterns
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: rules.map(urlMatcher),
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
};

const loadRules = async () =>
  new Promise((resolve) => {
    chrome.storage.sync.get(["rules"], ({rules = []}) => {
      resolve(rules);
    });
  });

const saveRules = async (rules) =>
  new Promise((resolve) => {
    chrome.storage.sync.set({rules}, () => {
      syncUrlMatcher(rules);
      resolve();
    });
  });

export {loadRules, saveRules};
