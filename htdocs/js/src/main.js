window.onload = function()
{
	App.load();
};

// IE fires resize events even when the window hasn't changed its size
if( window.opera ||
	!document.all )
	window.onresize = App.resize;
