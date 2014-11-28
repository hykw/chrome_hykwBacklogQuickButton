
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('sms-jinzai.backlog.jp') != -1) {
        chrome.pageAction.show(tabId);
    }
});

