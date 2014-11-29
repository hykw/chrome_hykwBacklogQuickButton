
var obj_donebutton = document.getElementsByName('switchStatusIssue.statusId');

// 8個(上4, 下4)無い場合、既に完了してる
if (obj_donebutton.length == 8) {
  obj_donebutton[3].click();
  document.getElementById('submitbtn').click();
}

