
import f_check_IDno from '@/utils/regexp.js';
export default {
  form: {
    zjname: '',
    sex: '',
    papertype: '',
    papernumber: '',
    shengri: '',
    age: '',
    sfcode: '',
    cscode: '',
    adress: '',
    cellnum: '',
    landlinenum: '',
    email: '',
    minzu: '',
    youbian: '',
    jiguan: '',
    school: '',
    zhuanye: '',
    maxxueli: '',
    maxxuewei: '',
    gzdw: '',
    gzbegintime: '',
    gzbm: '',
    zhiwu: '',
    isinsystem: '',
    zhiji: '',
    zyzgdjStr: '',
    zyzgdj: '',
    isonjob: '',
    zhengshunumber: '',
    zigebegintime: '',
    workyear: '',
    tjdwmc: '',
    zhuanye: '',
    zyids: '',
    zpfile: [],
    sfzfile: [],
    gzfile: [],
    xlfile: [],
    sqqmfile: [],
    qtfjfile: []
  },
  rules: {
    zjname: [
      { required: true, message: '请填写姓名', trigger: 'blur' },
      { max: 63, message: '填写姓名过长', trigger: 'blur' }
    ],
    sex: [
      { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    papertype: [
      { required: true, message: '请选择证件类型', trigger: 'change' }
    ],
    papernumber: [
      { required: true, message: '请填写证件号', trigger: 'blur' },
      { validator: f_check_IDno, trigger: 'blur' }
    ],
    shengri: [
      { required: true, message: '请选择出生日期', trigger: 'blur' }
    ],
    age: [
      { required: true, message: '请填写年龄', trigger: 'blur' },
      { pattern: /^[0-9]\d*$/, message: '请输入正整数', trigger: 'blur' }
    ],
    workyear: [
      { pattern: /^[0-9]\d*$/, message: '从业年限为数字', trigger: 'blur' },
      { max: 2, message: '填写从业年限过长', trigger: 'blur' }
    ],
    sfcode: [
      { required: true, message: '请选择省', trigger: 'blur' }
    ],
    cscode: [
      { required: true, message: '请选择城市', trigger: 'blur' }
    ],
    adress: [
      { max: 255, message: '填写通讯地址过长', trigger: 'blur' }
    ],
    email: [
      { max: 63, message: '填写邮箱过长', trigger: 'blur' }
    ],
    youbian: [
      { max: 6, message: '填写邮编过长', trigger: 'blur' }
    ],
    jiguan: [
      { max: 63, message: '填写籍贯过长', trigger: 'blur' }
    ],
    byschool: [
      { max: 63, message: '填写毕业院校过长', trigger: 'blur' }
    ],
    zhuanye: [
      { max: 63, message: '填写所学专业过长', trigger: 'blur' }
    ],
    minzu: [
      { max: 31, message: '填写民族过长', trigger: 'blur' }
    ],
    maxxueli: [
      { max: 31, message: '填写最高学历过长', trigger: 'blur' }
    ],
    cellnum: [
      { required: true, message: '请填写手机号码', trigger: 'blur' },
      { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'blur' }
    ],
    landlinenum: [
      { max: 32, message: '填写办公电话过长', trigger: 'blur' }
    ],
    maxxuewei: [
      { max: 31, message: '填写最高学位过长', trigger: 'blur' }
    ],
    gzbm: [
      { max: 31, message: '填写工作部门过长', trigger: 'blur' }
    ],
    zhiwu: [
      { max: 31, message: '填写现任岗位（职务）过长', trigger: 'blur' }
    ],
    isinsystem: [
      { required: true, message: '请选择是否为系统内专家', trigger: 'change' }
    ],
    zhengshunumber: [
      { max: 31, message: '填写专业技术资格证书编号过长', trigger: 'blur' }
    ],
    gzdw: [
      { required: true, message: '请填写工作单位', trigger: 'blur' },
      { max: 254, message: '填写工作单位过长', trigger: 'blur' }
    ],
    gzbegintime: [
      { required: true, message: '请选择参加工作时间', trigger: 'blur' }
    ],
    zhiji: [
      { required: true, message: '请选择现任职级', trigger: 'blur' }
    ],
    zhicheng: [
      { required: true, message: '请选择职称名称', trigger: 'blur' },
      { max: 31, message: '填写职称名称过长', trigger: 'blur' }
    ],
    tjdwmc: [
      { required: true, message: '请填写推荐单位', trigger: 'blur' },
      { max: 256, message: '填写推荐单位过长', trigger: 'blur' }
    ],
    // sfzfile: [
    //   { required: true, message: '请上传身份证复印件', trigger: 'blur' }
    // ],
    // sqqmfile: [
    //   { required: true, message: '请上传手签签名', trigger: 'blur' }
    // ],
    zyids: [
      { required: true, message: '请选择申报专业', trigger: 'blur' }
    ]
  }
}