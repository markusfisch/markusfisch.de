var op5 = (window.opera) ? 1 : 0;
var ie5 = (document.getElementById && document.all && !op5) ? 1 : 0;
var ie4 = (document.all && !op5 && !ie5) ? 1 : 0;
var ns4 = (document.layers) ? 1 : 0;
var ns6 = (window.innerWidth && !op5 && !ns4 ) ? 1 : 0;
var wdth = (ie5 || ie4) ? document.body.clientWidth : window.innerWidth;
var hght = (ie5 || ie4) ? document.body.clientHeight : window.innerHeight;

var displayWidth, displayHeight;
var dataWidth, dataHeight = new Array(5);
var forbidden = false;
var pi = 3.141597/180;
var rec, recb;
var bg, bgb;
var vlits, hlits;
var ctrl, scn, scndat;
var up, down;
var sbm, sbmb, swrl;
var vlne, hlne, trkt, trkb;
var img = new Array();
var data = new Array(5);
var btn = new Array(5);
var lgoScan, wndWidth;
var lgoID, blinkID, sbmID, scnID, scrID;
var lgoX, lgoY;
var direction = -10;
var blinking;
var vX, vY;
var ctrlX, ctrlY;
var scnX, scnY, scnRad, scnWidth;
var scndatWidth;
var btnX = new Array(5);
var btnY = new Array(5);
var btnW = new Array(5);
var btnR = new Array(5);
var btnF = new Array(5);
var dplyMid, dplyRad, dplyY1, dplyY2;
var dX1, dX2, dY1, dY2;
var dataRad;
var scroll;
var active=0;
var loaded = new Array(false, false, false, false, false);

if( wdth < 550 || hght < 330 || (!ie4 && !ns4 && !ie5 && !ns6) )
{
	window.location = "/low";
	forbidden = true;
}
if( ns6 && window.self == window.top )
	window.location = "framed.html";

dataWidth = (wdth/100)*60;
dataHeight[0] = 1050-hght;
dataHeight[1] = 0;
dataHeight[2] = 1200-hght;
dataHeight[3] = 1250-hght;
dataHeight[4] = 600-hght;
for( i=0; i<5; i++ )
	if( dataHeight[i] < 0 )
		dataHeight[i] = 0;
displayWidth = dataWidth+48;
displayHeight = hght-208;

if( !forbidden )
	with( document )
	{
		write("<div ID='back' class='back'>");
		write("<table width="+wdth+" height="+hght+" border=0 cellpadding=0 cellspacing=0>");
		write("<tr><td valign=top><img src='void.gif' border=0 width=420 height=420 name='hHead'></td></tr>");
		write("</table>");
		write("</div>");

		write("<div ID='backb' class='backb'>");
		write("<table width="+wdth+" height="+hght+" border=0 cellpadding=0 cellspacing=0>");
		write("<tr><td valign=top><img src='void.gif' border=0 width=420 height=420 name='hHeadb'></td></tr>");
		write("</table>");
		write("</div>");

		write("<div ID='control' class='backb'>");
		write("<table width="+wdth+" height="+hght+" border=0 cellpadding=0 cellspacing=0>");
		write("<tr><td valign=top><img src='void.gif' border=0 width=420 height=420 name='hControlb'></td></tr>");
		write("</table>");
		write("</div>");

		write("<div ID='scanner' class='backb'>");
		write("<table width="+wdth+" height="+hght+" border=0 cellpadding=0 cellspacing=0>");
		write("<tr><td valign=top><img src='void.gif' border=0 width=420 height=420 name='hScannerb'></td></tr>");
		write("</table>");
		write("</div>");
	}

function setup()
{
	if( forbidden )
		return;

	if( ns4 )
	{
		rec = document.rec;
		recb = document.recb;
		bg = document.back;
		bgb = document.backb;
		vlits = document.vlights;
		hlits = document.hlights;
		ctrl = document.control;
		scn = document.scanner;
		scndat = document.scannerData;
		up = document.up;
		down = document.down;
		sbm = document.submarine;
		sbmb = document.submarineb;
		swrl = document.swirl;
		vlne = document.vline;
		hlne = document.hline;
		trkt = document.tracktop;
		trkb = document.trackbottom;
		for( i=0; i<5; i++ )
			eval("data["+i+"]=document.data"+i);
		for( i=0; i<6; i++ )
			eval("btn["+i+"]=document.button"+i);
	}
	else if( ie4 )
	{
		rec = document.all.rec.style;
		recb = document.all.recb.style;
		bg = document.all.back.style;
		bgb = document.all.backb.style;
		vlits = document.all.vlights.style;
		hlits = document.all.hlights.style;
		ctrl = document.all.control.style;
		scn = document.all.scanner.style;
		scndat = document.all.scannerData.style;
		up = document.all.up.style;
		down = document.all.down.style;
		sbm = document.all.submarine.style;
		sbmb = document.all.submarineb.style;
		swrl = document.all.swirl.style;
		vlne = document.all.vline.style;
		hlne = document.all.hline.style;
		trkt = document.all.tracktop.style;
		trkb = document.all.trackbottom.style;
		for( i=0; i<5; i++ )
			eval("data["+i+"]=document.all.data"+i+".style");
		for( i=0; i<6; i++ )
			eval("btn["+i+"]=document.all.button"+i+".style");
	}
	else
	{
		rec = document.getElementById("rec").style;
		recb = document.getElementById("recb").style;
		bg = document.getElementById("back").style;
		bgb = document.getElementById("backb").style;
		vlits = document.getElementById("vlights").style;
		hlits = document.getElementById("hlights").style;
		ctrl = document.getElementById("control").style;
		scn = document.getElementById("scanner").style;
		scndat = document.getElementById("scannerData").style;
		up = document.getElementById("up").style;
		down = document.getElementById("down").style;
		sbm = document.getElementById("submarine").style;
		sbmb = document.getElementById("submarineb").style;
		swrl = document.getElementById("swirl").style;
		vlne = document.getElementById("vline").style;
		hlne = document.getElementById("hline").style;
		trkt = document.getElementById("tracktop").style;
		trkb = document.getElementById("trackbottom").style;
		for( i=0; i<5; i++ )
			data[i]=document.getElementById("data"+i).style;
		for( i=0; i<6; i++ )
			btn[i]=document.getElementById("button"+i).style;
	}

	rec.left=(wdth-202)/2;
	rec.top=(hght/2);
	clip( rec, 0, 0, 0, 18 );
	rec.visibility='visible';

	recb.left=rec.left;
	recb.top=rec.top;
	clip( recb, 0, 0, 0, 18 );

	bg.left=0;
	bg.top=0;
	clip( bg, 0, 0, wdth, 0 );
	bg.visibility='visible';

	bgb.left=0;
	bgb.top=0;
	clip( bgb, 0, 0, wdth, 0 );
	bgb.visibility='visible';

	ctrl.left=0;
	ctrl.top=0;
	ctrlX = wdth-246;
	ctrlY = 16;
	wndWidth = 10;
	clip( ctrl, ctrlX-wndWidth, ctrlY, ctrlX+wndWidth, ctrlY+90 );

	dataRad = dataWidth/2;
	dplyRad = displayWidth/2;
	dplyMid = wdth-16-dplyRad;
	dplyY1 = 160;
	dplyY2 = hght-16;
	for( i=0; i<5; i++ )
	{
		data[i].left=wdth-48-dataWidth;
		data[i].top=dplyY1+16;
		clip( data[i], dataRad, 0, dataRad, displayHeight );
	}

	up.left=wdth-40;
	up.top=dplyY1+16;
	down.left=up.left;
	down.top=dplyY2-66;

	scnWidth = 60;
	scnX = 16+scnWidth;
	scnY = hght-80;
	scnRad = 0;
	scn.left=0;
	scn.top=0;
	clip( scn, scnX-scnRad, scnY, scnX+scnRad, scnY+64 );

	scndatWidth = scnWidth-8;
	scndat.left=24;
	scndat.top=scnY+8;
	clip( scndat, scndatWidth-scnRad, 0, scndatWidth+scnRad, 47 );

	rec.visibility='visible';
	recb.visibility='visible';
	lgoScan=0;
	showreceive();

	return;
}

function clip( what, l, t, r, b )
{
	if( ns4 )
	{
		what.clip.left=l;
		what.clip.top=t;
		what.clip.right=r;
		what.clip.bottom=b;
	}
	else
		what.clip = 'rect('+t+','+r+','+b+','+l+')';
	return;
}

function showreceive()
{
	if( ns4 )
	{
		rec.clip.right=lgoScan;
		recb.clip.left=lgoScan;
		recb.clip.right=(lgoScan+4);
	}
	else
	{
		rec.clip = 'rect(0,'+lgoScan+',18,0)';
		recb.clip = 'rect(0,'+(lgoScan+4)+',18,'+lgoScan+')';
	}
	lgoScan+=10;

	if( lgoScan < 202 )
		lgoID = setTimeout( "showreceive()", 10 );
	else
	{
		lgoScan=0;
		if( ns4 )
		{
			recb.clip.left=0;
			recb.clip.right=lgoScan;
		}
		else
		{
			recb.clip = 'rect(0,'+lgoScan+',18,0)';
		}

		load = new loadsite();
		load.getimages( "bg.jpg", "bgb.jpg", "lgo.jpg", "lgob.jpg",
				"b0.gif", "b1.gif", "b2.gif", "b3.gif", "b4.gif", "b5.gif",
				"b0a.gif", "b1a.gif", "b2a.gif", "b3a.gif", "b4a.gif", "b5a.gif",
				"vl.jpg", "hl.jpg",
				"arwup1.gif", "arwup2.gif", "arwup3.gif",
				"arwdown1.gif", "arwdown2.gif", "arwdown3.gif",
				"vline.gif", "hline.gif", "trcktop.gif", "trckbottom.gif",
				"subm.gif", "submb.gif", "swrl0.gif", "swrl1.gif",
				"smmidleft.gif", "smmidright.gif",
				"smmid0.gif", "smmid1.gif", "smmid2.gif", "smmid3.gif"  );
		return;
	}
}

function loadsite()
{
	this.timID = 0;
	this.gauge = 9;
	this.imgC = -1;
	this.files = new Array();
	this.getimages = getimg;

	return;
}

function getimg()
{
	if( this.imgC < 0 )
	{
		this.imgC = getimg.arguments.length;
		for( i=0; i<this.imgC; i++ )
			this.files[i] = getimg.arguments[i];

		this.gauge = 202/this.imgC;
		this.imgC--;
		img[this.imgC] = new Image;
		img[this.imgC].src = this.files[this.imgC];
	}

	if( img[this.imgC].complete )
	{
		lgoScan+=this.gauge;
		if( ns4 )
			recb.clip.right=lgoScan;
		else
			recb.clip = 'rect(0,'+lgoScan+',18,0)';

		this.imgC--;
		if( this.imgC < 0 )
		{
			rec.visibility='hidden';
			recb.visibility='hidden';

			if( ns4 )
			{
				document.layers["back"].document.images[0].src=img[2].src;
				document.layers["backb"].document.images[0].src=img[3].src;
				document.layers["control"].document.images[0].src=img[3].src;
				document.layers["scanner"].document.images[0].src=img[3].src;
				document.vlights.document.hVlites.src=img[16].src;
				document.hlights.document.hHlites.src=img[17].src;
				document.up.document.hUp1.src=img[18].src;
				document.up.document.hUp2.src=img[19].src;
				document.up.document.hUp3.src=img[20].src;
				document.down.document.hDown1.src=img[21].src;
				document.down.document.hDown2.src=img[22].src;
				document.down.document.hDown3.src=img[23].src;
				document.vline.document.hVline.src=img[24].src;
				document.hline.document.hHline.src=img[25].src;
				document.tracktop.document.hFrameTop.src=img[26].src;
				document.trackbottom.document.hFrameBottom.src=img[27].src;
				document.submarine.document.hSubmarine.src=img[28].src;
				document.submarineb.document.hSubmarineb.src=img[29].src;
				document.swirl.document.hSwirl.src=img[30].src;
				document.scannerData.document.hSbmIDLeft.src=img[32].src;
				document.scannerData.document.hSbmIDRight.src=img[33].src;
				document.scannerData.document.hSbmID.src=img[34].src;
				bg.background.src = img[0].src;
				bgb.background.src = img[1].src;
				ctrl.background.src = img[1].src;
				scn.background.src = img[1].src;
				for( i=0; i<6; i++ )
					eval("document.button"+i+".document.hButton"+i+".src=img["+(i+4)+"].src;");
			}
			else
			{
				document.hHead.src=img[2].src;
				document.hHeadb.src=img[3].src;
				document.hControlb.src=img[3].src;
				document.hScannerb.src=img[3].src;
				document.hVlites.src=img[16].src;
				document.hHlites.src=img[17].src;
				document.hUp1.src=img[18].src;
				document.hUp2.src=img[19].src;
				document.hUp3.src=img[20].src;
				document.hDown1.src=img[21].src;
				document.hDown2.src=img[22].src;
				document.hDown3.src=img[23].src;
				document.hVline.src=img[24].src;
				document.hHline.src=img[25].src;
				document.hFrameTop.src=img[26].src;
				document.hFrameBottom.src=img[27].src;
				document.hSubmarine.src=img[28].src;
				document.hSubmarineb.src=img[29].src;
				document.hSwirl.src=img[30].src;
				document.hSbmIDLeft.src=img[32].src;
				document.hSbmIDRight.src=img[33].src;
				document.hSbmID.src=img[34].src;
				bg.backgroundImage = 'url(bg.jpg)';
				bgb.backgroundImage = 'url(bgb.jpg)';
				ctrl.backgroundImage = 'url(bgb.jpg)';
				scn.backgroundImage = 'url(bgb.jpg)';
				for( i=0; i<6; i++ )
					eval("document.hButton"+i+".src=img["+(i+4)+"].src;");
			}

			direction=-20;
			lgoScan=hght;
			showbackground();
			return;
		}

		img[this.imgC] = new Image;
		img[this.imgC].src = this.files[this.imgC];
	}

	this.timID = setTimeout( "load.getimages()", 50 );
}

function showbackground()
{
	if( ns4 )
	{
		if( direction < 0 )
			bg.clip.top=lgoScan;
		bgb.clip.top=lgoScan;
		bgb.clip.bottom=(lgoScan+2);
	}
	else
	{
		if( direction < 0 )
			bg.clip = 'rect('+lgoScan+','+wdth+','+hght+',0)';
		bgb.clip = 'rect('+lgoScan+','+wdth+','+(lgoScan+2)+',0)';
	}
	lgoScan+=direction;

	if( lgoScan > 0 && lgoScan < (hght+32) )
		lgoID = setTimeout( "showbackground()", 10 );
	else
	{
		if( ns4 )
		{
			bg.clip.top=0;
			bgb.clip.top=0;
			bgb.clip.bottom=0;
		}
		else
		{
			bg.clip = 'rect(0,'+wdth+','+hght+',0)';
			bgb.clip = 'rect(0,'+wdth+',0,0)';
		}
		ctrl.visibility='visible';

		for( i=0; i<6; i++ )
		{
			btnY[i] = ctrlY+17;
			btnW[i] = (i*60);
			btnR[i] = (360-btnW[i])/21;
			if( i<3 )
			{
				btnF[i] = ((210/3)*(3-i))/21;
				btnX[i] = ctrlX+8;
			}
			else
			{
				btnF[i] = ((210/3)*(i-2))/21;
				btnX[i] = ctrlX-58;
			}
			btn[i].left = ctrlX-25;
			btn[i].top = btnY[i];
			btn[i].visibility='visible';
		}

		showcontrol();
		return;
	}
}

function showcontrol()
{
	if( ns4 )
	{
		ctrl.clip.left=ctrlX-wndWidth;
		ctrl.clip.right=ctrlX+wndWidth;
	}
	else
		ctrl.clip = 'rect('+ctrlY+','+(ctrlX+wndWidth)+','+(ctrlY+90)+','+(ctrlX-wndWidth)+')';
	wndWidth+=10;

	if( wndWidth == 30 )
		for( i=0; i<6; i++ )
			btn[i].visibility='visible';

	if( wndWidth > 30 )
		for( i=0; i<6; i++ )
		{
			if( i<3 )
			{
				btnX[i]-=btnF[i];
				if( btnX[i] < ctrlX-25 )
					btn[i].left=btnX[i];
			}
			else
			{
				btnX[i]+=btnF[i];
				if( btnX[i] > ctrlX-25 )
					btn[i].left=btnX[i];
			}

			btnW[i]+=btnR[i];
			if( btnW[i] > 359 )
				btnW[i] = 360-btnW[i];
			btnY[i]=(ctrlY+17)+Math.sin(btnW[i]*pi)*16;
			btn[i].top=btnY[i];
		}

	if( wndWidth < 240 )
		lgoID = setTimeout( "showcontrol()", 25 );
	else
	{
		for( i=0; i<6; i++ )
		{
			btnY[i]=ctrlY+17;
			btn[i].top=btnY[i];
		}

		blinking = 120;
		blinkID = setTimeout( "blink()", 2000 );

		sbmdive = new dive();
		sbmID = setTimeout( "sbmdive.diving()", 100 );

		return;
	}
}

function blink()
{
	if( blinking < 0 )
	{
		vlits.visibility='hidden';
		hlits.visibility='hidden';
		blinking = 120;
		blinkID = setTimeout( "blink()", 2000 );
		return;
	}

	if( blinking == 120 )
	{
		vlits.visibility='visible';
		hlits.visibility='visible';
	}
	if( ns4 )
	{
		vlits.clip.top=blinking;
		vlits.clip.bottom=blinking+34;

		hlits.clip.left=blinking;
		hlits.clip.right=blinking+34;
	}
	else
	{
		vlits.clip = 'rect('+blinking+',40,'+(blinking+34)+',0)';
		hlits.clip = 'rect(0,'+(blinking+34)+',150,'+blinking+')';
	}
	blinking-=40;

	blinkID = setTimeout( "blink()", 100 );
}

function ButtonOn( btnID )
{
	if( ns4 )
		eval("document.button"+btnID+".document.hButton"+btnID+".src=img["+(btnID+10)+"].src;");
	else
		eval("document.hButton"+btnID+".src=img["+(btnID+10)+"].src;");

	eval("swm"+btnID+" = new goswiming( btnID );");
	eval("swm"+btnID+".swim();");
	return;
}

function ButtonOff( btnID )
{
	if( ns4 )
		eval("document.button"+btnID+".document.hButton"+btnID+".src=img["+(btnID+4)+"].src;");
	else
		eval("document.hButton"+btnID+".src=img["+(btnID+4)+"].src;");

	eval("swm"+btnID+".dock = 1;");
	return;
}

function goswiming( btnID )
{
	this.btn = btnID;
	this.bX = btnX[btnID];
	this.bY = btnY[btnID];
	this.Deg = 0;
	this.timID = 0;
	this.dock = 0;
	this.swim = swim;

	return;
}

function swim()
{
	var swimX = this.bX+(Math.cos(this.Deg*pi)*2);
	var swimY = this.bY+(Math.sin(this.Deg*pi)*4);

	this.Deg+=20;
	if( this.Deg > 359 )
		this.Deg-=360;

	btn[this.btn].left=swimX;;
	btn[this.btn].top=swimY;;

	if( this.dock != 0 )
		if( this.Deg == 0 )
		{
			clearTimeout( this.timID );
			btn[this.btn].left=this.bX;
			btn[this.btn].top=this.bY;
			return;
		}

	this.timID = setTimeout( "swm"+this.btn+".swim()", 25 );
}

function command( btnID )
{
	window.focus();

	up.visibility='hidden';
	down.visibility='hidden';
	data[active].visibility='hidden';
	wndWidth=0;
	scroll=0;

	switch( btnID )
	{
		case 0:
			opendisplay( 0 );
			if( !loaded[0] )
			{
				loaddata0 = new loaddata( "data0" );
				loaddata0.getimages( "b0.gif" );
				loaded[0] = true;
			}
			break;
		case 1:
			opendisplay( 1 );
			if( !loaded[1] )
			{
				loaddata1 = new loaddata( "data1" );
				loaddata1.getimages( "b1.gif",
							"thmb_goldwing.jpg" );
				loaded[1] = true;
			}
			break;
		case 2:
			opendisplay( 2 );
			if( !loaded[2] )
			{
				loaddata2 = new loaddata( "data2" );
				loaddata2.getimages( "b2.gif" );
				loaded[2] = true;
			}
			break;
		case 3:
			opendisplay( 3 );
			if( !loaded[3] )
			{
				loaddata3 = new loaddata( "data3" );
				loaddata3.getimages( "b3.gif",
							"thmb_badday.jpg",
							"thmb_hammerheadisle.jpg",
							"thmb_warbird.jpg",
							"thmb_bullet.jpg" );
				loaded[3] = true;
			}
			break;
		case 4:
			opendisplay( 4 );
			if( !loaded[4] )
			{
				loaddata4 = new loaddata( "data4" );
				loaddata4.getimages( "b4.gif", "hhswbsm.jpg" );
				loaded[4] = true;
			}
			break;
	}
	return;
}

function opendisplay( num )
{
	// for check if submarine is under display
	dX1 = dplyMid-wndWidth-152;
	dX2 = dplyMid+wndWidth;

	if( ns4 )
	{
		bgb.clip.left=dplyMid-wndWidth;
		bgb.clip.right=dX2;
		data[num].clip.left=dataRad-wndWidth+8;
		data[num].clip.right=dataRad+wndWidth-8;
	}
	else
	{
		bgb.clip = 'rect('+dplyY1+','+dX2+','+dplyY2+','+(dplyMid-wndWidth)+')';
		data[num].clip = 'rect(0,'+(dataRad+wndWidth-8)+','+displayHeight+','+(dataRad-wndWidth+8)+')';
	}
	wndWidth+=10;
	sbmdive.checkdisplay();

	if( wndWidth == 20 )
	{
		// for check if submarine is under display
		dY1 = dplyY1-46;
		dY2 = dplyY2;

		if( ns4 )
		{
			data[num].clip.top=0;
			data[num].clip.bottom=displayHeight;

			bgb.clip.top=dplyY1;
			bgb.clip.bottom=dplyY2;
		}
		data[active].top=dplyY1+16;
		data[num].visibility='visible';
	}

	if( wndWidth < dplyRad )
		lgoID = setTimeout( "opendisplay("+num+")", 10 );
	else
	{
		// for check if submarine is under display
		dX1 = dplyMid-dplyRad-152;
		dX2 = dplyMid+dplyRad;

		if( ns4 )
		{
			bgb.clip.left=dplyMid-dplyRad;
			bgb.clip.right=dplyMid+dplyRad;
			data[num].clip.left=0;
			data[num].clip.right=dataWidth;
		}
		else
		{
			bgb.clip = 'rect('+dplyY1+','+(dplyMid+dplyRad)+','+dplyY2+','+(dplyMid-dplyRad)+')';
			data[num].clip = 'rect(0,'+dataWidth+','+displayHeight+',0)';
		}

		up.visibility='visible';
		down.visibility='visible';

		active = num;
		return;
	}
}

function scrollup( step )
{
	if( scroll > 0 )
	{
		scroll-=step;
		if( scroll < 0 )
			scroll = 0;

		if( ns4 )
		{
			data[active].clip.top=scroll;
			data[active].clip.bottom=scroll+displayHeight;
		}
		else
		{
			data[active].clip = 'rect('+scroll+','+dataWidth+','+(scroll+displayHeight)+',0)';
		}
		data[active].top=dplyY1+16-scroll;
	}

	scrID = setTimeout( "scrollup("+step+")", 10 );
}

function scrolldown( step )
{
	if( scroll < dataHeight[active] )
	{
		scroll+=step;
		if( scroll > dataHeight[active] )
			scroll = dataHeight[active];

		if( ns4 )
		{
			data[active].clip.top=scroll;
			data[active].clip.bottom=scroll+displayHeight;
		}
		else
		{
			data[active].clip = 'rect('+scroll+','+dataWidth+','+(scroll+displayHeight)+',0)';
		}
		data[active].top=dplyY1+16-scroll;
	}

	scrID = setTimeout( "scrolldown("+step+")", 10 );
}

function scrollhome()
{
	scroll=0;
	if( ns4 )
	{
		data[active].clip.top=scroll;
		data[active].clip.bottom=scroll+displayHeight;
	}
	else
	{
		data[active].clip = 'rect('+scroll+','+dataWidth+','+(scroll+displayHeight)+',0)';
	}
	data[active].top=dplyY1+16-scroll;
	window.focus();
	return;
}

function scrollend()
{
	scroll=dataHeight[active];
	if( ns4 )
	{
		data[active].clip.top=scroll;
		data[active].clip.bottom=scroll+displayHeight;
	}
	else
	{
		data[active].clip = 'rect('+scroll+','+dataWidth+','+(scroll+displayHeight)+',0)';
	}
	data[active].top=dplyY1+16-scroll;
	window.focus();
	return;
}

function loaddata( dat )
{
	this.dat = dat;
	this.timID = 0;
	this.imgC = -1;
	this.img = new Image();
	this.files = new Array();
	this.getimages = getdataimg;

	return;
}

function getdataimg()
{
	if( this.img.complete || this.imgC < 0 )
	{
		if( this.imgC < 0 )
		{
			this.imgC = getdataimg.arguments.length;
			for( i=0; i<this.imgC; i++ )
				this.files[i] = getdataimg.arguments[i];
		}
		else
		{
			if( ns4 )
				eval("document.layers[this.dat].document.images['h"+this.dat+"_"+this.imgC+"'].src=this.img.src;");
			else
				eval("document.h"+this.dat+"_"+this.imgC+".src=this.img.src;");
		}
		this.imgC--;
		if( this.imgC < 0 )
			return;
		this.img.src = this.files[this.imgC];
	}

	this.timID = setTimeout( "load"+this.dat+".getimages()", 50 );
}

function dive()
{
	this.x = wdth;
	this.y = Math.round((Math.random()*(hght-350))+114);
	this.beginScan = Math.round((wdth/10)*8);
	this.matchScan = Math.round((wdth/10)*5.5);
	this.endScan = this.matchScan-50;
	this.tracking = false;
	this.match = false;
	this.swirl = 0;
	this.blinking = 0;
	this.scanimg = 32;
	this.diving = diving;
	this.init = setdive;
	this.checkdisplay = checkdispay;

	sbm.left = this.x;
	sbm.top = this.y;
	sbm.visibility = 'visible';

	sbmb.left = this.x;
	sbmb.top = this.y;
	if( ns4 )
	{
		sbmb.clip.left=0;
		sbmb.clip.top=0;
		sbmb.clip.right=0;
		sbmb.clip.bottom=0;
	}
	else
	{
		sbmb.clip = 'rect(0,0,0,0)';
	}

	swrl.top = this.y+19;
	swrl.left = this.x+154;
	swrl.visibility = 'visible';

	this.init();

	return;
}

function setdive()
{
	trkt.left = this.x-20;
	trkt.top = this.y-15;
	trkb.left = trkt.left;
	trkb.top = this.y+50;

	hlne.left = 128;
	hlne.top = scnY+31;
	vlne.left = this.x+76;
	vlne.top = this.y+61;
	if( ns4 )
	{
		hlne.clip.right=this.x-52;
		vlne.clip.bottom=(scnY+31)-(this.y+59);
	}
	else
	{
		hlne.clip = 'rect(0,'+(this.x-52)+',2,0)';
		vlne.clip = 'rect(0,2,'+((scnY+31)-(this.y+59))+',0)';
	}

	return;
}

function checkdispay()
{
	if( this.x < dX2 && this.x > dX1 && this.y < dY2 && this.y > dY1 )
	{
		var sX1, sX2;
		var sY1, sY2;

		sX1 = (dX1+152)-this.x;
		if( sX1 < 0 )
			sX1 = 0;
		sX2 = dX2-this.x;
		if( sX2 > 152 )
			sX2 = 152;

		sY1 = (dY1+46)-this.y;
		if( sY1 < 0 )
			sY1 = 0;
		sY2 = dY2-this.y;
		if( sY2 > 46 )
			sY2 = 46;

		if( ns4 )
		{
			sbmb.clip.left=sX1;
			sbmb.clip.top=sY1;
			sbmb.clip.right=sX2;
			sbmb.clip.bottom=sY2;
		}
		else
			sbmb.clip = 'rect('+sY1+','+sX2+','+sY2+','+sX1+')';

		sbmb.visibility = 'visible';
	}
	else
		sbmb.visibility = 'hidden';
	return;
}

function diving()
{
	this.x-=2;
	if( this.x < -160 )
	{
		this.x = wdth;
		this.y = Math.round((Math.random()*(hght-350))+114);
		this.match = false;
		scnRad = 0;
		sbm.top = this.y;
		sbmb.top = this.y;
		swrl.top = this.y+19;

		this.init();
	}
	sbm.left = this.x;
	sbmb.left = this.x;
	swrl.left = this.x+154;
	this.checkdisplay();

	this.swirl = this.swirl^1;
	if( ns4 )
		document.swirl.document.hSwirl.src=img[30+this.swirl].src;
	else
		document.hSwirl.src=img[30+this.swirl].src;

	if( this.tracking == true )
	{
		vlne.left = this.x+76;
		trkt.left = this.x-20;
		trkb.left = trkt.left;

		if( ns4 )
		{
			hlne.clip.right=this.x-52;

			if( this.match == false )
				document.scannerData.document.hSbmID.src=img[this.scanimg].src;
			else
			{
				this.blinking=this.blinking^1;
				if( this.blinking == 0 )
					document.scannerData.document.hSbmID.src=img[34].src;
				else
					document.scannerData.document.hSbmID.src=img[35].src;
			}
		}
		else
		{
			hlne.clip = 'rect(0,'+(this.x-52)+',2,0)';

			if( this.match == false )
				document.hSbmID.src=img[this.scanimg].src;
			else
			{
				this.blinking=this.blinking^1;
				if( this.blinking == 0 )
					document.hSbmID.src=img[34].src;
				else
					document.hSbmID.src=img[35].src;
			}
		}
		this.scanimg = Math.round(Math.random()*2)+35;
	}

	if( this.x < this.beginScan && scnRad == 0 )
	{
		this.tracking = true;
		vlne.visibility = 'visible';
		hlne.visibility = 'visible';
		trkt.visibility = 'visible';
		trkb.visibility = 'visible';
		openscanner();
	}
	if( this.x < this.matchScan && scnRad > 0 )
		this.match = true;
	if( this.x < this.endScan && scnRad > 0 )
	{
		this.tracking = false;
		vlne.visibility = 'hidden';
		hlne.visibility = 'hidden';
		trkt.visibility = 'hidden';
		trkb.visibility = 'hidden';
		closescanner();
	}

	sbmID = setTimeout( "sbmdive.diving()", 100 );
}

function openscanner()
{
	if( ns4 )
	{
		scn.clip.left=scnX-scnRad;
		scn.clip.right=scnX+scnRad;

		scndat.clip.left=scndatWidth-scnRad;
		scndat.clip.right=scndatWidth+scnRad;
	}
	else
	{
		scn.clip = 'rect('+scnY+','+(scnX+scnRad)+','+(scnY+64)+','+(scnX-scnRad)+')';
		scndat.clip = 'rect(0,'+(scndatWidth+scnRad)+',47,'+(scndatWidth-scnRad)+')';
	}

	if( scnRad == 0 )
	{
		scn.visibility = 'visible';
		scndat.visibility = 'visible';
	}

	scnRad+=10;
	if( scnRad < scnWidth )
		scnID = setTimeout( "openscanner()", 10 );
	else
	{
		scnRad = scnWidth;
		if( ns4 )
		{
			scn.clip.left=scnX-scnRad;
			scn.clip.right=scnX+scnRad;

			scndat.clip.left=scndatWidth-scnRad;
			scndat.clip.right=scndatWidth+scnRad;
		}
		else
		{
			scn.clip = 'rect('+scnY+','+(scnX+scnRad)+','+(scnY+64)+','+(scnX-scnRad)+')';
			scndat.clip = 'rect(0,'+(scndatWidth+scnRad)+',47,'+(scndatWidth-scnRad)+')';
		}

		return;
	}
}

function closescanner()
{
	if( ns4 )
	{
		scn.clip.left=scnX-scnRad;
		scn.clip.right=scnX+scnRad;

		scndat.clip.left=scndatWidth-scnRad;
		scndat.clip.right=scndatWidth+scnRad;
	}
	else
	{
		scn.clip = 'rect('+scnY+','+(scnX+scnRad)+','+(scnY+64)+','+(scnX-scnRad)+')';
		scndat.clip = 'rect(0,'+(scndatWidth+scnRad)+',47,'+(scndatWidth-scnRad)+')';
	}

	scnRad-=10;
	if( scnRad > 0 )
		scnID = setTimeout( "closescanner()", 10 );
	else
	{
		scnRad = -1;
		scn.visibility = 'hidden';
		scndat.visibility = 'hidden';
		return;
	}
}

function screenshot( imgfile, imgw, imgh )
{
	eval("sshotwnd = window.open('', 'Screenshot', 'width="+(imgw+32)+", height="+(imgh+32)+", resizable=no, scrollbars=no, toolbar=no, location=no, menubar=0');");
	if( ns4 )
	{
		sshotwnd.innerWidth = imgw+32;
		sshotwnd.innerHeight = imgh+32;
	}

	with( sshotwnd )
	{
		document.open();
		document.write("<html>");
		document.write("<body background='bg.jpg' bgcolor='#000000' marginwidth=0 marginheight=0 leftmargin=0 topmargin=0 onBlur='window.close();'>");
		document.write("<img src='"+imgfile+"' border=0 hspace=16 vspace=16><br>");
		document.write("</body></html>");
		document.close();
	}
	return;
}
