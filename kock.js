/*
	Author : Raman Buzaubakov
	Date : 12/25/2015
*/

var board = document.getElementById("board");
var ctx = board.getContext('2d');

var k = null;

function cleanUp() {
  if (k) {
    k.clean();
  }
}

function draw() {
  var type = document.getElementById("type").value;
  var depth = document.getElementById("depth").value;
  var width = document.getElementById("width").value;

  depth = parseInt(depth);
  width = parseInt(width);

  if (k === null) {
    k = new Koch(ctx, board.width/2 - width/2, board.height/2 + width/2, board.width, board.height);
  } else {
    k.clean();
  }

  if ("snow" === type) {
    k.snow(width, depth);
  } else if ("island" === type) {
    k.island(width, depth);
  } else {
    alert("Invalid type!");
  }

  k.render();
}

function Koch(ctx, x0, y0, max_w, max_h) {

  this.x0 = x0;
  this.y0 = y0;

  this.x = x0;
  this.y = y0;

  this.maxWidth = max_w;
  this.maxHeight = max_h;
  
  this.ctx = ctx;
  this.angle = 0;

  this.clean = function() {
    this.ctx.clearRect(1, 1, this.maxWidth - 2, this.maxHeight - 2);

    this.ctx.fillStyle = "#FFA500";
    this.ctx.strokeRect(0, 0, this.maxWidth, this.maxHeight);
    
    this.ctx.beginPath();

    this.x = this.x0;
    this.y = this.y0;

    this.angle = 0;
    
    this.ctx.moveTo(this.x, this.y);
  };

  this.clean();

  this.forward = function(len) {
    //console.log("x:" + this.x + ",y:" + this.y);
    //console.log("F:" + len);
    var xy = this._trans(ctx, this.x, this.y, this.angle, len);
    this.x = xy[0];
    this.y = xy[1];
  };

  this.right = function(alfa) {
    //console.log("R:" + alfa);
    this.angle += alfa;
  };

  this.left = function(alfa) {
    //console.log("L:" + alfa);
    this.angle -= alfa;
  };

  
  this.snow0 = function(len, depth) {
    if (depth === 0) {
      this.forward(len);
    } else {
      var d = len / 3;
      var depth2 = depth - 1;

      this.snow0(d, depth2);
      this.left(60);
      this.snow0(d, depth2);
      this.right(120);
      this.snow0(d, depth2);
      this.left(60);
      this.snow0(d, depth2);
    }
  };
  
  this.snow = function(len, depth) {
    if (depth === 0) {
      this.snow0(len, depth);
    } else {
      var d = len;
      var depth2 = depth - 1;

      this.snow0(d, depth2);
      this.right(120);

      this.snow0(d, depth2);
      this.right(120);
      
      this.snow0(d, depth2);
      this.right(60);
    }
  };

  this.island = function(len, depth) {
    if (depth === 0) {
      this.island0(len, depth);
    } else {
      var d = len;
      var depth2 = depth - 1;
      
      this.island0(d, depth2);
      this.right(90);
      
      this.island0(d, depth2);
      this.right(90);
      
      this.island0(d, depth2);
      this.right(90);

      this.island0(d, depth2);
      this.right(90);
    }
  };


  this.island0 = function(len, depth) {
    if (depth === 0) {
      this.forward(len);
    } else {
      var d = Math.round(len / 4);
      var depth2 = depth - 1;

      this.island0(d, depth2);
      
      this.right(90);
      this.island0(d, depth2);
     
      this.left(90);
      this.island0(d, depth2);

      this.left(90);
      this.island0(d, depth2);
      
      this.left(0);
      this.island0(d, depth2);
      
      this.right(90);
      this.island0(d, depth2);

      this.right(90);
      this.island0(d, depth2);
      
      this.left(90);
      this.island0(d, depth2);
    }
  };

  this._trans = function(ctx, xx, yy, alpha, d) {
    var a = (alpha * Math.PI) / 180;

    var h = Math.round(d * Math.sin(a));
    var z = Math.round(d * Math.cos(a));

    var x1 = xx + z;
    var y1 = yy - h;

    ctx.lineTo(x1, y1);

    return [x1, y1];
  };

  this.render = function() {
    this.ctx.stroke();
  };
}