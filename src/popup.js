
// 完了ボタン
document.getElementById('close').onclick = function() {
  chrome.tabs.executeScript(null, {"file": "submit.js"});
}

// 期限ボタン
document.getElementById('limit_tomorrow').onclick = function() {
  var date = new Date();
  setDate(date, 1);
}

document.getElementById('limit_nextweek').onclick = function() {
  var date = new Date();
  setDate(date, 7);
}
document.getElementById('limit_today').onclick = function() {
  var date = new Date();
  setDate(date, 0);
}
document.getElementById('limit_nextmonday').onclick = function() {
  var date = new Date();

  var days_nextMonday = 8 - date.getDay(); // 次の月曜日までの日数
  setDate(date, days_nextMonday);
}

document.getElementById('limit_plus1').onclick = function() {
  // chrome.tabs.executeScriptは非同期実行なので、コールバックの中で処理を実行する必要がある。
  setDateInCallBack(1);
}
document.getElementById('limit_plus7').onclick = function() {
  setDateInCallBack(7);
}
document.getElementById('limit_minus1').onclick = function() {
  setDateInCallBack(-1);
}
document.getElementById('limit_minus7').onclick = function() {
  setDateInCallBack(-7);
}


function setDateInCallBack(plusDate)
{
  chrome.tabs.executeScript(null, {
    "code": "var obj = document.getElementsByName('switchStatusIssue.limitDate');" +
       "if (obj.length == 0) { document.getElementById('limitDate').value; " +
       "} else { obj[1].value; }"
  }, function (strdate) {
    if (strdate == "") {
      var date = new Date();
      var arDate = new Array(date.getFullYear(), date.getMonth()+1, date.getDate());
    } else {
      strdate += '';
      var arDate = strdate.split("/");
    }
    
    var pluseddate = new Date(arDate[0], parseInt(arDate[1])-1, arDate[2]);
    setDate(pluseddate, plusDate);
  });
}


function setDate(date, plusDate) {
  date.setDate(date.getDate()+plusDate);

  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var date = date.getDate();
  var strdate = year + "/" + month + "/" + date;

  chrome.tabs.executeScript(null, {"file": "inject.js"});
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {strdate: strdate});
  });
}

