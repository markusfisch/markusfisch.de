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
 * Demos
 */
var Demos =
{
	/**
	 * Setup demos
	 */
	setup : function()
	{
		Demos.add(
			'DemoWebPie',
			DemoWebPie.create );

		Demos.add(
			'DemoZoomGrid',
			DemoZoomGrid.create );
	},

	/**
	 * Add demo
	 */
	add : function( n, f )
	{
		var e = document.getElementById( n );

		if( !e )
			return null;

		var a = document.createElement( 'a' );
		a.href = '#';
		a.onclick = function() { return false; };
		a.className = 'Demo';
		a.innerHTML = 'Click here for a demo';

		e.onclick = function() { this.onclick = null; f( this ); };
		e.appendChild( a );

		return e;
	}
};
