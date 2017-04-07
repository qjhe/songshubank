define(function(require,exports) {
	
//数据验证
exports.emailR=function(value,callback){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	var vm_ = reg.test(value);
	if(!vm_) callback&&callback();
	return vm_;
}
//手机验证规
exports.mobile = function(value,callback){
	var mobile = /^1[3|4|5|7|8]\d{9}$/;	
	//return this.optional(element) || (mobile.test(value));
	var vm_ = mobile.test(value);
	if(!vm_) callback&&callback();
	return vm_;
}
exports.isLetter = function(val,callback){//验证纯字母
	var regExp = /^([a-zA-Z]+)$/;
	return regExp.test(val);
}
exports.vLength = function(val,callback){//验证是密码长度
	return (val.length<6||val.length>18)?false:true;
}
exports.isNum = function(val){//验证纯数字
	var regExp = /^(\d+)$/;
	return regExp.test(val);
}
exports.isSpace = function(val){//验证是否有空格
	var regExp = /\s/;
	return regExp.test(val);
}
exports.isEmpty = function(val,callback){//是否为空
	var vm_ = (val=="");
	if(vm_) callback&&callback()
	return !vm_;
}
exports.vLength = function(val){//验证是密码长度
	return (val.length<6||val.length>18)?false:true;
}
exports.vPwd = function(val,callback){//统一验证密码格式 非空 不包含空格 不能纯数字||纯字母 的6~18位字符串
	var regExp1 = /^([a-zA-Z]+)$/,
		regExp2 = /^(\d+)$/,
		regExp3 = /\s/;	
	var vm_ = (!regExp1.test(val))&&(!regExp2.test(val))&&(!regExp3.test(val))&&(!(val.length<6||val.length>18))&&(!val=="");
	if(!vm_) callback&&callback();
	return vm_;
}
exports.vEqualTo = function(valO,valT,callback){
	var vm_ = (valO===valT)&&valO!=""&&valT!="";
	if(!vm_) callback&&callback();
	return vm_;
}
exports.vUnEqualTo = function(valO,valT,callback){
	var vm_ = (valO!==valT)&&valO!=""&&valT!="";
	if(!vm_) callback&&callback();
	return vm_;
}
exports.pIden = function(val,code,callback){//短信验证码 验证
	var vm_ = false;
	vm_ = (val===code);
	if(!vm_) callback&&callback();
	return vm_;
}
exports.vIdentityCodeValid = function(code,callback) { 
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	var tip = "";
	var pass= true;
	
	if(!code || !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(code)){
		tip = "身份证号格式错误";
		pass = false;
	}
	
   else if(!city[code.substr(0,2)]){
		tip = "地址编码错误";
		pass = false;
	}
	else{
		//18位身份证需要验证最后一位校验位
		if(code.length == 18){
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			//校验位
			var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++)
			{
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]){
				tip = "校验位错误";
				pass =false;
			}
		}
	}
	if(!pass)  callback&&callback(); //alert(tip);
	return pass;
}

//提示信息
exports.fnInfo = function(oInfo,sInfo)
{
	$(oInfo).html(sInfo).addClass("active");
	setTimeout(function(){
		$(oInfo).removeClass("active");
	},2000);
}


})