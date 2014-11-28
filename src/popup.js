

document.getElementById('close').onclick = function() {
  chrome.tabs.executeScript(null, {
    "code": "document.getElementsByName('switchStatusIssue.statusId')[3].click();"
  }, function() {
    chrome.tabs.executeScript(null, {
      "code": "document.getElementById('submitbtn').click();"
    });
  });

}


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
    "code": "document.getElementsByName('switchStatusIssue.limitDate')[1].value"
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

  chrome.tabs.executeScript(null, {
    "code": "document.getElementsByName('switchStatusIssue.limitDate')[1].value = '" + strdate + "'"
  }, function() {
	//http://stackoverflow.com/questions/20381407/fire-onchange-event-on-page-from-google-chrome-extension
    chrome.tabs.executeScript(null, {
      "code": "var changeEvent = document.createEvent('HTMLEvents'); "+
              "changeEvent.initEvent('change', true, true); "+
              "document.getElementsByName('switchStatusIssue.limitDate')[1].dispatchEvent(changeEvent);"
    });
  });

  chrome.tabs.executeScript(null, {
    "code": "document.getElementsByName('switchStatusIssue.limitDate')[0].value = '" + strdate + "'"
  }, function() {
    chrome.tabs.executeScript(null, {
      "code": "var changeEvent = document.createEvent('HTMLEvents'); "+
              "changeEvent.initEvent('change', true, true); "+
              "document.getElementsByName('switchStatusIssue.limitDate')[0].dispatchEvent(changeEvent);"
    });
  });



}

