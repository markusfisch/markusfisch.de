/*
 *   O         ,-
 *  � o    . -�  '     ,-
 *   �  .�        ` . �,�
 *     ( �   ))     . (
 *      `-;_    . -� `.`.
 *          `._'       �
 *
 * Copyright (c) 2010 Markus Fisch <mf@markusfisch.de>
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Opacity of focused cell
 *
 * @access protected
 * @var float
 */
ZoomGrid.prototype.opacityFocused = .98;

/**
 * Opacity of unfocused cell
 *
 * @access protected
 * @var float
 */
ZoomGrid.prototype.opacityUnfocused = .5;

/**
 * Opacity of folded cell
 *
 * @access protected
 * @var float
 */
ZoomGrid.prototype.opacityFolded = .2;

/**
 * True if this is IE
 *
 * @access private
 * @var bool
 */
ZoomGrid.prototype.isIE = document.all && !window.opera;

/**
 * Add transparency to given ZoomGrid instance
 *
 * @access public
 * @return true on success, false otherwise
 */
ZoomGrid.prototype.addTransparency = function()
{
	/**
	 * Called before moving begins
	 *
	 * @access protected
	 */
	this.transparencyOldStartMove = this.startMove;
	this.startMove = function()
	{
		this.invalidateOpacity();
		this.transparencyOldStartMove();
	}

	/**
	 * Called after moving has stopped
	 *
	 * @access protected
	 */
	this.transparencyOldStopMove = this.stopMove;
	this.stopMove = function()
	{
		this.invalidateOpacity();
		this.transparencyOldStopMove();
	}

	/**
	 * Called while moving
	 *
	 * @access protected
	 */
	this.transparencyOldMoving = this.moving;
	this.moving = function()
	{
		this.transparencyOldMoving();

		if( this.cells.length < 1 ||
			this.rows < 1 )
			return;

		// initialize opacity information
		if( !this.cells[0].zoomGrid.opacity )
			for( var n = this.cells.length; n--; )
			{
				var c = this.cells[n],
					m = Math.abs(
							c.offsetWidth-
							c.zoomGrid.targetWidth )+
						Math.abs(
							c.offsetHeight-
							c.zoomGrid.targetHeight ),
					o = c.zoomGrid.currentOpacity > 0 ?
						c.zoomGrid.currentOpacity :
						this.opacityFocused,
					t;

				if( c == this.active )
					t = this.opacityFocused;
				else if( !this.active )
					t = this.opacityUnfocused;
				else
					t = this.opacityFolded;

				c.zoomGrid.opacity = {
					max: m,
					offset: o,
					target: t,
					factor: m > 0 ? Math.abs( t-o )/m : 1 };
			}

		// set opacity on every cell
		for( var n = this.cells.length; n--; )
		{
			var c = this.cells[n],
				o = (c.zoomGrid.opacity.max-(
						Math.abs(
							c.offsetWidth-
							c.zoomGrid.targetWidth )+
						Math.abs(
							c.offsetHeight-
							c.zoomGrid.targetHeight )))*
					c.zoomGrid.opacity.factor;

			if( c.zoomGrid.opacity.target >
				c.zoomGrid.opacity.offset )
				o = c.zoomGrid.opacity.offset+o
			else
				o = c.zoomGrid.opacity.offset-o;

			this.setOpacity( c, o );
		}
	}

	for( var n = this.cells.length; n--; )
		this.setOpacity( this.cells[n], this.opacityUnfocused );

	return true;
}

/**
 * Set opacity on given cell
 *
 * @access protected
 * @param e - cell element
 * @param o - new opacity value
 */
ZoomGrid.prototype.setOpacity = function( e, o )
{
	if( this.isIE )
		e.style.filter =
			'alpha(opacity='+Math.ceil( 100*o )+')';
	else
		e.style.opacity = o;

	e.zoomGrid.currentOpacity = o;
}

/**
 * Invalidate opacity information
 *
 * @access protected
 */
ZoomGrid.prototype.invalidateOpacity = function()
{
	if( this.cells.length > 0 )
		this.cells[0].zoomGrid.opacity = 0;
}
