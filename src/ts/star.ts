export class Star {
  private x;
  private y;
  private vx = 0;
  private vy = 0;
  private size;
  private growth;
  private opacity;
  private factor = 1;
  private increment = Math.random() * .03;
  constructor(x, y, opacity) {
    this.setLocation(x,y);
    this.size = Math.random() * 1;
    this.opacity = opacity;
  }


  public draw(context, width, height) {
   

    // Change the opacity
    if (this.opacity > 1) {
      this.factor = -1;
    }
    else if (this.opacity <= 0) {
      this.factor = 0.8;
    }
    this.opacity += this.increment * this.factor;
    this.size += this.growth;
    this.x += this.vx;
    this.y += this.vy;
    //星体移动增长率 1.008
    this.vx = this.vx*1.001;
    this.vy = this.vy*1.001;
    // this.length = 1;
    context.beginPath()
    context.arc(this.x, this.y, this.size,0*Math.PI,2*Math.PI);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
    context.shadowBlur = 1;
    context.shadowColor = '#ffff33';
    context.fill();
  }

  public setLocation(x,y){
     //屏宽中间
     this.x =  parseInt(x) / 2;
     //屏高中间上移 ，符合飞船视角
     this.y = parseInt(y) / 5 * 2;
     
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 2 - 1;
    
    this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.0001;
  }
}