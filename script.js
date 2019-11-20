window.onload = function() {
  var canvas = document.getElementById("spawner");
  var ctx = canvas.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  const imageURL = ["tree.png","map.png"];
  const images = [];
  var imageCount = 0;
  function allLoaded(){
      ctx.drawImage(images[1],0,0,images[1].width,images[1].height);
  }
  function drawTree(x,y){
      ctx.drawImage(images[0],x-15,y-15,images[0].width/8,images[0].height/8);
  }
  imageURL.forEach(src => {
       const image = new Image();
       image.src = src;
       image.onload = ()=>{ 
           imageCount += 1;
           if(imageCount === imageURL.length){
               allLoaded();
           }
       }
       
       images.push(image);

  });
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


$('#spawner').mousedown(function(e) {

    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    drawTree(x,y)
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    
});

};