// Инициализация переменных
function init(){
	var can = document.getElementById('canvasID');// Получение  элемента canvas
	var ctx = can.getContext('2d');// Получени 2D контекста
}
// Изменение данных
function changeData(){

}
// Отрисовка игровых объектов
function draw(){

}
// Главный игровой цикл
function start(){
	setInterval(fuction(){
		changeData();
		draw();
	});
}
// Запуск всех функций после полной загрузки страницы
window.onload = function(){
	init();
	start();
}

// Авторы:
// Абдулов Тимур,
// Fleur.