
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('backlog.jp') != -1) {
        chrome.pageAction.show(tabId);
    }
});
