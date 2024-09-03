<template>
  <div class="result-wrapper">
    <div class="result-main">
      <div class="result-top">
        <div style="display: flex;align-items: center;gap:10px;">
          <i class="el-icon-circle-check" style="color:#19BE6B;font-size:26px;font-weight: bold;"></i><span class="top-t">信息提交成功，等待审核！</span>
        </div>
        <div class="top-tip">注册信息审核结果，以手机短信通知，请关注手机信息，耐心等候。</div>
      </div>
      <div class="result-pro">
        <div style="margin-bottom: 20px;">专家注册进度</div>
        <el-table
          :header-cell-style="{background:'#f6f9fe',color:'#909399','font-weight':'bold'}"
          border
          :data="proTableData">
          <el-table-column
            label="专家姓名"
            prop="zjName"
            align="center"
            width="120px">
          </el-table-column>
          <el-table-column
            label="工作单位"
            prop="gzdwName"
            align="center"
            min-width="120px">
            <template slot-scope="{row}">
              <EllipsisTip :content="row.gzdwName"></EllipsisTip>
            </template>
          </el-table-column>
          <el-table-column
            label="职称名称"
            prop="zcName"
            align="center">
            <template slot-scope="scope">
              <div>{{ zhichengObj[scope.row.zcName] }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号码"
            prop="phone"
            align="center"
            width="130px">
          </el-table-column>
          <el-table-column
            label="证件号"
            prop="sfzh"
            align="center"
            width="180px">
          </el-table-column>
          <el-table-column
            label="注册状态"
            prop="zczt"
            align="center"
            width="120px">
            <template slot-scope="scope">
              <!-- <div style="color:rgb(0, 91, 172);font-weight:bold;">{{ scope.row.zczt }}</div> -->
              <div>
                <el-button type="text" @click="toPersonalInfo">{{ scope.row.zczt }}</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  findReviewProgress
} from '@/api/registerApi.js';
import listData from '@/views/personalInfoView/listData.js';
export default {
  data() {
    return {
      proTableData: [],
      isLoading: false,
      zhichengObj: listData.zhichengObj
    }
  },
  created() {
    this.getExpertsPro();
  },
  methods: {
    toPersonalInfo() {
      this.$router.push({
        name: 'personalInfo',
        query: this.$route.query
      })
    },
    getExpertsPro() {
      const {
        phone
      } = this.$route.query;
      findReviewProgress.bind(this)({
        phone
      }, 'isLoading').then(res => {
        // console.log(res);
        this.proTableData.push(res.data)
      }).catch(rej => {
        if (rej.header && rej.header.ret === 1) {
          this.$message({
            type: "error",
            showClose: true,
            message: rej.header.msg
          });
        } else {
          console.log(rej)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.result-wrapper {
  display: flex;
  justify-content: center;
  .result-main {
    width: 1060px;
    .result-top {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 36px;
      padding: 20px 0 40px;
      border: 1px solid rgba(247, 250, 253, 1);
      .top-t {
        color: rgb(102, 102, 102);
        font-size: 20px;
        font-weight: bold;
      }
      .top-tip {
        color: rgb(127, 127, 127);
        font-size: 14px;
        margin-top: 20px;
      }
    }
    .result-pro {
      margin-top: 60px;
      text-align: center;
      color: rgb(102, 102, 102);
      font-size: 14px;
    }
  }

}
</style>