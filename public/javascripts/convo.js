var botui = new BotUI('api-bot');



var socket = io.connect('http://localhost:8010');
// read the BotUI docs : https://docs.botui.org/

botui.message.add({
  content: 'Lass uns einen Termin ausmachen...',
  delay: 1500,
}).then(() => {
  botui.action.button({
    action: [
      {
        text: 'Ja',
        value: 'yes'
      },
      {
        text: 'Nein',
        value: 'no'
      }
    ],
    delay: 500,
  }).then(function () {
  botui.action.text({
    action: {
      placeholder: 'Sag Hallo :) ', }
  }
).then(function (res) {
  socket.emit('fromClient', { client : res.value }); // sends the message typed to server
    console.log(res.value); // will print whatever was typed in the field.
  }).then(function () {
    socket.on('fromServer', function (data) { // recieveing a reply from server.
      console.log(data.server);
      newMessage(data.server);
      addAction();
  })
});
})

function newMessage (response) {
  botui.message.add({
    content: response,
    delay: 0,
  })
}

function addAction () {
  botui.action.text({
    action: {
      placeholder: 'schreib eine Antwort...', 
    }
  }).then(function (res) {
    socket.emit('fromClient', { client : res.value });
    console.log('client response: ', res.value);
  })
}