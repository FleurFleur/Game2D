var can = document.getElementById('canvasID');// Получение  элемента canvas
var ctx = can.getContext('2d');// Получени 2D контекста
// Глобальные переменные
var character;// Объекты
var mouseX=1, mouseY=1;// Координаты мыши
var press_key;// нажатая кнопка в данный момент если не нажата = 0 
var SPEED = 10;// Скорость движения персонажа  
var OBS=[];// Массив обьектов 
// ТИпы 
var TipTre=1;
var TipPer=2;
var TipBot=3;
var TipBul=4;// Пуля
// Обработка событий 
can.onmousemove    = function(e){
	mouseX = e.pageX - can.offsetLeft; // Запоминаем x мышки 
	mouseY = e.pageY - can.offsetTop; // запоминаем Y мышки 
}
document.onkeydown = function(e){
	
	press_key = e.keyCode;
}
document.onkeyup   = function(e){
	press_key = 0;
}
// Униферсальные функции 
function TrRan(n){
return (Math.random()*n)+1|0;	
}
// По умолчанию 
function DefDrawOb(){ // рисование по умолчанию 
		 ctx.beginPath();
		 ctx.fillStyle = this.c;
		 ctx.fillRect(this.x,this.y, this.w,this.h);
		 ctx.fill();
	} 
function DefVid   (){ // ОЛпределенгие видимости по умолчанию 
		var rez=false;
		if (this.x>0)
		if (this.y>0)
		if (this.x<can.width)
		if (this.y<can.height) rez=true;
		return rez;
	} 
function DefWork  (){ // ОЛпределенгие работы по умолчанию 
} 
// Конструктор 
function CrePer(x,y){ // Конструктор персонажа 
	
	this.t = TipPer;  // тип Персонаж
	this.x = x;
	this.y = y;
	this.c = 'black';
	this.w = 10;
	this.h = 10;
	this.speedX = 0;
	this.speedY = 0; 
	this.draw = DefDrawOb;
	this.vid  = DefVid;
	this.work = function(){
	switch(press_key){
		case 87:// W
			character.y -= SPEED;
		break;
		case 83:// S
			character.y += SPEED;
		break;
		case 65:// A
			character.x -= SPEED;
		break;
		case 68:// D
			character.x += SPEED;
		break;
		case 32:// spacebar
		 
			var bullet=null;
			for (var f=0;f<OBS.length;f++)
			if (OBS[f].t==TipBul)   // Если это пуля
			if (OBS[f].vid()==false) // если она не в зоне видимости 
			bullet=OBS[f]; 
			
			if (bullet==null) bullet = new CreBul(this.x+2.5,this.y+2.5);	 	

			bullet.x = this.x+2.5;
			bullet.y = this.y+2.5;
 
			var rX = (mouseX - bullet.x);// Вычисляем растояние по X
			var rY = (mouseY - bullet.y);// Вычисляем растояние по Y
			var ras = Math.sqrt((rX*rX)+(rY*rY));// Рстояние между точками в писеселях 
			 
			bullet.speedX = rX/ras;
			bullet.speedY = rY/ras;

		default:
		break;
	}		
		
	}	
	
	OBS[OBS.length]=this;	
}
function CreBot(x,y){ // Конструктор Робота 
	
	this.t = TipBot;  // тип Боты
	this.x = x;
	this.y = y;
	this.c = 'yellow';
	this.w = 10;
	this.h = 10;
	this.speedX = 0;
	this.speedY = 0; 
	
	this.draw = DefDrawOb;
	this.vid  = DefVid;
	this.work = function(){ 	
		
	}	
	
	OBS[OBS.length]=this;	
}
function CreBul(x,y){ // Констурктор пули 

    this.t = TipBul;  // тип пуля
	this.x = x;
	this.y = y;
	this.c = 'red';
	this.w = 5;
	this.h = 5;
	this.speedX = 0;
	this.speedY = 0; 
	this.draw = DefDrawOb;
	this.vid  = DefVid;
	this.work = function(){  
	this.x = this.x + (this.speedX * 10);
	this.y = this.y + (this.speedY * 10); 	
	}	
	
	OBS[OBS.length]=this;	
}
function CreTre(x,y){ // Коснтурктор деорева
	
	this.t = TipTre;  // тип дерево 
 	this.x = x;
	this.y = y;
	this.c = 'rgba(0,255,0,0.5)';
	this.w = 20;
	this.h = 20;
	this.speedX = 0;
	this.speedY = 0; 
	
	this.draw=DefDrawOb; 
	this.vid  = function(){
		var rez=false;
		if (this.x>0)
		if (this.y>0)
		if (this.x<can.width)
		if (this.y<can.height) rez=true;
		return rez;
	} 	
	this.work = function(){
	// Работы нету у дерева		
	}	
	
	OBS[OBS.length]=this;	
}
// Инициализация переменных
function init(){
	
	character  = new CrePer(1 ,1 );
	for (var f=1;f<=10;f++)
	tree = new CreTre(TrRan(can.width),TrRan(can.height));
	for (var f=1;f<=50;f++)
	tree = new CreBot(TrRan(can.width),TrRan(can.height));
 
}
// Изменение данных 
function changeData(){
	for (var f=0;f<OBS.length;f++) OBS[f].work();  
}
// Отрисовка игровых объектов
function draw(){
	can.width = 500;
	can.height = 500; 
	
	for (var f=0;f<OBS.length;f++) // ОТрисовка остальное 
	if (OBS[f].t != TipTre) OBS[f].draw(); 

	for (var f=0;f<OBS.length;f++) // ОТрисовка деревьев 
	if (OBS[f].t == TipTre) OBS[f].draw(); 
	
}
// Запуск программы 
function DrawCountBullets(){ // Монитор ресурсов 
ctx.beginPath();
ctx.font='24px Arial';	
ctx.fillStyle='black';
ctx.fillText(OBS.length,can.width/2,50);	 
} 
function start(){ // Главный игровой цикл
setInterval(function(){
		changeData();
		draw();
		DrawCountBullets();
	},50);
}
// Запуск всех функций после полной загрузки страницы
window.onload = function(){
	init();
	start();
}
// Авторы:
// Абдулов Тимур,
// Fleur.