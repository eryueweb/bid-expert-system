class loginFormConfig{
  constructor(){
    this.ruleForm = {
      // 监督人：
      // 130181198709296785王莎
      // 110107198512290040胡婕
      // 协评: 231021197306132936 尹黎明
      // 清标: 371082198110300019 张壮 
      // 密码：  chdtp678

      //       专家库
      // http://10.101.128.91/expertym/lu.jsp
      // 账号：13108219760708077x
      // 密码：08077x
      //       监督库
      // http://10.101.128.91/supervisor/lu.jsp
      // 账号：420984198507086319
      // 密码：086319

      //专家
      // 艾辉230106197404291210   
      // 艾长松230107196305210819  
      // 邓艾 522324199006085618 
      // 安洋 211202198207052773  
      // 王国美 532233197312230821
      // 王震 320402197008150216
      username: "110107198512290040", 
      password: "chdtp678",
      checkCode: ''
    };
  }
  get rules(){
    return {
      username: [
        { required: true, message: '请输入身份证号码', trigger: 'blur' },
        { pattern: /^[1-9]\d*[Xx]?$/, message: '请输入正确的身份证号', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
      // checkCode: [
      //   { required: true, message: '请输入验证码', trigger: 'blur' }
      // ]
    }
  }
}
export default new loginFormConfig();