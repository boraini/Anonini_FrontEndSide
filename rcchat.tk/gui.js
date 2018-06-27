//All user-generated text must be piped through disableScripts before being sent. Also all data coming from the server which is going to be printed on the page. This protects other users even if someone modifies their disableScripts function.
addEventListener("load", initialize);
var chat;
var sidebar;
var navbar;
var wrapper;
var chatwrapper;
var msg;
var username = "test";
var updateHandler;
var usernameColors = {usernames: [], colors: []};
var allowedColors = ["#f00", "#0f0", "#00f", "#f84", "#e08", "#0ff"];
var msg_maxlinesdisplayed = 5;
//Initialize whatever. Start the page. Everything is loaded when this function is called.
function initialize() {
chat = document.getElementById("chat");
navbar = document.getElementById("navbar");
sidebar = document.getElementById("sidebar");
wrapper = document.getElementById("wrapper");
chatwrapper = document.getElementById("chatwrapper");
msg = document.getElementById("msg");
updateHandler = setInterval(updates, 100);
printInfo("Welcome, " + username + "!");
designerDemo();
addEventListener("resize", resized);
resized();
}
//This function is called every 0.1 second. Uses if clauses for some optimization.
function updates() {
    if (document.activeElement == msg) {
        var msgvalue = msg.value;
        var cols = msg.cols;
        var linecount = 0;
        for (let line of msgvalue.split("\n")) {
            linecount += Math.ceil(line.length / cols);
        }
        msg.rows = (linecount + 1 > msg_maxlinesdisplayed) ? msg_maxlinesdisplayed : linecount + 1;
    }
}
function chatDemo() {
printSpeech("deneme", "boraini");
printSpeech("tamam", "test");
printSpeech("güzel oldu amk", "boraini");
printSpeech("selamlar!", "buğra");
printSpeech("ooo merhaba", "test");
}
function designerDemo() {
printInfo("bilgilendirme etc.");
printSpeech("diğer balon", "example-user (color varies)");
printSpeech("kullanıcının balonu", "test");
}
function printInfo(text) {
    var el = document.createElement("div");
    el.className = "infobox";
    el.innerHTML = disableScripts(text);
    chat.appendChild(el);
}
function printSpeech(text, name) {
    var bubble = document.createElement("div");
    if (usernameColors.usernames.indexOf(name) == -1) {
    usernameColors.usernames.push(name);
    usernameColors.colors.push(Math.floor(Math.random() * allowedColors.length));
    }
    if (name == username) {
    bubble.className = "selfbubble";
    }
    else {
        bubble.className = "bubble";
        var nameRegion = document.createElement("div");
        nameRegion.className = "name";
        nameRegion.style.color = allowedColors[usernameColors.colors[usernameColors.usernames.indexOf(name)]];
        nameRegion.innerHTML = disableScripts(name);
        bubble.appendChild(nameRegion);
    }
    bubble.appendChild(document.createTextNode(disableScripts(text)));
    var time = document.createElement("div");
    time.className = "time";
    var current = new Date();
    var currentMinutes = current.getMinutes().toString();
    time.innerHTML = current.getHours() + "." + ((currentMinutes.length < 2) ? "0" : "") + currentMinutes;
    bubble.appendChild(time);
    chat.appendChild(bubble);
}
function disableScripts(text) {
//Make variable inaccessible from parent thread.
var textcopy = text;
//Make script tags inactive.
textcopy = textcopy.replace("<script", "&lt;script");
textcopy = textcopy.replace("</script", "&lt;/script");
//Remove event listener attributes. Code provided at stackoverflow.com/a/3843942
textcopy = textcopy.replace(/<[^>]+/g, function(match)
{
    var volatile = match.replace(/ on\w+='[^']*'/g, "");
    return volatile.replace(/ on\w+="[^"]*"/g, "");
});
return textcopy;
}
function resized() {
var value = innerHeight - navbar.getBoundingClientRect().height + "px";
sidebar.style.height = value;
chatwrapper.style.height = value;
console.log(value);
}
function scrollToBottom() {
easeOutAnimate(chatScrollY, chat.scrollTop, chat.scrollHeight, 3, 100, 2);
}
function chatScrollY(val) {
chat.scrollTop = val;
}
function easeOutAnimate(func, start, end, factor, delay, threshold) {
var current = start;
while (Math.abs(current - end) > threshold) {
func(current);
current += (end - current) / factor;
var mydate = new Date();
while ((new Date()).getTime() - mydate.getTime() < delay) {}
}
}
