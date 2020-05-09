/* global chrome */
import {loadFromStorage, syncUrlListener} from "./chrome";
import {findRule, applyRule} from "./util";

chrome.pageAction.onClicked.addListener(async (tab) => {
  const {rules} = await loadFromStorage();
  const matchingRule = findRule(rules, tab.url);
  if (matchingRule === undefined) {
    return;
  }
  chrome.tabs.update(tab.id, {url: applyRule(matchingRule, tab.url)});
});

chrome.storage.onChanged.addListener(() => {
  syncUrlListener();
});
