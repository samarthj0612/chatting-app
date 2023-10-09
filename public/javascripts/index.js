let socket = io();
let name = "Unknown";

document .querySelector("#getIntoChat") .addEventListener("click", function () {
  if (document.querySelector("#box input").value.trim().length > 0) {
    name = document.querySelector("#box input").value;
    socket.emit("name", name);
    document.querySelector("#overlay").style.display = "none";
  }
});

document.querySelector("#sendMsg").addEventListener("click", function () {
  socket.emit("msg", document.querySelector("textarea").value);
  document.querySelector("textarea").value = "";
});

socket.on("msg", function (data1, data2, data3) {
  document.querySelector( "#chatBox" ).innerHTML += `<div id="chat" style="background-color: ${data3};">${data1} : ${data2}</div>`;
  document.querySelector("textarea").focus() = "";
});

socket.on("names", function (names) {
  let clutter = "";
  names.forEach(function (name) {
    clutter += `<h6>${name}</h6>`;
  });
  document.querySelector( "#sj-main #section1 #onlineStatus" ).innerHTML = `<h5 class="text-center">Online</h5><hr>`;
  document.querySelector("#sj-main #section1 #onlineStatus").innerHTML += clutter;
});

document.querySelector("textarea").addEventListener('input', function(){
  socket.emit('typing');
})

socket.on('typing', function(name){
  clearInterval();
  document.querySelector("#typing").textContent = `${name} is typing`;

  setTimeout(function(){
    document.querySelector('#typing').textContent = "";
  }, 2000);
})