function saveOptions(e) {
  browser.storage.sync.set({
    listid: document.querySelector("#listid").value,
    trello_key: document.querySelector("#trello_key").value,
    trello_token: document.querySelector("#trello_token").value
  });
  e.preventDefault();
}

function showOptions() {
  var s_listid = browser.storage.sync.get('listid');
  var s_trello_key = browser.storage.sync.get('trello_key');
  var s_trello_token = browser.storage.sync.get('trello_token');


  s_listid.then((res) => {
    document.querySelector("#listid").value = res.listid || "";
  });

  s_trello_key.then((res) => {
    document.querySelector("#trello_key").value = res.trello_key || "";
  });

  s_trello_token.then((res) => {
    document.querySelector("#trello_token").value = res.trello_token || "";
  });

}

document.addEventListener('DOMContentLoaded', showOptions);
document.querySelector("form").addEventListener("submit", saveOptions);