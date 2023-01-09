width = 33;
height = 22;
scale = 20;
speed = 20;

canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');
canvas.width = width*scale;
canvas.height = height*scale;
ctx.setTransform(scale,0,0,-scale,0,canvas.height);
ctx.fillStyle = '#eee';

pieces = [
  {shape: 0, dir: 0, x: -1},
  {shape: 6, dir: 2, x: 1},
  {shape: 3, dir: 1, x: 0},
  {shape: 2, dir: 0, x: -1},
  {shape: 0, dir: 0, x: 4},
  {shape: 6, dir: 1, x: 2},
  {shape: 0, dir: 0, x: 6},
  {shape: 4, dir: 2, x: 8},
  {shape: 2, dir: 0, x: 8},
  {shape: 4, dir: 1, x: 4},
  {shape: 5, dir: 3, x: 7},
  {shape: 0, dir: 0, x: 11},
  {shape: 4, dir: 2, x: 16},
  {shape: 2, dir: 0, x: 14},
  {shape: 3, dir: 1, x: 12},
  {shape: 3, dir: 0, x: 10},
  {shape: 6, dir: 3, x: 12},
  {shape: 6, dir: 2, x: 19},
  {shape: 0, dir: 2, x: 22},
  {shape: 6, dir: 0, x: 16},
  {shape: 1, dir: 1, x: 14},
  {shape: 6, dir: 2, x: 25},
  {shape: 3, dir: 1, x: 23},
  {shape: 0, dir: 0, x: 28},
  {shape: 2, dir: 1, x: 25},
  {shape: 3, dir: 1, x: 18},
  {shape: 3, dir: 1, x: 20},
  {shape: 1, dir: 1, x: 17},
  {shape: 4, dir: 3, x: 2},
  {shape: 1, dir: 1, x: -1},
  {shape: 5, dir: 1, x: 9},
  {shape: 0, dir: 0, x: 30},
  {shape: 2, dir: 0, x: 23},
  {shape: 5, dir: 1, x: 23},
  {shape: 1, dir: 1, x: 20},
  {shape: 1, dir: 1, x: 4},
  {shape: 5, dir: 0, x: 6},
  {shape: 2, dir: 1, x: 11},
  {shape: 4, dir: 1, x: 27},
  {shape: 1, dir: 1, x: 27},
  {shape: 5, dir: 2, x: 15},
  {shape: 1, dir: 0, x: 1},
  {shape: 5, dir: 0, x: 6},
  {shape: 4, dir: 0, x: 10},
  {shape: 5, dir: 0, x: 15},
  {shape: 6, dir: 0, x: 20},
  {shape: 4, dir: 0, x: 24},
  {shape: 3, dir: 0, x: 29}
];
nextPiece = 0;

shapes = [[
    [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0]
  ],[
    [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]
  ],[
    [0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0]
  ],[
    [0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,1]
  ],[
    [0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
    [0,0,0,0,0,0,1,0,0,0,1,0,0,1,1,0]
  ],[
    [0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0],
    [0,0,0,0,0,1,1,0,0,0,1,0,0,0,1,0]
  ],[
    [0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0],
    [0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,0]
  ]
];

function newFalling(){
  if(nextPiece<pieces.length){
    falling = {
      shape: pieces[nextPiece].shape,
      dir: 0,
      x: Math.floor(width/2)-1,
      y: height,
      placed: false
    };
    falling.move = pieces[nextPiece].x-falling.x;
    falling.rotate = pieces[nextPiece].dir;
    nextPiece++;
  }else{
    falling = false;
  }
}

function forEachFallingBlock(fn){
  forEachCellInGrid(falling.x,falling.y,falling.x+4,falling.y+4,function(x,y,i){
    if(shapes[falling.shape][falling.dir][i]){
      fn(x,y);
    }
  });
}

function forEachCellInGrid(x,y,x2,y2,fn){
  var x1,i = 0;
  for(;y<y2;y++){
    for(x1=x;x1<x2;x1++){
      fn(x1,y,i);
      i++;
    }
  }
}

function rotate(){
  falling.dir = (falling.dir+1)%shapes[falling.shape].length;
  falling.rotate--;
}

function right(){
  falling.x++;
  falling.move--;
}

function left(){
  falling.x--;
  falling.move++;
}

function placeBlock(x,y){
  map[y*width+x] = 1;
}

function place(){
  var x,y,i;
  i=0;
  forEachFallingBlock(placeBlock);
}

function stepFallingBlock(x,y){
  ctx.fillRect(x,y,1,1);
  if(y===0 || map[(y-1)*width+x]){
    falling.placed = true;
  }
}

function drawMapCell(x,y,i){
  if(map[i]){
    ctx.fillRect(x,y,1,1);
  }
}

remove = {
  status: 0,
  row: 0
};

function loop(){
  var i,x,y,options;
  ctx.clearRect(0,0,width,height);
  forEachCellInGrid(0,0,width,height,drawMapCell);
  if(remove.status){
    if(remove.status==1){
      map.splice(remove.row*width,width);
    }else if(remove.status%2===0){
      ctx.clearRect(0,remove.row,width,1);
    }else{
      ctx.fillRect(0,remove.row,width,1);
    }
    remove.status--;
  }else{
    if(falling){
      options = [];
      if(falling.move>0){
        options.push(right)
      }else if(falling.move<0){
        options.push(left)
      }
      if(falling.rotate>0){
        options.push(rotate)
      }
      if(options.length>0){
        options[Math.floor(Math.random()*(options.length-0.8))]();
      }
      forEachFallingBlock(stepFallingBlock);
      if(falling.placed){
        place();
        newFalling();
      }else{
        falling.y--;
      }
    }
    for(i=0;i<map.length;i+=width){
      for(var j=0;j<width;j++){
        if(!map[i+j]){
          return;
        }
      }
      if(j==width){
        remove.status = 6;
        remove.row = i/width;
        return;
      }
    }
  }
}

map = [];
for(i=0;i<height*width;i++){
  map[i] = 0;
}

newFalling();
setInterval(loop,speed);