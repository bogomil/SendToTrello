function onCreated() {
  if (browser.runtime.lastError) {
    console.log("Error:");
  } else {
    console.log("Item created successfully");
  }
}

//create the menu
browser.contextMenus.create({
  id: "trello-selection",
  title: "Send to Trello",
  contexts: ["selection"]
}, onCreated);


browser.contextMenus.onClicked.addListener(function (info, tab) {

  var s_listid;
  var s_trello_key;
  var s_trello_token;
  var trelloNotification = "trello-notification"

  switch (info.menuItemId) {

    case "trello-selection":
      if (info.selectionText != null && info.selectionText.length > 0) {
        let buffer = browser.storage.sync.get(null);

        buffer.then(function (res) {
          this.s_listid = res['listid'];
          this.s_trello_key = res['trello_key'];
          this.s_trello_token = res['trello_token'];
        })

        fetch("https://api.trello.com/1/cards", {
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "name=test&desc=" + encodeURI(info.selectionText) + "&pos=bottom&idList=" + this.s_listid + "&keepFromSource=all&key=" + this.s_trello_key + "&token=" + this.s_trello_token + ""
          })
          .then(function (data) {
            //add an icon
            browser.notifications.create(trelloNotification, {
              "type": "basic",
              "title": "Success",
              "message": "Your snippet were added to your Trello board"
            });
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      }

      break;
  }
})