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
 * ZoomGrid demo
 */
var DemoZoomGrid =
{
	/** ZoomGrid object */
	zoomGrid : null,

	/** Serial number to name cells */
	serial : 0,

	/**
	 * Create a ZoomGrid for given container element
	 *
	 * @param e - container element
	 */
	create : function( e )
	{
		var c = "";

		for( var n = 9; n--; )
		{
			DemoZoomGrid.serial++;

			c +=
				"<div id=\"DemoCell"+DemoZoomGrid.serial.toString()+"\">"+
				DemoZoomGrid.createCell( DemoZoomGrid.serial )+
				"</div>";
		}

		e.style.height = '240px';
		e.innerHTML = c;

		DemoZoomGrid.zoomGrid = new ZoomGrid( {
			paddingMarginBorder: { width: 11, height: 11 },
			container: e } );
	},

	/**
	 * Add sibling before given element
	 *
	 * @param id - id of element in question
	 */
	addCell : function( id )
	{
		var e = document.getElementById( id );

		if( !e ||
			!DemoZoomGrid.zoomGrid )
			return true;

		var d = document.createElement( 'div' );

		++DemoZoomGrid.serial;
		d.id = 'DemoCell'+DemoZoomGrid.serial.toString();
		d.innerHTML = DemoZoomGrid.createCell( DemoZoomGrid.serial );

		DemoZoomGrid.zoomGrid.container.insertBefore( d, e );
		DemoZoomGrid.resetZoomGrid();

		return false;
	},

	/**
	 * Remove given cell
	 *
	 * @param id - id of element in question
	 */
	removeCell : function( id )
	{
		var e = document.getElementById( id );

		if( !e ||
			!DemoZoomGrid.zoomGrid )
			return true;

		e.style.visibility = "hidden";
		DemoZoomGrid.zoomGrid.container.removeChild( e );
		DemoZoomGrid.resetZoomGrid();

		return false;
	},

	/**
	 * Create cell
	 *
	 * @param n - number of this cell
	 */
	createCell : function( n )
	{
		return "<h3>"+n.toString()+"</h3>"+
			"<a href=\"#\" onclick=\""+
				"return DemoZoomGrid.addCell( 'DemoCell"+n.toString()+
				"' );\">Add</a><br/>"+
			"<a href=\"#\" onclick=\""+
				"return DemoZoomGrid.removeCell( 'DemoCell"+n.toString()+
				"' );\">Remove</a>";
	},

	/**
	 * Reset ZoomGrid
	 */
	resetZoomGrid : function()
	{
		var z = DemoZoomGrid.zoomGrid;
		z.columns = 0;
		z.rows = 0;
		z.cells.length = 0;
		z.create( z.container );
	}
}
