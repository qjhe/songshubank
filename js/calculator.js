// JavaScript Document

define(function (require, exports, module) {
	
	var b = require('./acCommon');
	
	//显示&隐藏计算器
	$(".iCalculator").click(function(){
		$(".gain-cal-wrap").show();
		$(".meba-qr").show();
	})
	$(".close-gain").click(function(){
		$(".gain-cal-wrap").hide();
		$(".meba-qr").hide();
	})
	
	var iDay = 7;//快赚期限
	var iw_ = 0;
	
	//动画效果
	exports.getDj = function(){
		$(".agin-cal-item strong em").each(function(i, e) {
			b.pwdSafe($(this));
		});	
	}
	
	//输入框操作
	$("#gainIpt").on("input propertychange keyup paste blur",function(){
		iBits = true;
		//计算收益
		exports.calIncJz();
	})
	
	//计算收益&执行动画效果
	exports.calIncJz = function(fla){
		var iObj = $("#gainIpt");
		var jtM = ( $(iObj).val() ).replace(/[^0-9|\.]/g, '');
		jtM = jtM > 10000000? 10000000 : jtM;
		$(iObj).val(jtM);
		
		var iwh_ = $("#bar0 em").data("width");
		
		if( fla != "kFlag" ){
			if( jtM==$(iObj).data("money") ) return false;//投资未变  不做处理
		}
		
		if( ($("#bar0 em").width() == iwh_)&&(jtM==$(iObj).data("money")) ){//鼠标位置没变 不做处理
			return false;	
		}
		
		$(iObj).val(jtM).data("money",jtM);
		exports.calculateIncome(jtM);
		$(".agin-cal-item strong em.sj-or-s").each(function(i, e) {
			$(this).css({"width":"0px"});
		});
		exports.getDj();//动画效果
	}
	
	
	//计算收益
	exports.calculateIncome = function(iMoney){
		iMoney = parseFloat(iMoney) || 0;
		var da12 = b.profitPri(iMoney,11,12,"月");//大赚 (12个月 , 11%)	
		var da9 = b.profitPri(iMoney,10,9,"月");//大赚 (9个月 , 10%)
		var te6 = b.profitPri(iMoney,12,6,"月");//特赚 (6个月 , 12%)
		var da6 = b.profitPri(iMoney,9,6,"月");//大赚 (6个月 , 9%)
		var da3 = b.profitPri(iMoney,8,3,"月");//大赚 (3个月 , 8%)
		var kuai1 = b.profitPri(iMoney,7,iDay,"天");//快赚 (iDay天 , 7%)
		
		$("#da12").html(da12+"元");
		$("#da9").html(da9+"元");
		$("#te6").html(te6+"元");
		$("#da6").html(da6+"元");
		$("#da3").html(da3+"元");
		$("#kuai1").html(kuai1+"元");
		
	}
	
	proType = function (btn, bar, title,callback) {
		this.btn = document.getElementById(btn);
		this.bar = document.getElementById(bar);
		this.title = document.getElementById(title);
		this.step = this.bar.getElementsByTagName("em")[0];
		this.init();
		callback&&callback();
	};
	proType.prototype = {
		init: function () {
			var This = this, d = document, w = window, m = Math;
			This.btn.onmousedown = function (e) {
				var x = (e || w.event).clientX;
				var l = this.offsetLeft;
				var max = This.bar.offsetWidth - this.offsetWidth;
				
				d.onmousemove = function (e) {
					var thisX = (e || w.event).clientX;
					var to = m.min(max, m.max(-2, l + (thisX - x)));
					This.btn.style.left = to + 'px';
					This.ondrag(m.round(m.max(0, to / max) * 100), to);
					w.getSelection ? w.getSelection().removeAllRanges() : d.selection.empty();
				};
				document.onmouseup = function(){
					exports.calIncJz("kFlag");
					document.onmousemove=null;
					$("#bar0 em").data("width",iw_);
				}
			};
		},
		ondrag: function (pos, x) {
			iDay = ( Math.ceil(pos / 4.5) +7 );
			iw_ = Math.max(0, x) + 5;
			this.step.style.width = iw_ + 'px';
			
			this.title.innerHTML = iDay + '';
			//console.log(Math.max(0, x) + 5 + 'px')
		}
	}
	new proType('btn0', 'bar0', 'title0',function(){
		//exports.calIncJz("kFlag");
	});
	
	exports.calIncJz();//预执行 计算收益

})