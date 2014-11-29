
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.strdate != "") {
    var strdate = request.strdate;

    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);

    var obj_limitdate = document.getElementsByName('switchStatusIssue.limitDate');

    // チケット追加
    if (obj_limitdate.length == 0) {
      var obj_limitdate = document.getElementById('limitDate');

      obj_limitdate.value = strdate;
      obj_limitdate.dispatchEvent(changeEvent);
    } else {
    // チケット変更
      obj_limitdate[0].value = strdate;
      obj_limitdate[1].value = strdate;

      obj_limitdate[0].dispatchEvent(changeEvent);
      obj_limitdate[1].dispatchEvent(changeEvent);
    }
  }
});

