
var op = (window.opera) ? 1 : 0;
var ie = (document.all && !op) ? 1 : 0;
var ns = (window.innerWidth && !op) ? 1 : 0;
var n4 = (document.layers) ? 1 : 0;

var wdth, hght;
var Game = null;
var Operative = new Array();
var Missile = new Array();
var Max = 10;

if( ie )
{
	wdth = document.body.clientWidth;
	hght = document.body.clientHeight;
}
else
{
	wdth = window.innerWidth;
	hght = window.innerHeight;
	document.captureEvents( Event.MOUSEMOVE | Event.KEYUP );
}

with( document )
{
	write('<div ID=fOperative0 class=fOperative><img src=funf.gif border=0 name="hOperative0"><br></div>');
	write('<div ID=fOperative1 class=fOperative><img src=funmf.gif border=0 name="hOperative1"><br></div>');
	write('<div ID=fOperative2 class=fOperative><img src=fune.gif border=0 name="hOperative2"><br></div>');
	write('<div ID=fOperative3 class=fOperative><img src=fune.gif border=0 name="hOperative3"><br></div>');
	write('<div ID=fOperative4 class=fOperative><img src=fune.gif border=0 name="hOperative4"><br></div>');
	write('<div ID=fOperative5 class=fOperative><img src=fune.gif border=0 name="hOperative5"><br></div>');
	write('<div ID=fOperative6 class=fOperative><img src=funme.gif border=0 name="hOperative6"><br></div>');
	write('<div ID=fOperative7 class=fOperative><img src=funme.gif border=0 name="hOperative7"><br></div>');
	write('<div ID=fOperative8 class=fOperative><img src=funme.gif border=0 name="hOperative8"><br></div>');
	write('<div ID=fOperative9 class=fOperative><img src=funme.gif border=0 name="hOperative9"><br></div>');
	write('<div ID=fOperative10 class=fOperative><img src=funme.gif border=0 name="hOperative10"><br></div>');
}

function loadgame()
{
	window.status = "loading game ... (37k)";
	getimages( 	"funp.gif", "funpf.gif",
			"funf.gif", "funfx0.gif", "funfx1.gif", "funfx2.gif",
			"fune.gif", "funex0.gif", "funex1.gif", "funex2.gif",
			"funmf.gif", "funme.gif", "funmx.gif" );
	return;
}

function getimages()
{
	if( !document.imgs )
		document.imgs = new Array();

	if( getimages.arguments.length != 0 )
	{
		if( !this.preload )
			this.preload = new Array();

		for( var i=0; i<getimages.arguments.length; i++ )
			this.preload[i] = getimages.arguments[i];
		if( this.preload.length == 0 )
			return;
	}

	if( (i = this.preload.length-1) > -1 )
	{
		document.imgs[i] = new Image();
		document.imgs[i].src = this.preload[i];
		this.preload.length = i;
	}
	else i=0;

	if( !document.imgs[i].complete || this.preload.length > 0 )
		this.tID = setTimeout( "getimages()", 10 );
	else
	{
		window.status = "play the game !";
		Game = new game();
		Game.run();
	}
	return;
}

function game()
{
	this.run = gameRun;
	this.end = gameEnd;
	this.tID = 0;
	this.score = 0;
	this.shot = 1;
	this.enemys = 4;
	this.threats = 4;
	this.firstEnemy = this.shot+1;
	this.firstThreat = this.firstEnemy+this.enemys;
	this.threatsFired = (this.threats*this.threats)-1;
	this.freeThreat = 0;

	Operative[0] = new operative( 0, "f", 64, 114, 12, true, false );
	Operative[0].x = wdth>>1;
	Operative[0].y = hght-120;
	Operative[0].vectorX = 0;
	Operative[0].vectorY = 0;

	Operative[this.shot] = new operative( this.shot, "mf", 11, 33, 10, false, true );

	for( i=this.firstEnemy; i<this.firstEnemy+this.enemys; i++ )
		Operative[i] = new operative( i, "e", 92, 69, 20, true, false );

	for( i=this.firstThreat; i<=this.firstThreat+this.threats; i++ )
		Operative[i] = new operative( i, "me", 11, 33, 10, false, true );

	document.onmousemove = gameMouseMove;
	document.onkeyup = gameKeyUp;

	return;
}

function gameRun()
{
	Operative[0].fly();
	if( Operative[this.shot].active )
		Operative[this.shot].fly();

	for( i=this.firstEnemy; i<Operative.length; i++ )
		if( Operative[i].active )
		{
			if( Operative[i].hot )
			{
				if( Operative[i].y < Operative[0].y )
					Operative[i].lock( Operative[0].x+Operative[0].midX );
			}
			else
			{
				if( Operative[i].reload > 0 )
					Operative[i].reload--;

				if( Math.abs(Operative[i].x-Operative[0].x) < 128 )
					if( Operative[i].y < Operative[0].y )
						if( this.freeThreat < this.threatsFired && Operative[i].reload == 0 )
						{
							var tmp = this.firstThreat;
							if( (this.freeThreat & 2) == 0 )
								tmp++;
							else if( (this.freeThreat & 4) == 0 )
								tmp+=2;
							else if( (this.freeThreat & 8) == 0 )
								tmp+=3;

							Operative[tmp].x = Operative[i].x+Operative[i].midX;
							Operative[tmp].y = Operative[i].y+Operative[i].midY;
							Operative[tmp].vectorY = Operative[i].vectorY+8;
							Operative[tmp].lock( Operative[0].x+Operative[0].midX );
							Operative[tmp].activate();
							Operative[i].reload = 16;
							Game.score++;

							this.freeThreat |= (1 << (tmp-this.firstThreat));
						}
			}

			if( Operative[i].x > Operative[0].x-Operative[i].w && Operative[i].y > Operative[0].y-Operative[i].h )
				if( Operative[i].x < Operative[0].x+Operative[0].w && Operative[i].y < Operative[0].y+Operative[0].h )
					if( Operative[i].hot )
					{
						Operative[0].damage(30);
						Operative[i].explode();
					}
					else
					{
						Operative[0].explode();
						Operative[i].explode();
					}

			if( Operative[this.shot].active )
				if( Operative[i].x > Operative[this.shot].x-Operative[i].w && Operative[i].y > Operative[this.shot].y-Operative[i].h )
					if( Operative[i].x < Operative[this.shot].x+Operative[this.shot].w && Operative[i].y < Operative[this.shot].y+Operative[this.shot].h )
					{
						Operative[this.shot].explode();
						Operative[i].explode();
					}

			Operative[i].fly();
		}

	if( Operative[0].active )
		this.tID = setTimeout( "Game.run()", 25 );
	else
		Game.end();
	return;
}

function gameMouseMove( e )
{
	var mouseX, mouseY;

	if( op )
	{
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	else if( ie )
	{
		mouseX = event.clientX + document.body.scrollLeft;
		mouseY = event.clientY + document.body.scrollTop;
	}
	else if( ns )
	{
		mouseX = e.pageX;
		mouseY = e.pageY;
	}

	Operative[0].course( mouseX, mouseY );
	return;
}

function gameKeyUp( e )
{
	if( !Operative[Game.shot].active )
	{
		Operative[Game.shot].x = Operative[0].x+Operative[0].midX;
		Operative[Game.shot].y = Operative[0].y+Operative[0].midY;
		Operative[Game.shot].vectorY = -32;
		Operative[Game.shot].handle.left = Operative[Game.shot].x;
		Operative[Game.shot].handle.top = Operative[Game.shot].y;
		Operative[Game.shot].activate();
	}

	return;
}

function gameEnd()
{
	var	now = new Date();

	clearTimeout( this.tID );

	Operative[0].hide();
	for( i=1; i<Operative.length; i++ )
		Operative[i].hide();

	document.onmousemove = null;
	document.onkeyup = null;

	window.location = "index.html?"+this.score;
	Game = null;

	return;
}

function operative( ID, type, w, h, agility, active, hot )
{
	this.activate = operativeActivate;
	this.fly = operativeFly;
	this.course = operativeCourse;
	this.lock = operativeLock;
	this.damage = operativeDamage;
	this.explode = operativeExplode;
	this.resurrect = operativeResurrect;
	this.kill = operativeKill;
	this.hide = operativeHide;
	this.whoIam = ID;
	this.type = type;
	this.active = active;
	this.hot = hot;
	this.x = 0;
	this.y = 0;
	this.w = w;
	this.h = h;
	this.midX = this.w>>1;
	this.midY = this.h>>1;
	this.agility = agility;
	this.vectorX = 0;
	this.vectorY = 0;
	this.power = 0;
	this.reload = 0;
	this.exploding = 0;

	if( n4 )
		eval("this.handle = document.layers.fOperative"+this.whoIam);
	else
		this.handle = document.getElementById("fOperative"+this.whoIam).style;

	this.handle.left = this.x;
	this.handle.top = this.y;
	if( this.active )
		this.handle.visibility = 'visible';

	this.resurrect();
	return;
}

function operativeActivate()
{
	this.active = true;
	this.handle.visibility = 'visible';

	return;
}

function operativeFly()
{
	this.x+=this.vectorX;
	this.y+=this.vectorY;

	if( this.exploding > 0 )
		this.explode();

	if( this.y > hght )
		this.resurrect();
	else if( this.y < -150 )
		this.kill();

	this.handle.left = this.x;
	this.handle.top = this.y;

	return;
}

function operativeCourse( x, y )
{
	this.vectorX = (x-this.x)/this.agility;
	this.vectorY = (y-this.y)/this.agility;

	return;
}

function operativeLock( x )
{
	this.vectorX = (x-this.x)/this.agility;

	return;
}

function operativeDamage( damage )
{
	this.power-=damage;

	if( this.power <= 0 )
		this.explode();

	return;
}

function operativeExplode()
{
	if( this.hot )
	{
		this.x-=13;
		this.vectorY = 0;
		this.vectorX = 0;

		swapImage( this.whoIam, "funmx" );

		this.exploding++;
		if( this.exploding > 3 )
			this.kill();
	}
	else
	{
		swapImage( this.whoIam, "fun"+this.type+"x"+(this.exploding>>2) );

		this.agility = 100;
		this.exploding++;
		if( this.exploding > 12 )
			if( this.whoIam != 0 )
			{
				Game.score+=50;
				this.resurrect();
			}
			else
				this.kill();
	}

	return;
}

function operativeResurrect()
{
	if( this.hot )
		if( this.y > hght )
		{
			this.kill();
			return;
		}

	this.power = 90;
	if( this.whoIam != 0 )
	{
		this.vectorX = Math.random();
		if( Math.random() > .5 )
			this.vectorX = -this.vectorX;
		this.vectorY = 10+(Math.random()*6);
		this.y = -120;
		this.x = Math.random()*wdth;
		this.exploding = 0;
	}
	else
	{
		this.vectorX = 0;
		this.vectorY = 0;
		this.x = wdth>>1;
		this.y = hght-100;
		this.exploding = 0;
	}
	swapImage( this.whoIam, "fun"+this.type );

	return;
}

function operativeKill()
{
	swapImage( this.whoIam, "fun"+this.type );

	this.exploding = 0;
	this.active = false;
	this.handle.visibility = 'hidden';

	if( this.whoIam != Game.shot )
		Game.freeThreat ^= (1 << (this.whoIam-Game.firstThreat));

	return;
}

function operativeHide()
{
	this.handle.visibility = 'hidden';

	return;
}

function swapImage( n, file )
{
	if( n4 )
		eval("document.layers.fOperative"+n+".document.images[0].src = '"+file+".gif'");
	else if( ns )
		eval("document.hOperative"+n+".src = '"+file+".gif'");
	else
		eval("document.all.hOperative"+n+".src = '"+file+".gif'");
}
