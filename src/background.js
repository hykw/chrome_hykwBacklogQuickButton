chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var showFlag = false;

  var allowDomains = Array(
    'backlog.jp/view',
    'backlog.jp/add'
  );

  for (var i = 0; i < allowDomains.length; i++) {
    if (tab.url.indexOf(allowDomains[i]) > -1) {
      showFlag = true;
      break;
    }
  }

  if (showFlag == true)
    chrome.pageAction.show(tabId);
});

