var isNavigationMenuOpen = false;
var toggleNavigationMenu = function() {
	var menuWidth = isNavigationMenuOpen ? "0" : "300px";
	isNavigationMenuOpen = !isNavigationMenuOpen;
	document.getElementById("sideNavigationBar").style.width = menuWidth;
};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("whyquit-icon").src = ENVIRONMENT["HOST"] + "/whyquit/images/icons/whyquit-icon.ico";
});