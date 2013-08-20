/*
 *   O         ,-
 *  ° o    . -´  '     ,-
 *   °  .´        ` . ´,´
 *     ( °   ))     . (
 *      `-;_    . -´ `.`.
 *          `._'       ´
 *
 * 2010 Markus Fisch <mf@markusfisch.de>
 */

/**
 * WebPie demo
 */
var DemoWebPie =
{
	/** WebPie object */
	webPie : null,

	/**
	 * Create a WebPie for given element
	 *
	 * @param e - parent element
	 */
	create : function( e )
	{
		e.innerHTML =
			"<p>Click anywhere within this field "+
			"to open a sample pie menu.</p>";

		DemoWebPie.webPie = new WebPie( {
			icons: [
				new WebPieIcon(
					"images/webpie/piedock.png",
					function(){
						App.zoom( "PieDockChapter" ); } ),
				new WebPieIcon(
					"images/webpie/webpie.png",
					function(){
						App.zoom( "WebPieChapter" ); } ),
				new WebPieIcon(
					"images/webpie/app.png",
					function(){
						App.zoom( "ShaderEditorChapter" ); } ),
				new WebPieIcon(
					"images/webpie/app.png",
					function(){
						App.zoom( "WaveLinesWallpaperChapter" ); } ),
				new WebPieIcon(
					"images/webpie/simsalabash.png",
					function(){
						App.zoom( "SimsalabashChapter" ); } ),
				new WebPieIcon(
					"images/webpie/readmail.png",
					function(){
						App.zoom( "ReadmailChapter" ); } ),
				new WebPieIcon(
					"images/webpie/zoomgrid.png",
					function(){
						App.zoom( "ZoomGridChapter" ); } ),
				new WebPieIcon(
					"images/webpie/cpprc.png",
					function(){
						App.zoom( "CpprcChapter" ); } ),
				new WebPieIcon(
					"images/webpie/about.png",
					function(){
						App.zoom( "AboutChapter" ); } ),
				new WebPieIcon(
					"images/webpie/plus.png",
					function(){
						DemoWebPie.webPie.icons.push(
							new WebPieIcon(
								"images/webpie/minus.png",
								function(){
									var e = DemoWebPie.webPie.icons.pop();
									e.hide();
									delete e;
									return true; } ) );
						return true; } )
				] } );

		DemoWebPie.webPie.create( e );
	}
}
