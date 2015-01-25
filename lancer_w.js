// TAPEZ LE CODE ICI

var stage;

var img_fond = new Image();
var preloadCount =0;
var PRELOADTOTAL =1;

var word = new Array();
word = ["ABDUCTION", "ACROSOMIQUE", "OESTRUS", "TRIQUETRUM", "ZYGOTE", "ACHIRAL", "CHONDROBLASTE", "DIGESTIVE", "RADIOINDUITE", "VESTIBULAIRE"];
var word2 = new Array(); 
word2= ["TECHNOLOGIE", "TABLE", "CITRON", "ETABLISSEMENT", "SOURIS", "ORDINATEUR", "DEMOCRATIE", "TRAIN", "VOITURE", "ECHARPE"];
var texte;
var i = 0;
var vx = 10;
var vy = 10;
var ax = 0;
var ay = 1;

var shape, oldX, oldY, moveListener;
var textX, textY = 0;
var touchText;

var temps = 120;
var tempsTexte;
var gameOver;
var gameTimer;
var tmp;
var bool;

var j = 0;

gameTimer = setInterval(updateTime, 1000);

function startGame(){preloadAssets();}

function preloadAssets()
{
	img_fond.onload = preloadUpdate();
	img_fond.src = "media/ciel0.png";
	preloadUpdate();
}

function preloadUpdate()
{
	preloadCount++;
	if (preloadCount == PRELOADTOTAL) launchGame();
}

function launchGame()
{
	stage = new createjs.Stage("gameCanvas");
	//stage.enableDOMEvents(true);
	
	tmp = lancer();
	
	//active lorsque la souris est sur un éléments 
	//(sans presser avec mise à jour tt les 30sec)
	stage.enableMouseOver(20);
	
	//Objet graphique pour le tracer du trait
	shape = new createjs.Shape();
	stage.addChild(shape, texte);
		//si on fait un click de souris
	stage.on("stagemousedown", function(event) {
	//on écoute les événements de la souris (avec bouton pressé)
	moveListener = stage.on("stagemousemove", function(evt) {
				//tracer du trait de oldX à oldY
				if (oldX) {
					shape.graphics.beginLinearGradientStroke(["#C8C8C8","#DCDCDC"], [0, 1], oldX, oldY, evt.stageX, evt.stageY)
					.setStrokeStyle(2, "round")
					.moveTo(oldX, oldY)
					.lineTo(evt.stageX, evt.stageY);
					stage.update();
				}
				//on enregistre les nouvelles pos du trait
				oldX = evt.stageX;
				oldY = evt.stageY;
				//on voit si la souris passe sur le texte
				//texte.addEventListener("mouseover", function(e) {
				//si c'est le cas on enregistre la position x et y
				//	if (moveListener) {
					//touchText = true;
					//textX = e.stageX;
					//textY = e.stageY;
					//j = j+1;}
					//});
				var pt = texte.globalToLocal(stage.mouseX, stage.mouseY);
				if (texte.hitTest(pt.x, pt.y)) {touchText = true;}
			})
		})
	

		//cas où on relache le click de souris
		stage.on("stagemouseup", function (evt) {
			//on desactive l'écoute mouse move et effacer l'ancien trait.
			if (touchText){ 
				alert("objet coupé");
				touchText = false;}
				
			stage.off("stagemousemove", moveListener);
			shape.graphics.clear();
			oldX = oldY = 0;
		})
		
	tempsTexte = new createjs.Text("Temps: "+temps.toString(), "24px Arial", "#000000");
	tempsTexte.x = 8; tempsTexte.y = 0;
	stage.addChild(tempsTexte);
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", mainTick);
}
function updateTime () {
	temps--;
	if (temps == 0) { 
		tempsTexte.text = "Temps: "+temps;
		gameOver = new createjs.Text("Terminé !!!", "35px Arial", "#000000" );
		gameOver.x = 250; gameOver.y = 100;
		stage.addChild(gameOver);
		clearInterval(gameTimer);
		temps = 120;
		//verfier les points du joueur: si ok gameLevel() sinon menuTexte
		}
	else {	
		tempsTexte.text = "Temps: "+temps;
		
		}
}

function lancer()
{
	
	bool = (Math.random() <= .25);
	if (bool) texte = new createjs.Text(word2[i], "24px Arial");
	else texte = new createjs.Text(word[i], "24px Arial");	
	texte.textBaseline = "alphabetic";
	tmp = Math.random()*2;
	if (tmp < 1){
		texte.x = 0;
		texte.y = 600;
		vy = -((Math.random()*10)+20);
	}
	else {
		texte.x = 800;
		texte.y = 600;
		vy = -((Math.random()*10)+20);
	}
	stage.addChild(texte);
	i = i+1;
	if (i>= word.length) i = 0;
	return tmp;
}
function mainTick()
{
	if(texte.y > 700){
	stage.removeChild(texte);
	tmp = lancer();
	}
	if(tmp < 1){
		texte.x = texte.x + vx;
		texte.y = texte.y + vy;
		vx = vx + ax;
		vy = vy + ay;
	}
	else{
		texte.x = texte.x - vx;
		texte.y = texte.y + vy;
		vx = vx - ax;
		vy = vy + ay;
	}
		
stage.update();
}
