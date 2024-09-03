<template>
  <el-dialog
    v-if="dialogVisible"
    title="专业分类"
    custom-class="bid-el-dialog"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible">
    <div>
      <el-tree
        ref="treeRef"
        node-key="id"
        :props="props"
        :load="getTreeList"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
        lazy
        show-checkbox></el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toCancle">取 消</el-button>
      <el-button type="primary" @click="toSelect">选 择</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  getZyflListByParentId
} from '@/api/registerApi.js'
export default {
  data() {
    return {
      dialogVisible: false,
      defaultCheckedKeys: [],
      defaultExpandedKeys: [],
      checkedSpecialityList: [],
      checkedWayStr: '',
      props: {
        label: 'zyname',
        isLeaf: (data, node) => {
          const {
            isleaf
          } = data;
          if (isleaf === '1') {
            return true
          } else {
            return false
          }
        }
      }
    }
  },
  methods: {
    getCheckedWayStr() {
      const {
        checkedSpecialityList
      } = this;
      const checkedWayArr = checkedSpecialityList.map(item => {
        return item.way
      });
      this.checkedWayStr = checkedWayArr.join(',');
    },
    toSelect() {
      const checkedNodes = this.$refs.treeRef.getCheckedNodes(true);
      const checkedKeys = this.$refs.treeRef.getCheckedKeys(true);
      if (checkedNodes.length) {
        if (checkedNodes.length > 8) {
          this.$message.warning('申报专业不能超过8个！');
          return;
        }
        this.$emit('displaySpecialiity', checkedNodes, checkedKeys);
        this.toCancle();
      } else {
        this.$message.warning('请选择最底层专业,否则无法保存！');
      }
    },
    toCancle() {
      this.dialogVisible = false;
    },
    show(list) {
      this.dialogVisible = true;
      this.defaultCheckedKeys = [];
      this.checkedSpecialityList = list;
      this.defaultExpandedKeys = [];
      this.getCheckedWayStr();
    },
    getTreeList(node, resolve) {
      const {
        level,
        data
      } = node;
      const {
        checkedWayStr
      } = this;
      if (level === 0) {
        this.getSpecislity({}, data => {
          data.forEach(item => {
            const {
              way,
              id,
              isleaf
            } = item;
            if (checkedWayStr.indexOf(way) > -1 && isleaf !== '1') {
              this.defaultExpandedKeys.push(id)
            }
            if (checkedWayStr.indexOf(way) > -1 && isleaf === '1') {
              this.defaultCheckedKeys.push(id);
            }
          });
          return resolve(data)
        })
      } else {
        const {
          id
        } = data;
        this.getSpecislity({ 
          parentId: id
        }, data => {
          data.forEach(item => {
            const {
              way,
              id,
              isleaf
            } = item;
            if (checkedWayStr.indexOf(way) > -1 && isleaf !== '1') {
              this.defaultExpandedKeys.push(id)
            }
            if (checkedWayStr.indexOf(way) > -1 && isleaf === '1') {
              this.defaultCheckedKeys.push(id);
            }
          });
          return resolve(data)
        })
      }
    },
    getSpecislity(params, callback) {
      if (!params) params = {};
      getZyflListByParentId.bind(this)(params).then(res => {
        callback(res.data)
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