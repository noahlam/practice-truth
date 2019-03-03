<template>
  <div class="warp">

      <canvas ref="canvas"
              :width="winWidth"
              :height="winHeight"
              @mousedown="onStart"
              @mousemove="onMove"
              @mouseup="onEnd"
              class="mainCanvas"/>

  </div>
</template>

<style type="text/css" scoped>
  .mainCanvas{
    width: 100vw;
    height: 100vh;
    background: #e5e5e5;
  }
</style>

<script>
  export default {
    data () {
      return {
        ctx: null,
        bbox:{},
        winWidth: 300,
        winHeight: 300,
        currentPath: [], // 当前绘图路径
        isDrawing: false, // 绘图标记
      }
    },
    computed: {},
    mounted () {
      this.winWidth = document.documentElement.clientWidth;
      this.winHeight = document.documentElement.clientHeight;

      const canvas = this.$refs['canvas'];
      this.ctx = canvas.getContext("2d");
      this.bbox = canvas.getBoundingClientRect();
    },
    methods: {
      onStart (e) {
        const x = e.pageX
        const y = e.pageY
        this.currentPath.push({x,y})

        this.isDrawing = true;

        this.ctx.lineWidth = 1 ;
        this.ctx.strokeStyle= "#F00";

        const {left, top} = this.bbox;
        this.ctx.moveTo(x - left, y - top);
      },
      onMove (e) {
        if(!this.isDrawing) return

        const x = e.pageX
        const y = e.pageY
        this.currentPath.push({x,y})

        const {left, top} = this.bbox;
        this.ctx.lineTo(x - left, y - top);
        this.draw()
      },
      onEnd (e) {
        if(!this.isDrawing) return

        const x = e.pageX
        const y = e.pageY
        this.currentPath.push({x,y})

        const {left, top} = this.bbox;
        this.ctx.lineTo(x - left, y - top);

        this.draw()

        this.currentPath = []
        this.isDrawing = false;
      },

      draw () {
        this.ctx.stroke();
      },
      clearCanvas () {},

      // 判断是否在 某个矩形范围内
      isInRange (x1, y1, x2, y2, px, py) {
        return (x1 < px && px < x2) && (y1 < py && py < y2)
      },

      // 获取旋转角度
      getAngle (px, py, mx, my) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        let x = Math.abs(px - mx);
        let y = Math.abs(py - my);
        let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        let cos = y / z;
        let radina = Math.acos(cos);//用反三角函数求弧度
        let angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

        if (mx > px && my > py) {//鼠标在第四象限
          angle = 180 - angle;
        }

        if (mx === px && my > py) {//鼠标在y轴负方向上
          angle = 180;
        }

        if (mx > px && my === py) {//鼠标在x轴正方向上
          angle = 90;
        }

        if (mx < px && my > py) {//鼠标在第三象限
          angle = 180 + angle;
        }

        if (mx < px && my === py) {//鼠标在x轴负方向
          angle = 270;
        }

        if (mx < px && my < py) {//鼠标在第二象限
          angle = 360 - angle;
        }
        return angle;
      }
    }
  }

</script>
