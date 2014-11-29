
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.strdate != "") {
    var strdate = request.strdate;

    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);

    document.getElementsByName('switchStatusIssue.limitDate')[0].value = strdate;
    document.getElementsByName('switchStatusIssue.limitDate')[1].value = strdate;

    document.getElementsByName('switchStatusIssue.limitDate')[0].dispatchEvent(changeEvent);
    document.getElementsByName('switchStatusIssue.limitDate')[1].dispatchEvent(changeEvent);
  }
});

