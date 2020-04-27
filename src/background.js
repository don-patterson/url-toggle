/* global chrome */
import {
  applyRule,
  findMatch,
  loadFromStorage,
  syncUrlListener,
  migrateRules,
} from "./chrome";

chrome.pageAction.onClicked.addListener(async (tab) => {
  const {rules} = await loadFromStorage();
  const matchingRule = findMatch(rules, tab.url);
  if (matchingRule === undefined) {
    return;
  }
  chrome.tabs.update(tab.id, {url: applyRule(matchingRule, tab.url)});
});

chrome.storage.onChanged.addListener(() => {
  syncUrlListener();
});

chrome.runtime.onInstalled.addListener(() => {
  migrateRules();
});
