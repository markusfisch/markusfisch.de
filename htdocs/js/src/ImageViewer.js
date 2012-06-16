/*
 *   O         ,-
 *  ° o    . -´  '     ,-
 *   °  .´        ` . ´,´
 *     ( °   ))     . (
 *      `-;_    . -´ `.`.
 *          `._'       ´
 *
 * 2010,2012 Markus Fisch <mf@markusfisch.de>
 * Public Domain
 */
(function(){
	/**
	 * A small and simple image viewer
	 *
	 * @param loadingHtml - HTML snippet to show while loading (optional)
	 */
	function ImageViewer( loadingText )
	{
		/** Text to show while loading */
		this.loadingText = loadingText ?
			loadingText :
			"<div><p>Loading ...</p></div>";

		/** True if this is Opera */
		this.isOpera = window.opera ? 1 : 0;

		/** True if this is Internet Explorer */
		this.isIE = document.all && !window.opera ? 1 : 0;

		/** True if this is Mozilla/Firefox */
		this.isMozilla = window.innerWidth &&
			!window.opera && !document.layers ? 1 : 0;

		/** Image buffer for loading */
		this.imageBuffer = new Image();

		/** Timer ID of loading timer */
		this.loadingTimer = 0;

		/** URL of currently shown image */
		this.shownUrl = null;

		/** Frame division for full view */
		this.div = document.createElement( "div" );

		if( this.div )
		{
			// setup view division
			{
				var properties = {
					visibility: "hidden",
					position: "absolute",
					left: "0",
					top: "0",
					zIndex: "1" };

				for( var p in properties )
					this.div.style[p] = properties[p];

				this.div.imageViewer = this;
				this.div.className = "ImageViewer";
				this.div.onmouseout = this.leaveThumbnail;
			}

			// add elements to body
			{
				var body = document.getElementsByTagName( "body" );

				if( !body ||
					!body.length )
					return;

				body[0].appendChild( this.div );
			}
		}
	}

	/**
	 * Create image viewer for all divsions having the given class
	 *
	 * @param className - class name
	 */
	ImageViewer.prototype.createForClasses = function( className )
	{
		var d = document.getElementsByTagName( "div" );

		for( var n = d.length; n--; )
			if( d[n].className.indexOf( className ) > -1 )
				this.create( d[n] );
	}

	/**
	 * Create image viewer
	 *
	 * @param container - container element
	 */
	ImageViewer.prototype.create = function( container )
	{
		for( var n = container.childNodes.length; n--; )
		{
			var c = container.childNodes[n];

			if( c.tagName != "A" )
				continue;

			c.onclick = function(){ return false; };

			// attach viewer to image tags
			{
				var i = c.getElementsByTagName( "img" );

				if( i.length > 0 )
				{
					var ii = i[0];

					ii.onmouseover = this.enterThumbnail;
					ii.onmouseout = this.leaveThumbnail;
					ii.imageViewer = this;
					ii.imageViewerSrc = c.href;
				}
			}
		}
	}

	/**
	 * Mouse entered thumbnail
	 *
	 * @param ev - mouse event
	 * @return false when handled, true otherwise
	 */
	ImageViewer.prototype.enterThumbnail = function( ev )
	{
		var v;

		if( !(v = this.imageViewer) ||
			v.shownUrl == this.imageViewerSrc )
			return true;

		v.show( v.getPosition( ev ), this.imageViewerSrc, this.alt );

		return false;
	}

	/**
	 * Mouse left thumbnail
	 *
	 * @param ev - mouse event
	 * @return false when handled, true otherwise
	 */
	ImageViewer.prototype.leaveThumbnail = function( ev )
	{
		var v;

		if( !(v = this.imageViewer) )
			return true;

		if( ev ||
			(ev = window.event) )
		{
			var t = ev.relatedTarget ? ev.relatedTarget : ev.toElement;

			// ignore events if cursor has gone to thumbnail
			if( t.imageViewerSrc &&
				v.shownUrl == t.imageViewerSrc )
				return false;

			// ignore events within viewer division
			for( ; t; t = t.parentNode )
				if( t == v.div )
					return false;
		}

		v.hide();

		return false;
	}

	/**
	 * Show viewer
	 *
	 * @param p - cursor position as object
	 * @param url - URL of image to show
	 * @param label - image label (optional)
	 */
	ImageViewer.prototype.show = function( p, url, label )
	{
		if( this.shownUrl != url )
		{
			this.shownUrl = url;

			this.imageBuffer.src = url;

			var d = this.div;
			d.innerHTML = this.loadingText;
			d.style.left = p.x+"px";
			d.style.top = p.y+"px";
			d.style.visibility = "visible";
		}

		if( !this.imageBuffer.complete )
		{
			this.clearTimer();

			var t = this;
			this.loadingTimer = setTimeout(
				function(){ t.show( p, url, label ); }, 250 );

			return;
		}

		this.div.innerHTML = "<div><img src=\""+url+"\"/>"+
			(label ?
				"<p>"+label+"</p>" :
				"")+
			"</div>";
	}

	/**
	 * Hide viewer
	 */
	ImageViewer.prototype.hide = function()
	{
		this.shownUrl = null;
		this.clearTimer();
		this.div.style.visibility = "hidden";
	}

	/**
	 * Clear loading timer
	 */
	ImageViewer.prototype.clearTimer = function()
	{
		if( !this.loadingTimer )
			return;

		clearTimeout( this.loadingTimer );
		this.loadingTimer = 0;
	}

	/**
	 * Get cursor position from event
	 *
	 * @param e - mouse event
	 */
	ImageViewer.prototype.getPosition = function( e )
	{
		var x = 0,
			y = 0;

		if( this.isOpera )
		{
			x = e.clientX;
			y = e.clientY;
		}
		else if( this.isIE )
		{
			if( document.documentElement &&
				document.documentElement.scrollTop )
			{
				x = event.clientX+document.documentElement.scrollLeft;
				y = event.clientY+document.documentElement.scrollTop;
			}
			else
			{
				x = event.clientX+document.body.scrollLeft;
				y = event.clientY+document.body.scrollTop;
			}
		}
		else if( this.isMozilla )
		{
			x = e.pageX;
			y = e.pageY;
		}

		return { x: x, y: y };
	}

	window.ImageViewer = ImageViewer;
})();
