
import { Star } from "./star";


let component;

export class Universe {
  private canvas;
  private height;
  private width;
  private stars = [];
  //页面每秒刷新频率
  private fps = 60;
  private numStars = 0.002;
  private animFrameId:number;
  //定时绘制动画 FPS约为60
  private requestAnimFrame = (window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / this.fps);
    }).bind(window);
  private cancelAnimFrame = (window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame || window.clearTimeout).bind(window);
    
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    component = this;
  }

  public paintStars() {
    const context = this.canvas.getContext('2d');
    this.clearCanvas(context);
    this.animFrameId = this.requestAnimFrame(this.loop)
  }

  /**
   * 重新设置中心点以及偏移
   */
  public resetStars(width,height){
    
    this.stars = [];
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    // for(var i in this.stars){
    //   this.stars[i].setLocation(this.width, this.height);
    // }
  }

  private loop() {
    component.requestAnimFrame(component.loop);
    component.animate();
  }
  private loopStop() {
    if(this.animFrameId){
      this.cancelAnimFrame(this.animFrameId)
      this.animFrameId = null;
    }
  }
  private clearCanvas(ctx){
    this.stars = [];
    this.loopStop();
    ctx.clearRect(0, 0, this.width, this.height);
  }

  

  private animate() {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.width, this.height);

    
    for(let i = 0 ; i < 3 ; i++){
      this.stars.push(new Star(this.width, this.height, Math.random()));
    }
    
    for(let i = 0 ; i < this.stars.length ; i++){
      // if(this.stars[i].x > this.width || this.stars[i].y > this.height){
      //   this.stars.splice(i+1,1);
      //   continue;
      // }

      this.stars[i].draw(context, this.width, this.height);
    }
  }
}
