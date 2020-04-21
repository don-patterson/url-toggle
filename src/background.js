/* global chrome */
import {applyRule, findMatch, loadRules, migrateRules} from "./chrome";

chrome.tabs.onUpdated.addListener(async (tabId, {url}) => {
  if (!url) {
    return;
  }
  const rules = await loadRules();
  const matchingRule = findMatch(rules, url);
  if (matchingRule === undefined) {
    chrome.pageAction.hide(tabId);
  } else {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(async (tab) => {
  const rules = await loadRules();
  const matchingRule = findMatch(rules, tab.url);
  if (matchingRule === undefined) {
    return;
  }
  chrome.tabs.update(tab.id, {url: applyRule(matchingRule, tab.url)});
});

chrome.runtime.onInstalled.addListener(() => {
  migrateRules();
});
