const montainh = 0.65;
const landh = 0.45;

class map{
  constructor(seed, w, h, scale, chunksize, border)
  {
    this.border = border;
    
    this.seed = {value : seed, scale : scale};
    this.size = { width : w + border, height : h + border, chunksize : chunksize};
    this.chunks = [];
    this.mapbg = createGraphics(this.size.width, this.size.height);
    this.chunkfg = createGraphics(this.size.width, this.size.height);
  }
  
  makechunks()
  {
    let wc = (this.size.width - 20) / this.size.chunksize, hc = (this.size.height - 20) / this.size.chunksize;
    
    if(this.seed.value >= 0)
    {
      noiseSeed(this.seed.value);
      randomSeed(this.seed.value);
    }
    
    for(let x = 0; x < wc; x++)
    {
      this.chunks[x] = [];
      for(let y = 0; y < hc; y ++)
      {
        this.chunks[x][y] = noise(x * this.seed.scale * this.size.chunksize, y * this.seed.scale * this.size.chunksize)
      }
    }
    
    drawmontains(this.chunks, this.chunkfg, this.size.chunksize, 10, 10);
  }
  
  makemapbg()
  {
     if (this.seed.value >= 0) {
       noiseSeed(this.seed.value);
     }
      
     this.mapbg.loadPixels();
     for (let x = 0; x < this.size.width; x++) 
     {
       for (let y = 0; y < this.size.height; y++) 
       {
         let n;
         let col;
          
         //generates the map as is
         if(x > this.border/2 && x < this.size.width - this.border/2 && y > this.border/2 && y < this.size.height - this.border/2)
         {
           n = noise(x * this.seed.scale, y * this.seed.scale);
           
           if((x + this.border/2) % this.size.chunksize == 0 || (y + this.border/2) % this.size.chunksize == 0)
           {
             col = color('#6C4F40');
           }
           else if (n > landh) 
           {
             col = color('#E5D6BB');
           } 
           else if (n > landh - 0.015) 
           {
             col = color('#6C4F40');
           } 
           else
           {
             if(y % 3 == 0)
             { col = color('#D0B695'); }
             else
             { col = color('#BFA584'); }
           }
       
           
         }
         //generates a "oaky" appearance to the "table" background
         else
         {
           n = noise(x * 0.02, y * 0.02);
           
           if (n > 0.495 || n < 0.4575) 
           {
             col = color('#E5D6BB'); 
           }
           else
           {
             col = color('#BFA584');
           }
           
         }
         
         let index = (x + y * this.size.width) * 4;
         this.mapbg.pixels[index + 0] = red(col);
         this.mapbg.pixels[index + 1] = green(col);
         this.mapbg.pixels[index + 2] = blue(col);
         this.mapbg.pixels[index + 3] = 255;
       }
     }
     this.mapbg.updatePixels(); 
     
     this.mapbg.stroke('#6C4F40');
     this.mapbg.strokeWeight(4);
     this.mapbg.noFill();
     this.mapbg.rect(10, 10, this.size.width - 20, this.size.height - 20);
  }
}

function drawmontains(chunk, fg, size, xoff, yoff)
{
  fg.fill('#D0B695');
  fg.stroke('#6C4F40');
  
  for(let x = 0; x < chunk.length; x ++)
  {
    for(let y = 0; y < chunk[x].length; y ++)
    {
      if(chunk[x][y] > montainh)
      {
        for (let i = 0; i < 5; i++) 
        {
          let cx = random(4, 12) * size / 16; //triangle X center
          let cy = 4 + i * 2 * size / 16;     //triangle Y center
          let s = random(3, 4.5) * size / 16; //triangle size
          
          let cposx = x * size;   //X pos of the chunk
          let cposy = y * size;   //Y pos of the chunk
          
          fg.triangle(
            xoff + cposx + cx - s, yoff + cposy + cy + s,
            xoff + cposx + cx,     yoff + cposy + cy - s,
            xoff + cposx + cx + s, yoff + cposy + cy + s
          );
        }
      }
    }
  }
}
