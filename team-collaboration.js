document.addEventListener('DOMContentLoaded', function () {
var whiteboardTab = document.getElementById('whiteboardTab');
var whiteboard = document.querySelector('.whiteboard');
var chat = document.querySelector('.chat');
var activePanel = document.querySelector('.active_panel');
var idlePanel = document.querySelector('.idle_panel');
var chatTab = document.getElementById('chatTab');
var closeSymbol = document.getElementsByClassName('closeSymbol');
var addPanel = document.querySelector('.add_panel');
var addPanelWhiteboard = addPanel.children[1].children[0];
var addPanelChat = addPanel.children[1].children[1];
var panel1 = document.querySelector('#panel1');

var entireDate = {
	siteNmae: "Team Collaboration App"
};

var tabStatus = {
	chat: {active: true, onFocus: true},
	whiteboard: {active: true, onFocus: false},
	tabCount: 2
};

tabStatus.update = function (tab) {
	if (tab == "focusWhiteboard") {
		this.chat.onFocus = false;
		this.whiteboard.onFocus = true;
	}

	else if (tab == "focusChat") {
		this.chat.onFocus = true;
		this.whiteboard.onFocus = false;
	}	

	else if (tab == 'closewhiteboard') {
		this.whiteboard.active = false;
	}

	else if (tab == 'closechat') {
		this.chat.active = false;
	}
};


var whiteTabClickHandler = function (event) {
	event.preventDefault();
	whiteboard.style.display = 'block';
	chat.style.display = 'none';
	whiteboardTab.parentNode.className = 'active_panel';
	chatTab.parentNode.className = 'idle_panel';
	tabStatus.update("focusWhiteboard");
};

var chatTabClickHandler = function (event) {
	event.preventDefault();
	whiteboard.style.display = 'none';
	chat.style.display = 'block';
	whiteboardTab.parentNode.className = 'idle_panel';
	chatTab.parentNode.className = 'active_panel';
	tabStatus.update("focusChat");
};

var closeHandler = function (event) {
	var parent = this.parentNode.parentNode;
	var child = this.parentNode;
	var identifier = "." + this.previousSibling.getAttribute('id').slice(0, -3);
	var targetTab = document.querySelector(identifier);
	var anotherParent = targetTab.parentNode;
	anotherParent.removeChild(targetTab);
	parent.removeChild(child);
	var arg = 'close' + identifier.slice(1);
	tabStatus.update(arg);
	tabStatus.tabCount -= 1;
	if (tabStatus.tabCount) {
		if (tabStatus.chat.active) {
			chat.style.display = 'block';
			chatTab.parentNode.className = 'active_panel';
		}
		else if (tabStatus.whiteboard.active) 
		{
			whiteboard.style.display = 'block';
			whiteboardTab.parentNode.className = 'active_panel';
		}
	}
};	

var addHandlerToClose = function () {
	for (var i = 0; i < closeSymbol.length; i++) {
	closeSymbol[i].addEventListener('click', closeHandler);
}};

var addPanelHandler = function () {
	event.preventDefault();
	whiteTabClickHandler();

};

whiteboardTab.addEventListener('click', whiteTabClickHandler);
chatTab.addEventListener('click', chatTabClickHandler);
addPanelWhiteboard.addEventListener('click', whiteTabClickHandler);
addPanelChat.addEventListener('click', chatTabClickHandler);
addHandlerToClose();

});