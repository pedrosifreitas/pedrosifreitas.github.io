let gmap;
let hudscale = 85;

function setup() 
{
  
  createCanvas(1280, 720);
  
  gmap = new map(
    -1,
    640, 360,
    0.015,
    20,
    20
  );

  gmap.makechunks();
  gmap.makemapbg();
  
  textFont('Courier New');
  
  document.title = "The Wanderers of the Mundus: " + RandomTitle(); 
  
  noSmooth();
}

function draw() 
{
  background(0);
  image(gmap.mapbg, width * (100 - hudscale)/100, height * (100 - hudscale)/100, width * hudscale/100, height * hudscale/100);
  image(gmap.chunkfg, width * (100 - hudscale)/100, height * (100 - hudscale)/100, width * hudscale/100, height * hudscale/100);
  
  let loc = "";
  let x = "";
  let y = "";
  if(mouseX >  width * (100 - hudscale)/100 + gmap.border/2 && mouseX <  width - gmap.border/2)
  {
    if(mouseY >  height * (100 - hudscale)/100 + gmap.border/2 && mouseY <  height - gmap.border/2)
    {
      x = mouseX - width * (100 - hudscale)/100 + gmap.border/2;
      y = mouseY - height * (100 - hudscale)/100 + gmap.border/2;
      
      x = ceil(gmap.size.width/width * x/gmap.size.chunksize) - 1;
      y = ceil(gmap.size.height/height * y/gmap.size.chunksize) - 1;
      
      let h = gmap.chunks[x][y];
      
      if(h >= montainh)
      {
        loc = "Montains";
      }
      else if(h >= landh)
      {
        loc = "Firm Land";
      }
      else
      {
        loc = "Water";
      }
    }
  }
  
  fill(255);
  text("(" + x + ", " + y + "): " + loc, 10, height - 20);
}
