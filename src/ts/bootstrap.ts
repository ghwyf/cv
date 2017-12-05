// import _ from 'lodash';
import { Universe } from "./universe";


declare const require: any;
require('../sass/code.scss');


class BootStrap {
  private canvas = document.getElementById('space');
  private bg = new Universe(this.canvas, window.innerWidth, window.innerHeight);
  constructor() {
    console.log('bootstrap');
    this.bg.paintStars();
    this.screenAdjust();
  }

  /**
   * 浏览器缩放时触发函数
   */
  private screenAdjust() {
    let freshTime;
    let id;
    window.onresize = () => {
      this.bg.resetStars(window.innerWidth, window.innerHeight);
      // //去抖时间
      // const debounceTime = 500;
      // // const newTime = new Date().getTime();
      // // freshTime = newTime + debounceTime;

      // //
      // if (id) {

      // } else {
      //   //记录id
      //   id = setTimeout(() => {
      //     this.bg.paintStars();
      //     window.clearTimeout(id);
      //     id = null;
      //   }, debounceTime);
      // }
    };
  }
}


const boot = new BootStrap();

