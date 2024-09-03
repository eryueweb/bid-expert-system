export const regexp = {
  mobile: /^1\d{10}$/
};
/* 
功能：验证身份证号码是否有效 
提示信息：未输入或输入身份证号不正确！ 
f_check_IDno(rule, value, callback)
返回：bool 
*/
export default function f_check_IDno(rule, value, callback) {     
  let aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};    
    
  let iSum = 0; 
  let strIDno = value;    
  let idCardLength = strIDno.length;      
  if (!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno)) {    
    callback("请填写正确身份证号");
    return false;
  }
  //在后面的运算中x相当于数字10,所以转换成a    
  strIDno = strIDno.replace(/x$/i,"a");    
  
  if (aCity[parseInt(strIDno.substr(0,2))]==null) {    
    // callback("非法地区");
    callback("请填写正确身份证号");
    return false; 
  }    
      
  if (idCardLength==18) {    
    let sBirthday = strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));    
    let d = new Date(sBirthday.replace(/-/g,"/"))    
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){           
      // callback("非法生日");  
      callback("请填写正确身份证号");  
      return false;    
    }    

    for (let i = 17;i>=0;i --) {
      iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11); 
    }   

    if (iSum%11!=1) {    
      callback("请填写正确身份证号");    
      return false;    
    }    
  } else if (idCardLength==15) {    
    let sBirthday = "19" + strIDno.substr(6,2) + "-" + Number(strIDno.substr(8,2)) + "-" + Number(strIDno.substr(10,2));    
    let d = new Date(sBirthday.replace(/-/g,"/"))    
    let dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();       
    if (sBirthday != dd) {    
      // callback("非法生日");    
      callback("请填写正确身份证号");
      return false;    
    }    
  }    
  callback();    
}