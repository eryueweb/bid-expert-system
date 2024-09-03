const zhichengObj = {'1':'教授级高级工程师','2':'副教授高级工程师','3':'教授','4':'副教授','5':'研究员',
'6':'研究员级高级工程师','7':'高级工程师','8':'高级经济师','9':'高级统计师','10':'高级会计师'
,'11':'高级技师','12':'高级职业经理人','13':'高级审计师','14':'高级讲师','15':'高级政工师',
'16':'工程师','17':'同等水平','18':'经济师','19':'会计师'};
const zhijiObj = {'1':'集团总师（助理）级','2':'集团部门正主任级','3':'集团部门副主任（主任级）','4':'集团公司副主任级'
,'5':'集团部门主任师级','6':'正厂处级','7':'副厂处级','9':'二线领导','8':'其他'};
const zhichengList = [];
const zhijiList = [];
Object.keys(zhichengObj).forEach(key => {
  zhichengList.push({
    key,
    value: zhichengObj[key]
  })
});
Object.keys(zhijiObj).forEach(key => {
  zhijiList.push({
    key,
    value: zhijiObj[key]
  })
});
export default {
  zhichengList,
  zhijiList,
  zhichengObj,
  zhijiObj
}