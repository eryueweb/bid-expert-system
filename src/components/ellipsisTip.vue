<template>
  <div>
    <div v-if="isEllipsis">
      <el-tooltip v-if="type==='tooltip'" :content="content" :placement="placement" :effect="effect" popper-class="bid-ellipsis-tooltip">
        <div slot="content">{{ content }}</div>
        <div class="bid-ellipsis">{{ content }}</div>
      </el-tooltip>
      <div v-else class="bid-ellipsis" :title="content">{{ content }}</div>
    </div>
    <div ref="BidEllTipConMain" class="bid-ellipsis" v-else>{{ content }}</div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String | Number,
      default: ''
    },
    type: {
      type: String,
      default: 'tooltip'
    },
    placement: {
      type: String,
      default: 'top'
    },
    effect: {
      type: String,
      default: 'dark'
    }
  },
  data() {
    return {
      isEllipsis: false
    }
  },
  mounted() {
    const BidEllTipConMainEL = this.$refs.BidEllTipConMain;
    const vm = this;
    BidEllTipConMainEL.addEventListener('mouseover', function() {
      const scrollWidth = BidEllTipConMainEL.scrollWidth;
      const offsetWidth = BidEllTipConMainEL.offsetWidth;
      if (scrollWidth > offsetWidth) {
        vm.isEllipsis = true
      } else {
        vm.isEllipsis = false
      }
    })
  }
}
</script>
