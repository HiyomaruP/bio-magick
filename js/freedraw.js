let can;
let ct;
let ox=0,oy=0,x=0,y=0;
let mf = false;
let tempPath

function draw_init(){
	//初期設定
	can=document.getElementById("freeDraw");
	can.addEventListener("touchstart",onDown,false);
	can.addEventListener("touchmove",onMove,false);
	can.addEventListener("touchend",onUp,false);
	can.addEventListener("mousedown",onMouseDown,false);
	can.addEventListener("mousemove",onMouseMove,false);
	can.addEventListener("mouseup",onMouseUp,false);

	ct=can.getContext("2d");
	ct.strokeStyle="#000";
	ct.lineWidth=1;
	ct.lineJoin="round";
	ct.lineCap="round";
	clearCan();
}

function onDown(event){
	clearCan();
	mf=true;
	ox=event.touches[0].pageX-event.target.getBoundingClientRect().left-scx();
	oy=event.touches[0].pageY-event.target.getBoundingClientRect().top -scy();
	event.stopPropagation();
  ct.beginPath();
	ct.moveTo(ox,oy);
  tempPath = new Path2D();
  tempPath.moveTo(ox,oy);
}

function onMove(event){
	if(mf){
		x=event.touches[0].pageX-event.target.getBoundingClientRect().left-scx();
		y=event.touches[0].pageY-event.target.getBoundingClientRect().top -scy();
		drawLine();
		ox=x;
		oy=y;
		event.preventDefault();
		event.stopPropagation();
	}
}

function onUp(event){
  ct.closePath();
  tempPath.closePath();
  ct.stroke();
  mf=false;
	event.stopPropagation();
}

function onMouseDown(event){
	clearCan();
	mf=true;
	ox=event.clientX-event.target.getBoundingClientRect().left;
	oy=event.clientY-event.target.getBoundingClientRect().top ;
	ct.beginPath();
	ct.moveTo(ox,oy);
  tempPath = new Path2D();
  tempPath.moveTo(ox,oy);
}

function onMouseMove(event){
	if(mf){
		x=event.clientX-event.target.getBoundingClientRect().left;
		y=event.clientY-event.target.getBoundingClientRect().top ;
		drawLine();
		ox=x;
		oy=y;
	}
}

function onMouseUp(event){
	mf=false;
  ct.closePath();
  tempPath.closePath();
  ct.stroke();
}

function drawLine(){
	ct.strokeStyle="#000";
	ct.lineWidth=1;
	ct.lineJoin="round";
	ct.lineCap="round";
  ct.lineTo(x,y);
  tempPath.lineTo(x,y);
	ct.stroke();
}

function clearCan(){
	ct.clearRect(0,0,can.getBoundingClientRect().width,can.getBoundingClientRect().height);
}

function scx(){
  return document.documentElement.scrollLeft || document.body.scrollLeft;
}
function scy(){
  return document.documentElement.scrollTop  || document.body.scrollTop;
}

window.addEventListener('load',() => {
  draw_init();
})
