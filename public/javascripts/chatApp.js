

var addMsg = (msg, type) => {
    var divTag = $("<div/>").text(msg);
    if (type == 'send') {
        divTag.addClass("sendMsg");
    } else {
        divTag.addClass("receiveMsg");
    }
    $(".msgContainer").append(divTag);
}