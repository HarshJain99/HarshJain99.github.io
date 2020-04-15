var myCanvas = document.getElementById("whiteBoard");
var ctx = document.getElementById("whiteBoard").getContext("2d");
var draw, allowdrawFree = false, allowdrawRectangle = false, allowdrawCircle = false;
var isDown = false;
var lineWidth = 1;
var lineColor = "black";

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
        ctx.lineWidth = lineWidth;
        
        defaultDrawingBehavior();
    }
	
	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
    },false);
    
    // keyboard listeners 
    $(document).keypress(function(e) {
        switch (e.key) {
            case "r":
                drawRectangle();
                break;
            case "c":
                drawCircle();
                break;
            case "+":
                lineWidth = Math.min(10, lineWidth + 1);
                $('#lineWidth').html("Line Width: " + lineWidth);
                break;
            case "-":
                lineWidth = Math.max(1, lineWidth - 1);
                $('#lineWidth').html("Line Width: " + lineWidth);
                break;
            default:  // do nothing
        };
    });

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
                ctx.lineWidth = lineWidth;
                canvasX = e.pageX - myCanvas.offsetLeft;
                canvasY = e.pageY - myCanvas.offsetTop;
                ctx.lineTo(canvasX, canvasY);
                ctx.strokeStyle = lineColor;
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
                element.style.border = lineWidth + 'px solid ' + lineColor;
                element.style.width = parseInt(Math.abs(mouse.x - mouse.startX) - 5)+ 'px';
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
}

function drawCircle(){
    if($('#drawCircle').hasClass("drawingCircle")){
        if(element != null || element != undefined){
            console.log("element not ended", element);
            return;
        } 
        defaultDrawingBehavior();
        allowdrawCircle = false;
        allowdrawFree = true;
        $('#drawCircle').removeClass("drawingCircle");
        return;
    }
    allowdrawFree = false;
    allowdrawCircle = true;
    $('#drawCircle').addClass("drawingCircle")

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
        if(allowdrawCircle){
            setMousePosition(e);
            if (element !== null) {
                element.style.borderRadius = '50%';
                element.style.border = lineWidth + 'px solid ' + lineColor;
                element.style.width = parseInt(Math.abs(mouse.x - mouse.startX) - 5)+ 'px';
                element.style.height = parseInt(Math.abs(mouse.y - mouse.startY) - 5) + 'px';
                element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
            }
        }
    });

    $(myCanvas).on('click', function (e) {
        if(allowdrawCircle){
            if (element !== null) {
                element = null;
                myCanvas.style.cursor = "default";
            } else {
                mouse.startX = mouse.x;
                mouse.startY = mouse.y;
                element = document.createElement('div');
                element.className = 'circle shapeInCanvas'
                element.style.left = mouse.x + 'px';
                element.style.top = mouse.y + 'px';
                $('#whiteBoardContainer').append(element);
                myCanvas.style.cursor = "crosshair";
            }
        }
    });
}

function clearWhiteBoard(){
    $('.shapeInCanvas').remove();
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

function onColorChange(){
    lineColor = $('#lineColor').val();
}