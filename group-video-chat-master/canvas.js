var myCanvas = document.getElementById("whiteBoard");
var ctx = document.getElementById("whiteBoard").getContext("2d");
var draw, allowdrawFree = false, allowdrawRectangle = false;
var isDown = false;

window.onload = function() {

    // Fill Window Width and Height
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;

    // reset canvas size on window resize
    window.onresize = function(){
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;  
    };

    // Set Background Color
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
            
    // Mouse Event Handlers
    if(myCanvas){
        var isDown = false;
        var canvasX, canvasY;
        ctx.lineWidth = 1;
        
        defaultDrawingBehavior();
    }
	
    // defaultTouchDrawingBehaviour();
	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);
	
	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},false);
}

function defaultDrawingBehavior(){
    allowdrawFree = true;
    $(myCanvas).mousedown(function(e){
        if(allowdrawFree){
            isDown = true;
            ctx.beginPath();
            canvasX = e.pageX - myCanvas.offsetLeft;
            canvasY = e.pageY - myCanvas.offsetTop;
            ctx.moveTo(canvasX, canvasY);
        }
    }).mousemove(function(e){
        if(allowdrawFree){
            if(isDown !== false) {
                canvasX = e.pageX - myCanvas.offsetLeft;
                canvasY = e.pageY - myCanvas.offsetTop;
                ctx.lineTo(canvasX, canvasY);
                ctx.strokeStyle = "#000";
                ctx.stroke();
            }
        }
    }).mouseup(function(e){
        if(allowdrawFree){
            isDown = false;
            ctx.closePath();
        }
    });
}

function drawRectangle(){
    if($('#drawRectangle').hasClass("drawingRectangle")){
        if(element != null || element != undefined){
            console.log("element not ended", element);
            return;
        } 
        defaultDrawingBehavior();
        allowdrawRectangle = false;
        allowdrawFree = true;
        $('#drawRectangle').removeClass("drawingRectangle");
        return;
    }
    allowdrawFree = false;
    allowdrawRectangle = true;
    $('#drawRectangle').addClass("drawingRectangle")
    // //Variables
    // var canvasx = $(myCanvas).offset().left;
    // var canvasy = $(myCanvas).offset().top;
    // var last_mousex = last_mousey = 0;
    // var mousex = mousey = 0;
    // var mousedown = false;

    // //Mousedown
    // $(myCanvas).on('mousedown', function(e) {
    //     last_mousex = parseInt(e.clientX-canvasx);
    //     last_mousey = parseInt(e.clientY-canvasy);
    //     mousedown = true;
    // });

    // //Mouseup
    // $(myCanvas).on('mouseup', function(e) {
    //     mousedown = false;
    // });

    // //Mousemove
    // $(myCanvas).on('mousemove', function(e) {
    //     mousex = parseInt(e.clientX-canvasx);
    //     mousey = parseInt(e.clientY-canvasy);
    //     if(mousedown) {
    //         ctx.clearRect(0,0,myCanvas.width,myCanvas.height); //clear canvas
    //         ctx.beginPath();
    //         var width = mousex-last_mousex;
    //         var height = mousey-last_mousey;
    //         ctx.rect(last_mousex,last_mousey,width,height);
    //         ctx.strokeStyle = 'black';
    //         ctx.lineWidth = 10;
    //         ctx.stroke();
    //     }
    // });
    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var element = null;    
    $(myCanvas).on('mousemove', function (e) {
        if(allowdrawRectangle){
            setMousePosition(e);
            if (element !== null) {
                element.style.width = parseInt(Math.abs(mouse.x - mouse.startX) - 5)+ 'px';
                element.style.height = parseInt(Math.abs(mouse.y - mouse.startY) - 5) + 'px';
                element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
            }
        }
    });

    $(myCanvas).on('click', function (e) {
        if(allowdrawRectangle){
            if (element !== null) {
                element = null;
                myCanvas.style.cursor = "default";
            } else {
                mouse.startX = mouse.x;
                mouse.startY = mouse.y;
                element = document.createElement('div');
                element.className = 'rectangle shapeInCanvas'
                element.style.left = mouse.x + 'px';
                element.style.top = mouse.y + 'px';
                $('#whiteBoardContainer').append(element);
                myCanvas.style.cursor = "crosshair";
            }
        }
    });
    console.log("clicked end");
}

function clearWhiteBoard(){
    $('.shapeInCanvas').remove();
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}