// Абдулов Тимур 
// Fleur

var can = document.getElementById('canvasID');// Получаю документ 
var ctx = can.getContext('2d'); // Получаю контекст 
// Координаты мышки 
var mouseX = 10; // Координата куда должен двигаться персонаж по X
var mouseY = 20; // Координата куда должен двигаться персонаж по Y
var mas = []; // Масив с игровыми обьектами 
var PER=1;// Персонаж 
var ROB=2;// Робот  
var STE=3;// Стена
var SRO=4;// Сломаный робот 
var BOM=5;// Ловушка   

mas[1] =  new Rect(PER,10,30,10,10);var player=mas[1];
mas[2] =  new Rect(ROB,10,200,10,10);// Робот 
mas[3] =  new Rect(STE,10,70,10,10);// Стена 
mas[4] =  new Rect(SRO,10,90,10,10);// Сломаный робот 
mas[5] =  new Rect(BOM,player.x,player.y-10,10,10);var bomb = mas[5];// ЛОвушка рядом с персонажем 

// Отрисовка игровго обеекта Ob в зависимости от типа -------------------------- 
function DrawOb(Ob) {  
		ctx.beginPath();// подготовка рисования 
		if (Ob.t==PER) {Ob.c = 'yellow';} // Прорисовка персонажа 
		if (Ob.t==ROB) {Ob.c = 'white';}// прорисовка Робота
		if (Ob.t==STE) {Ob.c = 'grey';}// прорисовка стены 
		if (Ob.t==SRO) {Ob.c = 'black';}// прорисовка сломаного Робота 
		if (Ob.t==BOM) {Ob.c = 'red';} 
		if (Ob.m)      {if(Ob.b){Ob.c = 'red';}else{Ob.c = 'white';}};
		ctx.fillStyle = Ob.c;// Указываю цвет 
		ctx.fillRect(Ob.x,Ob.y,Ob.h,Ob.w);// РИсую 
		Ob.b=!Ob.b;	// Инвертирвоание 	
} 
//Конструктор объекта  ---------------------------------------------------------
function Rect(t,x,y,w,h){ 
  this.r = 100000;// Расстояние
  this.t = t;// Тип обьекта 
  this.x = x;// Координата по X
  this.y = y;// Координата по Y
  this.w = w;// Ширина обьекта 
  this.h = h;// Высота обьекта 
  this.c ='black';// цвет обьекта
  this.m = false ;// Мигание обьекта  
  this.b = false ;// Фаза Мигание обьекта
  if (t==BOM) this.m = true ;// Мигание обьекта  включено  
}
// Таймер ---------------------------------------------------------------------- 
setInterval(function(){
	can.width = 500;// Ширина канвы 
	can.height = 500;// Высота канвы
	for (var f=1;f<mas.length;f++) DrawOb(mas[f]); // Вырисовка игровых обьектов 
	player.x += (mouseX-player.x)/10; // перемещение персонажа по X
	player.y += (mouseY-player.y)/10; // перемещение персонажа по Y
	//Рисование радиуса поражения бомбы
	ctx.beginPath();
		ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.arc(mas[5].x+5, mas[5].y +5, 50, 0, Math.PI * 2);
		ctx.fill();
	ctx.stroke();
	
	//Цикл вычисления расстояния
	for (var f=1;f<mas.length;f++){
		//Вычисляю расстояние от бомбы до объекта
		mas[f].r = Math.sqrt((bomb.x - mas[f].x)*(bomb.x - mas[f].x)+(bomb.y - mas[f].y)*(bomb.y - mas[f].y));
		//Меняем тип объекта ечсли расстояние меньше 50 и тип объекта = robot
		if((mas[f].r < 50) && (mas[f].t == ROB)) mas[f].t = SRO;
	}
	
},50);// Интервал 50 
//Перемещение мыши -------------------------------------------------------------
can.onmousemove = function(evt){
	mouseX = evt.pageX - can.offsetLeft; // Запоминаем x мышки 
	mouseY = evt.pageY - can.offsetTop; // запоминаем Y мышки 
}
// Нажатие на мышке ------------------------------------------------------------
can.onclick = function(){     // Перемещение ловушки по нажатию на мышку 
	bomb.x = player.x;       
	bomb.y = player.y - 10;
	DrawOb(bomb); // Перерисовка ловушки 
}

