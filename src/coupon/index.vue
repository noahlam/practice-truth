<template>
  <div :style="wrapStyle" class="couponWrap">
    <!--临时 slot-->
    <div class="couponSlot" style="display: none;">
      <slot></slot>
    </div>

    <!--主体-->
    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <!--定义卡券轮廓-->
      <defs>
        <path id="path" :d="couponPath"/>
      </defs>
      <!--定义拆切路径-->
      <defs>
        <clipPath id="clipPath">
          <use xlink:href="#path"></use>
        </clipPath>
      </defs>
      <!--画一个轮廓出来-->
      <use xlink:href="#path"
           style="shape-rendering: geometricPrecision;"
           :stroke="c.borderColor"
           :stroke-width="c.borderWidth"
           :stroke-opacity="c.borderOpcity"
           :stroke-dasharray="c.borderDash"
           :fill="c.background"
      />
      <!--插入 slot 内容-->
      <foreignObject width="100%" height="100%" ref="foreignObject" clip-path="url(#clipPath)"></foreignObject>
      <!--中线-->
      <line  v-if="c.showLine"
             :x1="c.cutRadius * c.cutSlope * 0.735 + c.lineOffset"
             :y1="c.cutPosition"
             :x2="c.width - c.cutRadius * c.cutSlope * 0.735 - c.lineOffset"
             :y2="c.cutPosition"
             :stroke="c.lineColor || c.borderColor"
             :stroke-width="c.lineWidth || c.borderWidth"
             :stroke-opacity="c.lineOpcity || c.borderOpcity"
             :stroke-dasharray="c.lineDash || c.borderDash"/>
    </svg>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        c: {
          borderRadius: 15,
          borderColor: '#e16191',
          borderWidth: 0.5,
          borderOpcity: 1,
          borderDash: null,
          showLine: true,
          lineColor: '#e16191',
          lineWidth: 0.4,
          lineOpcity: 1,
          lineDash: [3, 5],
          lineOffset: 0,
          width: 200,
          height: 300,
          cutPosition: 200,
          cutRadius: 10,
          cutSlope: 1.5,
          background: '#f5f5f5',
        },
      }
    },
    props: {
      config: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      wrapStyle () {
        return {
          overflow: 'hidden',
          width: this.c.width + 'px',
          height: this.c.height + 'px',
          borderRadius: this.c.borderRadius + 'px'
        }
      },
      couponPath() {
        let c = this.c
        return `M${c.borderRadius} 0
                h${c.width - 2 * c.borderRadius}
                s ${c.borderRadius} 0 ${c.borderRadius} ${c.borderRadius}
                v${c.cutPosition - c.borderRadius - c.cutRadius}
                c -${c.cutRadius * c.cutSlope} 0 -${c.cutRadius * c.cutSlope} ${c.cutRadius * 2} 0 ${c.cutRadius * 2}
                v${c.height - c.cutPosition - c.borderRadius - c.cutRadius}
                s 0 ${c.borderRadius} -${c.borderRadius} ${c.borderRadius}
                h-${c.width - 2 * c.borderRadius}
                s-${c.borderRadius} 0 -${c.borderRadius} -${c.borderRadius}
                v-${c.height - c.cutPosition - c.borderRadius - c.cutRadius}
                c${c.cutRadius * c.cutSlope} 0 ${c.cutRadius * c.cutSlope} -${c.cutRadius * 2} 0 -${c.cutRadius * 2}
                v-${c.cutPosition - c.borderRadius - c.cutRadius}
                s0-${c.borderRadius} ${c.borderRadius} -${c.borderRadius}
                z`
      }
    },
    methods: {
      renderDom() {
        let content = document.querySelector('.couponSlot').children[0]
        content.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
        this.$refs.foreignObject.appendChild(content)
      }
    },
    created () {
      this.c = Object.assign(this.c, this.config)
    },
    mounted() {
      this.renderDom()
    }

  }
</script>
