/* global chrome */

chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get(["rules"], function ({rules = []}) {
    for (const [pattern, replacement] of rules) {
      const newUrl = tab.url.replace(new RegExp(pattern), replacement);
      if (newUrl !== tab.url) {
        chrome.tabs.update(tab.id, {url: newUrl});
        break;
      }
    }
  });
});
