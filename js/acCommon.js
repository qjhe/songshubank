// JavaScript Document
define(function(require,exports) {

//我要理财
exports.tNavList = function(){
	$(".ac-nav-list li").each(function(i, e) {
		$(this).hover(function(){
			$(this).addClass("active").find("ol").show();
			$(this).find(".triangle_bottom_orange").addClass("triangle_top_orange");
		},function(){
			$(this).removeClass("active").find("ol").hide();
			$(this).find(".triangle_bottom_orange").removeClass("triangle_top_orange");})
	});	
}

//账户中心导航
exports.acNav = function(){
	var oLi = $(".user-nav-wrap li");
	$(oLi).each(function(i, e) {
		if(!$(this).hasClass("active")){
			$(this).hover(function(){
				$(this).addClass("active");	
			},function(){
				$(this).removeClass("active");	
			})
		}
	});
}

//关于我们导航1646
exports.auNav = function(){
	
	$(".ab_nav ul li").on("click",function(){
		$(this).addClass("active").siblings("li").removeClass("active");
	})
}

//我的账户
exports.userArea = function(){
	var oUserW = $(".user-ac-list");
	$(oUserW).hover(function(){
		$(this).addClass("active").find(".user-ac-u").stop().slideDown();	
		$(this).find("em").addClass("triangle_top_orange");
	},function(){
		$(this).removeClass("active").find(".user-ac-u").stop().slideUp();		
		$(this).find("em").removeClass("triangle_top_orange");
	})	
}

//选择 周/月
exports.tjType = function(callback){
	var oI = $(".uc-type i");
	$(oI).each(function(i, e) {
		$(this).click(function(){
			var oIC = $(oI).removeClass("active").eq(i).addClass("active").data("type"); 
			callback&&callback(oIC);
		})
	});	
}

exports.tjTypeinterColor = function(className,color){
	$("."+className+" tr:even td").css("background-color",color);  //改变偶数行背景色*/
	$("."+className+" tr:even").attr("bg",color);
	$("."+className+" tr:odd").attr("bg","#fff");
}

/**
 * 隔行换色
 */
exports.interColor = function(className,color,color2){
	$("."+className+" tr:even td").css("background-color",color);  
	if(color2){$("."+className+" tr:odd td").css("background-color",color2); } //改变偶数行背景色*/
	$("."+className+" tr:even").attr("bg",color);
	$("."+className+" tr:odd").attr("bg","#fff");
}

//头部导航
exports.setAcTit = function(index_){
	index_ = index_.replace(/[^\d]/g,"");
	$(".user-nav-wrap li").removeClass("active").eq(index_).addClass("active");
}

//收益计算 Amount:投资总额 年化利率:Rate 月份:Mon
exports.profitPri = function(Amount,Rate,Mon,type){
	if(Amount<1) return "0";
	var Amoney = type == "月" ? parseFloat(parseInt(Amount)*(parseFloat(Rate))*parseInt(Mon)/12)/100 : parseFloat(parseFloat(Amount)*(parseFloat(Rate))*parseInt(Mon)/365)/100;
	return exports.formatMoney(Amoney);
}

//格式化货币
exports.formatMoney = function(s){
	s = (s+"").replace(",","");
	if(s == null) return "0.00";
	if(/[^0-9\.]/.test(s)) return "格式错误";
	s=s.replace(/^(\d*)$/,"$1.");
	s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
	s=s.replace(".",",");
	var re=/(\d)(\d{3},)/;
	while(re.test(s))
			s=s.replace(re,"$1,$2");
	s=s.replace(/,(\d\d)$/,".$1");
	//return "￥" + s.replace(/^\./,"0.")
	return s.replace(/^\./,"0.")
}

/**
* 时间格式化 如：formatDate("2010-04-30", "yyyy-MM-dd HH:mm:ss")
*/
exports.formatDate = function(date, format) { 
	if (!date) return "";   
	if (!format) format = "yyyy-MM-dd HH:mm:ss";   
	switch(typeof date) {   
		case "string":   
			date = new Date(date.replace(/-/g, "/"));   
			break;   
		case "number":   
			date = new Date(date);   
			break;   
	}    
	if (!date instanceof Date) return "";   
	var dict = {   
		"yyyy": date.getFullYear(),   
		"M": date.getMonth() + 1,   
		"d": date.getDate(),   
		"H": date.getHours(),   
		"m": date.getMinutes(),   
		"s": date.getSeconds(),   
		"MM": ("" + (date.getMonth() + 101)).substr(1),   
		"dd": ("" + (date.getDate() + 100)).substr(1),   
		"HH": ("" + (date.getHours() + 100)).substr(1),   
		"mm": ("" + (date.getMinutes() + 100)).substr(1),   
		"ss": ("" + (date.getSeconds() + 100)).substr(1)   
	};       
	return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {   
		return dict[arguments[0]];   
	});                   
} 

//展开二维码
exports.getBoQr = function(){
	$("#headQr em").click(function(){
		$("#headQr").hide();
		$(".meba-qr").hide();
	})
	$(".weixin").on("click",function(){
		$("#headQr").show();
		$(".meba-qr").show();
		return false;
	})
}

//备注展示
exports.remarks=function(){
	$(".stateNote").on("click",function(){
		if($(this).parent().parent().siblings().find(".detaiWrap").hasClass("disNon")){
			$(this).parent().parent().siblings().find(".detaiWrap").removeClass("disNon");
			$(this).addClass("check").children(".stateNoteIcon").addClass("check");
			$(this).parent().parent().siblings().find(".detaiBox").show();
			
		}else{
			$(this).parent().parent().siblings().find(".detaiWrap").addClass("disNon");
		}
	})
	
	$(".detaiBox .detaiBtn").on("click",function(){
			  $(".stateNote").removeClass("check").children(".stateNoteIcon").removeClass("check");
				$(this).parent().parent().hide();
	})
}

//tab切换
exports.fnTab =function(oNav,aCon,cLass,callback){
	var aElem=aCon.children();
	var oElem=oNav.children();
	
	aCon.hide().eq(0).show();
	
	oElem.each(function(index, element) {
		if(cLass=='click'){
				$(this).click(function(){
					aElem.hide().eq(index).show();
					oElem.removeClass("active").eq(index).addClass("active");
					//执行回调方法
					callback&&callback();
				});
			}
		if(cLass=='hover'){
				$(this).hover(function(){
					aElem.hide().eq(index).show();
					oElem.removeClass("active").eq(index).addClass("active");
					//执行回调方法
					callback&&callback();
				},function(){});
			}
	});
}

//状态切换
exports.statSelet=function(callback){
	//投资类型选择
	$(".list_tab_check a").on("click",function(){
		$(this).addClass("check").parent().siblings().children("a").removeClass("check");
		//执行回调方法
		callback&&callback();
	})
	//投资状态选择
	$(".ac-tab-btn a").on("click",function(){
		$(this).addClass("active").parent().siblings().children("a").removeClass("active");
		//执行回调方法
		callback&&callback();
	})
}

//我要借款 收缩 2016-1-15 
exports.showHide=function(){
	$(".myloanBtn1").on("click",function(){
		if($(this).children("em").hasClass("iconTopUp")){
			$(this).children("em").removeClass("iconTopUp");
			$(this).parent().parent().siblings(".detail-list").find(".detail-list-ul").stop().slideUp();
		}else{
			$(this).children("em").addClass("iconTopUp");
			$(this).parent().parent().siblings(".detail-list").find(".detail-list-ul").stop().slideDown();
		}
	})
}
exports.abshowHide=function(){
	$(".annousItem").on("click",function(){// h3 .la_date
		var _this=$(this).children("h3").children(".la_date");
		var el=""
		if(_this.children("em").hasClass("ab_icon2")){
			_this.children("em").removeClass("ab_icon2");
			_this.parent().removeClass("active");
			_this.parent().siblings(".annousCont").stop().slideUp();
		}else{
			_this.children("em").addClass("ab_icon2");
			_this.parent().addClass("active");
			el=_this.parent().parent().parent().siblings().children(".annousItem");
			el.children("h3").children(".la_date").children("em").addClass("ab_icon2");
			el.click();
			// _this.parent().parent().parent().siblings().find(".annousCont").stop().slideUp().siblings("h3").removeClass("active").children(".la_date").children("em").removeClass("ab_icon2");
			_this.parent().siblings(".annousCont").stop().slideDown();
		}
	})
}
//居中居左
exports.layOut=function(){
	var ali =$(".boin-con-box .boin-con-item .boin-item-cont");
	var totWid =ali.width();
	
	$(ali).each(function(){
		var onwi=$(this).find(".rewardBox").outerWidth();
		var boxWid=$(this).find(".rewardBox").length*($(this).find(".rewardBox").outerWidth());
		var cha =totWid-boxWid;
		if(boxWid>totWid || cha<onwi){$(this).css("text-align","left")}
	})
}

//安全中心 安全等级提示 效果
exports.pwdSafe = function(obj){
	var pwdSL=$(obj).data("num_color")+"%";
	$(obj).animate({width: pwdSL}, 'slow');
}

//借款支付弹框
exports.repayPop = function(){
	//清空输入框
	$(".pop-clear").click(function(){
		$(this).parent().siblings(".pop-input").find("input").val("").focus();
	})
	$(".p-pop-close").click(function(){
		$(".repay-pop-wrap").hide();
		$(".meba-qr").hide();
		$(".disbled-button").hide();
		$(".repay-now").show();
	})
	$(".repay-now").click(function(){
		$(this).hide().siblings(".disbled-button").show();
		exports.countdown=60;
		exports.settime($(".get-code-again")[0])
		$(".repay-pop-wrap").show();
		$(".meba-qr").show();
	})	
	$(".get-code-again").click(function(){
		exports.countdown=60;
		exports.settime($(".get-code-again")[0])
	})
}

//exports.countdown=60; 获取验证码
exports.settime = function(val) { 
	
	if (exports.countdown == 0) { 
		val.removeAttribute("disabled");    
		val.value="重新获取验证码";
		val.innerHTML = "重新获取验证码";
		$(val).addClass("active");
		//countdown = 60; 
	} else { 
		val.setAttribute("disabled", true); 
		$(val).removeClass("active");
		//val.innerHTML="重新发送(" + countdown + ")";
		val.value= exports.countdown + "后重新获取验证码";  
		val.innerHTML = exports.countdown + "后重新获取";
		exports.countdown--; 
		setTimeout(function() { 	
			exports.settime(val) 
		},1000) 
	} 
	
} 

//借款支付页单选模拟
exports.checkBox = function(){
	$(".r-bttom-l input").click(function(){
		if($(this).prop("checked")){
			$(this).siblings("span").addClass("active");	
		}else{
			$(this).siblings("span").removeClass("active");
		}
	})
}

//My97Date
exports.getMy97Date =function(starId,endId,callback){
	document.getElementById(starId).onfocus = function(){
		var dEnd=$dp.$('dEnd');
		var dStar = document.getElementById(endId);
		if(dStar.value == ""){
			WdatePicker({
				onpicked:function(){
					dEnd.focus();
					callback&&callback();
				},
				dateFmt:'yyyy-MM-dd',
				maxDate:'%y-%M-%d'
			})	
		}else{
			WdatePicker({
				onpicked:function(){
					dEnd.focus();
				},
				dateFmt:'yyyy-MM-dd',
				maxDate:'#F{$dp.$D(\'dEnd\')}'
			})
		}
		document.getElementById(endId).onfocus = function(){
			WdatePicker({
				onpicked:function(){
					callback&&callback();
				},
				dateFmt:'yyyy-MM-dd',
				maxDate:'#F{$dp.$D(\'dEnd\')}'
			})	
		}
		
	}
	document.getElementById(endId).onfocus = function(){
		WdatePicker({
			dateFmt:'yyyy-MM-dd',
			minDate:'#F{$dp.$D(\'dStar\')}',
			maxDate:'%y-%M-%d'
		})	
	}	
}

//canvas 开始
//x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
exports.DrowProcess =function(x,y,radius,process,backColor,proColor,fontColor,myCanvas,fontsize){
	fontsize||(fontsize=32);
	var canvas = document.getElementById(myCanvas);
	if (canvas.getContext) {
		var cts = canvas.getContext('2d');
	}else{
		return;
	}
	
	cts.beginPath();  
	// 坐标移动到圆心  
	cts.moveTo(x, y);  
	// 画圆,圆心是45,45,半径45,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
	cts.arc(x, y, radius, 0, Math.PI * 2, false);  
	cts.closePath();  
	// 填充颜色  
	cts.fillStyle = backColor;  
	cts.fill();

	cts.beginPath();  
	// 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
	cts.moveTo(x, y);  
	// 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
	cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);  
	cts.closePath();  
	cts.fillStyle = proColor;  
	cts.fill(); 
	
	//填充背景白色
	cts.beginPath();  
	cts.moveTo(x, y); 
	cts.arc(x, y, radius - (radius * 0.045), 0, Math.PI * 2, true);  
	cts.closePath();
	cts.fillStyle = 'rgba(255,255,255,1)';  
	cts.fill(); 
	  
	//在中间写字 
	cts.font = "normal "+fontsize+"px Arial";  
	cts.fillStyle = fontColor;  
	cts.textAlign = 'center';  
	cts.textBaseline = 'middle';  
	cts.moveTo(x, y);  
	cts.fillText(process+"%", x, y);  
	
}
//canvas end
//x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
exports.drowProcess = function(x,y,radius,process,backColor,proColor,fontColor,myCanvas,fontsize,money,total,remarks){
	fontsize||(fontsize=32);
	money||(money=0)
	total||(total=0)
	money = parseFloat(money);
	total = parseFloat(total);
	var canvas = document.getElementById(myCanvas);

	if (canvas.getContext) {
		var cts = canvas.getContext('2d');
	}else{
		return;
	}
	
	cts.beginPath();  
	// 坐标移动到圆心  
	cts.moveTo(x, y);  
	// 画圆,圆心是45,45,半径45,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
	cts.arc(x, y, radius, 0, Math.PI * 2, false);  
	cts.closePath();  
	// 填充颜色  
	cts.fillStyle = backColor;  
	cts.fill();

	cts.beginPath();  
	// 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
	cts.moveTo(x, y);  
	// 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
	cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);  
	cts.closePath();  
	cts.fillStyle = proColor;  
	cts.fill(); 
	
	//填充背景白色
	cts.beginPath();  
	cts.moveTo(x, y); 
	cts.arc(x, y, radius - (radius * 0.15), 0, Math.PI * 2, true);  
	cts.closePath();
	cts.fillStyle = 'rgba(255,255,255,1)';  
	cts.fill(); 
	  
	//在中间写字 
	var x_f = x - 15;
	cts.font = "normal "+fontsize+"px Arial";  
	cts.fillStyle = fontColor;  
	cts.textAlign = 'center';  
	cts.textBaseline = 'middle';  
	cts.moveTo(x_f, y);  
	cts.fillText(exports.formatMoney(money), x_f, y);  
	
	//货币单位
	var x_m = x + 83;
	var y_m = y + 3;
	cts.font = "normal "+20+"px Arial";  
	cts.fillStyle = fontColor;  
	cts.textAlign = 'right';  
	cts.textBaseline = 'right';  
	cts.moveTo(x_m, y_m);  
	cts.fillText(" 元", x_m, y_m);  
	
	//备注信息
	var x_r = x + 0;
	var y_r = y + 30;
	cts.font = "normal "+14+"px Arial";  
	cts.fillStyle = '#666666';  
	cts.textAlign = 'center';  
	cts.textBaseline = 'middle';  
	cts.moveTo(x_r, y_r);  
	cts.fillText(remarks, x_r, y_r);  
	
}
//canvas end
 
//我的借款 canvas S
//score:百分比(向上取整) bfb:临时变量 timer:定时器 money:可用额度 total:总额 remark:备注
exports.StartCash = function(score,bfb,timer,id,money,total,remark){
	exports.drowProcess(124,124,124,bfb,'#dedede','#ef832f','#ef832f',id,38,money,total,remark);
	timer = setTimeout(function(){
		exports.StartCash(score,bfb,timer,id,money,total,remark);
	},1);
	if(bfb>=score){
		clearTimeout(timer);
		bfb=0;
		return;
	}
	bfb+=1;
}
//money:可用额度 total:总额 remark:备注
exports.getCav = function(id,money,total,remark){
	var obj = document.getElementById(id);
	obj.timer = null;
	obj.bfb = 0;
	var score = Math.ceil( parseFloat(money/total)*100 );
	exports.StartCash(score,obj.bfb,obj.timer,id,money,total,remark);
}
//我的借款 canvas E

//n秒后回到首页  2016-1-15 
exports.setTimeFun=function(obj,Website){
	var timer="";
	//设定倒数秒数  
	var t = $(obj).text();  
	//显示倒数秒数  
	function showTime(){  
	    t -= 1;  
	    $(obj).html(t);  
	    if(t==0){  
	    	clearInterval(timer);
	        location.href=Website;  
	    }  
	}  
	  //每秒执行一次,showTime()  
	 timer=setInterval(showTime,1000); 
}

/*验证 s*/
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

//b.getMonths(1,100,2016) 当前1月 100月后  当前2016年
exports.getMonths = function(now,val,year){
	var bs = parseInt(val/12);
	var ymon = (val+now)%12;
	year = year+bs;
	return year+"年"+ymon+"月";
}

/*验证 e*/
//提示问题16-1-16
exports.tipQue = function(){
	var oUserW =$(".tipQueWor");
	$(oUserW).hover(function(){
		$(this).parent().siblings(".tipQuestion").stop().slideDown();	
		$(this).find("em").addClass("active");
	},function(){
		$(this).parent().siblings(".tipQuestion").stop().slideUp();		
		$(this).find("em").removeClass("active");
	})	
}
//16-1-18复选框样式切换
exports.emCheckbox=function(){
	var oemCheckbox = $(".oneNum .em_forCheckbox");	
	var oSee=$(".oneNum .bl-color");
	var oMarkBtn=$(".allNum .markRead");
	var oallNum=$(".allNum .em_forCheckbox");
	//复选框选中取消
	function ifCheck(obj){
		if($(obj).hasClass("active")){
			$(obj).removeClass("active");
			$(obj).parent().parent().parent().removeClass("active");
		}else{
			$(obj).addClass("active");
			$(obj).parent().parent().parent().addClass("active");
		}
	}
	//查看 收起
	function seeUp(obj){
		if($(obj).hasClass("active")){
			$(obj).removeClass("active");
			$(obj).html("查看");
			$(obj).parent().siblings().find(".em_forCheckbox").removeClass("active");
			$(obj).parent().siblings(".showHid").find("div").hide();
			$(obj).parent().siblings(".showHid").children("p").show();
			$(obj).parent().parent().removeClass("active");
		}else{
			$(obj).addClass("active");
			$(obj).html("收起");
			$(obj).parent().siblings().find(".em_forCheckbox").addClass("active");
			$(obj).parent().siblings(".showHid").find("div").show();
			$(obj).parent().siblings(".showHid").children("p").hide();
			$(obj).parent().parent().addClass("active");
			$(obj).parent().parent().addClass("isRead");
		}
	}
	/*全选选中取消*/
	function ifAllCheck(obj){
		if($(obj).hasClass("active")){
			$(obj).removeClass("active");
			$(obj).parent().parent().parent().siblings().find(".em_forCheckbox ").removeClass("active");
		}else{
			$(obj).addClass("active");
			$(obj).parent().parent().parent().siblings().find(".em_forCheckbox ").addClass("active");
			$(obj).parent().parent().parent().siblings().find(".em_forCheckbox ").parent().parent().parent().addClass("active");
		}
	}
	
	$(oemCheckbox).click(function(){
		ifCheck($(this));
	})
	$(oallNum).click(function(){
		ifAllCheck($(this));
		if($(oallNum).hasClass("active")){
			oMarkBtn.click(function(){
				$(this).parent().parent().parent().siblings().addClass("isRead");
				$(this).parent().parent().parent().siblings().find(".em_forCheckbox ").parent().parent().parent().removeClass("active");
				})
		}
	})
	$(oSee).click(function(){
		seeUp($(this));
	})
	
	
}

/**
 * 打开提示框
 * @param title 标题
 * @param msg   提示信息
 * @param callback  回调函数
 */
exports.openTips = function(title,msg,callback){
	$(".operation-tips").show();
	$(".meba-qr").show();
	$(".oper-cont").html(title)
	$(".oper-tips-msg").html(msg);
	
	$(".oper-tips-op").click(function(){
		callback&&callback()//回调函数	
	})
	var aaa=function(){callback&&callback();$(".oper-tips-close").off("click",aaa)}
	$(".oper-tips-close").on("click",aaa)
}

//input添加淡蓝选中效果
exports.addBlueBorder = function(){
	$(document).on("focus","input[type=text]",function(){
		$(this).addClass("or-input");	
	})
	$(document).on("blur","input[type=text]",function(){
		$(this).removeClass("or-input");	
	})	
}

/**
 * 关闭提示框
 */
$(".oper-tips-close").click(function(){
	exports.closeTips();	
})
exports.closeTips = function(){
	$(".operation-tips").hide();
	$(".meba-qr").hide();
}
//转入确认--优惠方案选择
exports.selectDiscount=function(){
	var oSelect = $(".dema-check select");
	var oCheckbox = $(".dema-check .che-box");
	$(oSelect).each(function(i, e) {
        $(this).focus(function(){
			$(oSelect).addClass("sel-invalid").eq(i).removeClass("sel-invalid");
			$(oCheckbox).prop("checked",false).eq(i).prop("checked",true);
		})
    });	
	$(oCheckbox).each(function(i, e) {
		
		$(this).click(function(){
			
			if(!$(this).prop("checked")){
				$(oCheckbox).prop("checked",false);
				$(oSelect).removeClass("sel-invalid");
			}else{
				$(oSelect).addClass("sel-invalid").eq(i).removeClass("sel-invalid");
				$(oCheckbox).prop("checked",false).eq(i).prop("checked",true);	
			}
			
		})
        
    });
}

/**
 * kkpager pagination控件设置
 * @param pageNo     页码
 * @param totalPages 总页数
 * @param element    分页位置ID
 * @param callback   点击页码的回调方法
 */
exports.definedPaginator = function(pageNo, totalPage, element, callback){
	if(!pageNo){
		pageNo = 1;
	}
	//生成分页
	kkpager.generPageHtml({
		pagerid : element,
		pno : pageNo,
		//总页码
		total : totalPage,
		//总数据条数
		//totalRecords : totalRecords,
		lang : {
			firstPageText : '|<',
			lastPageText : '>|',
			prePageText : '<',
			nextPageText : '>',
			totalPageBeforeText : '共',
			totalPageAfterText : '页',
			totalRecordsAfterText : '条数据',
			gopageBeforeText : '转到',
			gopageButtonOkText : '确定',
			gopageAfterText : '页',
			buttonTipBeforeText : '第',
			buttonTipAfterText : '页'
		},
		mode : 'click',//默认值是link，可选link或者click
		click : function(page){
			//eval(callback)(page);
			callback&&callback(page);
			this.selectPage(page);//page:当前页
			return false;
		}
	},true);//true:重新初始化分页控件;false:不重新初始化分页控件(默认)
};

//焦点图
//imgPlay(".imgPlay1","ol");
exports.imgPlay=function(className,ulLi,olLi,callback){
	var oDiv=$(className);
	var oUlLi=ulLi;
	var oOlLi=olLi;
	oDiv.iNow=0;
	
	oOlLi.click(function(){
			oDiv.iNow=$(this).index();
			fnFade();
		})
	oDiv.hover(function(){
			clearInterval(oDiv.timer);
		},function(){
				autoPlay();
			})
	autoPlay();
	function autoPlay(){
			oDiv.timer=setInterval(function(){
					oDiv.iNow++;
					oDiv.iNow%=oUlLi.length;
					fnFade();
				},10000);
		}
	
	fnFade();
	function fnFade(){
			oUlLi.each(function(index, element) {
				if(index!=oDiv.iNow){
						oUlLi.eq(index).fadeOut().css('z-index',1);	
						oOlLi.eq(index).removeClass('active');
					}else{
						oUlLi.eq(index).fadeIn().css('z-index',2);	
						oOlLi.eq(index).addClass('active');	
					}
			});
		}
}
//焦点图 end

$.extend({
	valiFloat : function(obj){
		
		$(obj).on("keyup paste keydown",function(){
			var s = $(this).val();  
			if(! /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(s) ){
				s = s.replace(/[^0-9|\.]/g, '');
				s = s.replace(/\.+/g, '.');
				if( /^[0-9]+([.]{1}[0-9]+){1,2}$/.test(s) || s.split(".").length>=3 ){
					//处理多余的.
					var s_ = "";
					$(s.split(".")).each(function(i, e) {
						i == 0 ? (s_=e+".") : (s_=s_+e);
					});
					s = s_;
				}
				$(obj).val(s)
			}
			if(/^0+\./.test(s))
			{
				s = s.replace(/^0+/, '0');
				$(obj).val(s)
			}else if(/^0+/.test(s))
			{
				s = s.replace(/^0+/, '');
				$(obj).val(s)
			}
			if(!/(\.[0-9]{2})$/.test(s)&&!/^\d+$/.test(s)){
				if(!/(\.[0-9]{0,1})$/.test(s)){
					var arrN = s.match(/(^[0-9]+)((\.[0-9]{2})([0-9]+)){0,1}$/);
					s = arrN[1]+arrN[3];
				}
				$(obj).val(s);
			}
		});
		
		$(obj).on("blur",function(){
			var s = $(this).val();  
			if(! /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(s) ){
				s = s.replace(/[^0-9|\.]/g, '');
				s = s.replace(/\.+/, '.');
				
				if( /^[0-9]+([.]{1}[0-9]+){1,2}$/.test(s)  || s.split(".").length>=3 ){
					//处理多余的.
					var s_ = "";
					$(s.split(".")).each(function(i, e) {
						i == 0 ? (s_=e+".") : (s_=s_+e);
					});
					s = s_;
				}
				$(obj).val(s)
			}
			if(/^0+\./.test(s))
			{
				s = s.replace(/^0+/, '0');
				$(obj).val(s)
			}else if(/^0+/.test(s))
			{
				s = s.replace(/^0+/, '');
				$(obj).val(s)
			}
			if(!/(\.[0-9]{2})$/.test(s)&&!/^\d+$/.test(s)){
				if(!/(\.[0-9]{0,1})$/.test(s)){
					var arrN = s.match(/(^[0-9]+)((\.[0-9]{2})([0-9]+)){0,1}$/);
					s = arrN[1]+arrN[3];
				}
				$(obj).val(s);
			}
			if(/\.$/.test(s)){
				s = s + "00";
				$(obj).val(s)
			} 
			if(/(\.[0-9]{1})$/.test(s)){
				s = s + "0";
				$(obj).val(s)
			} 
		});
		
	}   
});
});

