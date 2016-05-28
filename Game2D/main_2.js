var can = document.getElementById('canvasID');// Получение  элемента canvas
var ctx = can.getContext('2d');// Получени 2D контекста
// Глобальные переменные
var character,tree;// Объекты
var mouseX=1, mouseY=1;// Координаты мыши
var press_key;
var SPEED = 10;
var bulletArr;
// Получение координат мыши
can.onmousemove = function(e){
	mouseX = e.pageX - can.offsetLeft; // Запоминаем x мышки 
	mouseY = e.pageY - can.offsetTop; // запоминаем Y мышки 
}
document.onkeydown = function(e){
	
	press_key = e.keyCode;
}
document.onkeyup = function(e){
	press_key = 0;
}

// Конструктор
function creating(x,y,c,w,h){
	this.x = x;
	this.y = y;
	this.c = c;
	this.w = w;
	this.h = h;
	this.speedX = 0;
	this.speedY = 0;
	
	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = this.c;
			ctx.fillRect(this.x,this.y, this.w,this.h);
		ctx.fill();
	}
}
// Инициализация переменных
function init(){
	
	character = new creating(1,1,'black',10,10);
	tree = new creating(10,10,'green',10,10);
	bullet = new creating(10,10,'red',5,5);
	
}
// Изменение данных
function changeData(){
	//(press_key != 0)?console.log(press_key):console.log(0);
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
			
			bullet.x = character.x + 2.5;
			bullet.y = character.y + 2.5;
			
			var rX = (mouseX - bullet.x);
			var rY = (mouseY - bullet.y);
			var ras = Math.sqrt((rX*rX)+(rY*rY));
			
			
			bullet.speedX = rX/ras;
			bullet.speedY = rY/ras;
		default:
		break;
	}
	
	bullet.x = bullet.x + bullet.speedX * 10;
	bullet.y = bullet.y + bullet.speedY * 10;
	
	
}
// Отрисовка игровых объектов
function draw(){
	can.width = 500;
	can.height = 500;
	
	character.draw();
	tree.draw();
	bullet.draw();
}
// Главный игровой цикл
function start(){
	setInterval(function(){
		changeData();
		draw();
		//console.log(mouseX, mouseY);
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