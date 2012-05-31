/*
 *   O         ,-
 *  ° o    . -´  '     ,-
 *   °  .´        ` . ´,´
 *     ( °   ))     . (
 *      `-;_    . -´ `.`.
 *          `._'       ´
 *
 * Copyright (c) 2010 Markus Fisch <mf@markusfisch.de>
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Application
 */
var App =
{
	/**
	 * ZoomGrid object
	 *
	 * @access private
	 * @var object
	 */
	zoomGrid : null,

	/**
	 * Load
	 *
	 * @access public
	 */
	load : function()
	{
		var container = document.getElementById( "MarkusFisch" );

		if( !container )
			return;

		// set up zoom grid
		if( !App.zoomGrid )
		{
			var c = App.getZoomGridContainer();

			if( !c )
				return;

			container.className = "Dynamic";
			c.innerHTML = "`data`";
			App.zoomGrid = App.createZoomGrid( c );

			document.body.style.overflow = "hidden";
		}

		Demos.setup();

		// add image viewer
		{
			var v = new ImageViewer();

			v.showOriginal = v.show;
			v.show = function( p, url, label )
			{
				if( App.zoomGrid.moveTimer ||
					!App.zoomGrid.active ||
					App.zoomGrid.active.id != "PieDockChapter" )
					return;

				this.showOriginal( p, url, label );
			}

			v.createForClasses( "ImageGallery" );

			// prevent restore when image viewer is visible
			App.zoomGrid.imageViewerRestore = App.zoomGrid.restore;
			App.zoomGrid.restore = function( setup )
			{
				if( v.shownUrl )
					return;

				App.zoomGrid.imageViewerRestore( setup );
			}
		}

		// show up
		container.style.visibility = "visible";

		// pre-select cell according to URL query
		{
			var n = window.location.pathname.split( "/" );

			if( n.length > 0 )
			{
				var e = document.getElementById(
					n[n.length-1]+"Chapter" );

				if( e )
				{
					// switch to choose-by-click
					App.zoomGrid.addHighlight();
					App.zoomGrid.zoom( e );
				}
			}
		}
	},

	/**
	 * Resize
	 *
	 * @access public
	 */
	resize : function()
	{
		if( !App.zoomGrid ||
			// find correct size again
			!App.getZoomGridContainer() )
			return;

		App.zoomGrid.restore();
	},

	/**
	 * Zoom given cell
	 *
	 * @access public
	 * @param id - id of cell to zoom
	 * @return false if element was found
	 */
	zoom : function( id )
	{
		var e = document.getElementById( id );

		if( !e ||
			!App.zoomGrid )
			return true;

		App.zoomGrid.zoom( e );

		return false;
	},

	/**
	 * Restore ZoomGrid
	 *
	 * @access public
	 * @return false on success, true otherwise
	 */
	restore : function()
	{
		if( !App.zoomGrid )
			return true;

		App.zoomGrid.restore();

		return false;
	},

	/**
	 * Create zoom grid
	 *
	 * @access public
	 * @param c - container object
	 * @return ZoomGrid object
	 */
	createZoomGrid : function( c )
	{
		var z = new ZoomGrid( {
			foldedSize: { width: 82, height: 82 },
			paddingMarginBorder: { width: 0, height: 0 },
			frameSize: { width: 12, height: 14 },
			container: c,
			opacityFocused: .85,
			opacityUnfocused: .06,
			opacityFolded: .15,
			opacityHighlighted: .35 } );

		z.addTransparency();
		z.addHighlightOnClick();
		z.addMaxChildWidth( {
			maxWidth: ["h1"],
			width: ["div.ChapterContent"] } );
		z.addFrame();
		z.addRestoreButton();
		z.addDisableFoldedLinks();

		return z;
	},

	/**
	 * Return set up ZoomGrid container
	 *
	 * @access public
	 * @return division object
	 */
	getZoomGridContainer : function()
	{
		var c = document.getElementById( "Contents" );

		if( !c )
			return null;

		// don't run on mobile devices since "overflow: auto;" doesn't
		// work there very well
		if( /ipad|ipod|iphone|android|blackberry|windows\sce|mini|palm/i.test(
			navigator.userAgent.toLowerCase() ) )
			return null;

		// choose correct size
		{
			var s = App.getSize();

			// don't run if window/screen is too small
			if( screen.width < 400 ||
				screen.height < 400 ||
				s.width < 400 ||
				s.height < 400 )
				return null;

			if( s.width > 800 )
				s.width = 800;

			// page margin
			s.width -= 16;
			s.height -= 16;

			c.style.maxWidth = s.width+"px";
			c.style.width = s.width+"px";
			c.style.height = s.height+"px";
		}

		return c;
	},

	/**
	 * Determine page size
	 *
	 * @access public
	 * @return object holding width and height of page in px
	 */
	getSize : function()
	{
		var w,
			h;

		if( self.innerWidth )
		{
			w = self.innerWidth;
			h = self.innerHeight;
		}
		else if( document.documentElement &&
			document.documentElement.clientWidth )
		{
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		}
		else
		{
			w = document.body.clientWidth;
			h = document.body.clientHeight;
		}

		return { width: w, height: h };
	}
};
