//define(['jquery'],function(){

function BombBox() {
    this.obj = null;
    this.oMark = null;
    this.settings = {
        w: 300,
        h: 300,
        dir: "center",
        title: "",
        mark: false,
        confi: function() {},
        cancel: function() {}
    }
}
BombBox.prototype.json = {};
BombBox.prototype.init = function(opt) {
    extend(this.settings, opt);
    if (this.json[opt.iNow] == undefined) {
        this.json[opt.iNow] = true
    }
    if (this.json[opt.iNow]) {
        this.create();
        this.fnClose();
        if (this.settings.mark) {
            this.createMark()
        }
        if (this.settings.btn) {
            var btn_ = this.obj.getElementsByTagName("input");
            var This = this;
            btn_[0].onclick = function() {
                This.settings.confi();
                btn_[0].disabled = true;
            };
            btn_[1].onclick = function() {
                This.settings.cancel();
                btn_[1].disabled = true;
            }
        }
        this.json[opt.iNow] = false
    }
};
BombBox.prototype.create = function() {
	$("body > div").css({"-webkit-filter":"blur(8px) contrast(0.4) brightness(1.4)"})
    var btnHtml = "";
    if (this.settings.btn) {
        btnHtml = "<div class='oper-wrap'><p class='b-success'><span><i></i>" + this.settings.confiTxt + "：</span><input type='button' value='" + this.settings.confiBtnTxt + "'></p> <p class='b-failed'><span><i></i>" + this.settings.cancelTxt + "：</span><input type='button' value='" + this.settings.cancelBtnTxt + "'></p></div></div>"
    }
    this.obj = document.createElement("div");
    this.obj.className = "BombBox";
    this.obj.innerHTML = "<div class='title'><span>" + this.settings.title + "</span><span class='close'></span></div>" + "<div class='content'>" + btnHtml + "</div><div class='bob-foot'>注：如遇到问题请拨打我们的客服热线：<span class='blue-color'>400-010-5577</span></div>";
    document.body.appendChild(this.obj);
    this.obj.style.width = this.settings.w + "px";
    this.obj.style.height = this.settings.h + "px";
    if (this.settings.dir == "center") {
        this.obj.style.left = (viewWidth() - this.obj.offsetWidth) / 2 + "px";
        this.obj.style.top = (viewHeight() - this.obj.offsetHeight) / 2 + "px"
    } else {
        if (this.settings.dir == "leftDown") {
            this.obj.style.left = viewWidth() - this.obj.offsetWidth + "px";
            this.obj.style.top = viewHeight() - this.obj.offsetHeight + "px"
        }
    }
};
BombBox.prototype.fnClose = function() {
    var oClose = this.obj.getElementsByTagName("span")[1];
    var This = this;
    oClose.onclick = function() {
        document.body.removeChild(This.obj);
        if (This.settings.mark) {
            document.body.removeChild(This.oMark)
        }
        This.json[This.settings.iNow] = true;
        $("body > div").css({"-webkit-filter":"none"});
    }
};
BombBox.prototype.createMark = function() {
    var oMark = document.createElement("div");
    oMark.id = "mark";
    this.oMark = oMark;
    document.body.appendChild(this.oMark);
    oMark.style.width = viewWidth() + "px";
    oMark.style.height = viewHeight() + "px"
};
function extend(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr]
    }
}
function viewWidth() {
    return document.documentElement.clientWidth
}
function viewHeight() {
    return document.documentElement.clientHeight
};

//跟随动画 cObj父级框 lObj运动元素 需为jq对象 correct矫正值
var tabs = function(cObj,lObj,correct){
	this.obj = cObj;   // parent element
	this.line = lObj;  //运动元素
	this.lineLeft = 0; 
	this.lineWidth = 0;
	this.index = 0;	   
	this.objOffset = 0;
	this.correct = correct || 0;
	this.childrenObj= null;
	
	this.init = function(){
		var _this = this;
		_this.objOffset = _this.obj.offset().left;
		_this.childrenObj = _this.obj.children();
		_this.index = _this.obj.find(".active").index()==-1?0:_this.obj.find(".active").index();//记录当前索引
		
		_this.setActive(_this.index , !1);
		
		_this.childrenObj.on("mouseover",function(){
			_this.setActive($(this).index() , !0);
		})
		
		_this.obj.on("mouseout",function(){
			_this.setActive(_this.index , !0);	
		})
			
	};
	
	this.setActive = function(i,flg){
		var _this = this;
		if( _this.correct==="0" ){
			_this.lineLeft = _this.childrenObj.eq(i).offset().left;
		}else{
			_this.lineLeft = _this.childrenObj.eq(i).offset().left - _this.obj.offset().left + _this.correct;
		}
		_this.lineWidth = _this.childrenObj.eq(i).width() - 1;
		
		if(flg){//动画达到当前位置
			_this.line.stop(!0 , !1).animate({width:_this.lineWidth,left:_this.lineLeft},300);
		}else{//直接设置当前位置
			_this.line.css({"width":_this.lineWidth+"px","left":_this.lineLeft+"px"})
		}
		
	};
	
}


//})