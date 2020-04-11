const enableToggle = [new chrome.declarativeContent.ShowPageAction()];

function urlMatcher(pattern) {
  return new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {urlMatches: pattern}
  });
}

function setDefaultRules() {
  chrome.storage.sync.set({
    rules: {
      "https://(.+?)\.github\.io\/(.+?)\/.*": "https://github.com/$1/$2/",
    }},
    syncRules()
  );
}

function clearRules() {
  chrome.storage.sync.set({rules: {}});
}

function syncRules() {
  chrome.storage.sync.get(["rules"], function({rules = {}}) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
          conditions: Object.keys(rules).map(urlMatcher),
          actions: enableToggle
      }]);
    });
  });
}

chrome.runtime.onInstalled.addListener(function() {
  setDefaultRules();
});

chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get(["rules"], function({rules = {}}) {
    for (const pattern of Object.keys(rules)) {
      const newUrl = tab.url.replace(new RegExp(pattern), rules[pattern]);
      if (newUrl !== tab.url) {
        chrome.tabs.update(tab.id, {url: newUrl});
        break;
      }
    }
  });
})
