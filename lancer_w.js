// TAPEZ LE CODE ICI

var stage;
var text;
var shape, oldX, oldY, textX, textY, moveListener;
var vx = 10;
var vy = 10;
var ax = 0;
var ay = 1;
var tmp;
var img_fond = new Image();
var preloadCount =0;
var PRELOADTOTAL =1;
var touchText = false;
var temps = 60;
var tempsTexte;


/*function startGame()
{
	var stage = new createjs.Stage(document.getElementById("gameCanvas"));
	var text = new createjs.Text("COIN COIN","36px Arial","#777777");
	stage.addChild(text);
	text.x = 360;
	text.y = 200;
	stage.update();
}*/

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
	stage.enableDOMEvents(true);
	
	/*text = new createjs.Text("ABDUCTION", "24px Arial");
	text.textBaseline = "alphabetic";
	text.x = 800;
	text.y = 600;
	vy = -((Math.random()*10)+20);*/
	tmp = lancer();
	
	//active lorsque la souris est sur un éléments 
	//(sans presser avec mise à jour tt les 30sec)
	stage.enableMouseOver(30);
	
	//Objet graphique pour le tracer du trait
	shape = new createjs.Shape();

	stage.addChild(shape, text);
	
	//si on fait un click de souris
	stage.on("stagemousedown", function(event) {
	//on écoute les événements de la souris (avec bouton pressé)
	moveListener = stage.on("stagemousemove", function(evt) {
				//on voit si la souris passe sur le texte
				text.on("mouseover", function(e) {
				if (e.type == "mouseover") { 
				//si c'est le cas on enregistre la position x et y
					touchText = true;
					textX = e.stageX;
					textY = e.stageY;
					}})
				//tracer du trait de oldX à oldY
				if (oldX) {
					shape.graphics.beginLinearGradientStroke(["#ECECEC","#FFF"], [0, 1], oldX, oldY, evt.stageX, evt.stageY)
					.setStrokeStyle(4, "round")
					.moveTo(oldX, oldY)
					.lineTo(evt.stageX, evt.stageY);
					stage.update();
				}
				//on enregistre les nouvelles pos du trait
				oldX = evt.stageX;
				oldY = evt.stageY;
			});
		})
		
		//cas où on relache le click de souris
		stage.on("stagemouseup", function (evt) {
			//si moveListener true, 
			//on desactive l'écoute mouse move et effacer l'ancien trait.
			if (moveListener){
				if (touchText){ 
					touchText = false;
					alert ("objet coupé");}
				stage.off("stagemousemove", moveListener);
				shape.graphics.clear();
				oldX = oldY = 0;
			}
			})
	tempsTexte = new createjs.Text("Temps: 60", "24px Arial", "#000000");
	tempsTexte.x = 8; tempsTexte.y = 600;
	stage.addChild(tempsTexte);
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick",mainTick);

}
function lancer(){
	text = new createjs.Text("ABDUCTION", "24px Arial");
	text.textBaseline = "alphabetic";
	var tmp = Math.random()*2;
	if (tmp < 1){
		text.x = 0;
		text.y = 600;
		vy = -((Math.random()*10)+20);
	}else{
		text.x = 800;
		text.y = 600;
		vy = -((Math.random()*10)+20);
	}
	stage.addChild(text);
	return tmp;
}

function mainTick()
{
	if(text.y > 700){
		tmp = lancer();
	}
	if(tmp < 1){
		text.x = text.x + vx;
		text.y = text.y + vy;
		vx = vx + ax;
		vy = vy + ay;
	}else{
		text.x = text.x - vx;
		text.y = text.y + vy;
		vx = vx - ax;
		vy = vy + ay;
	}
	stage.update();
}
