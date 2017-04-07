(function(){
function Pager(cls){
	this.el=$(cls);
	// this.ul=this.el.children("ul.page-nav-box");
	this.array=[];
}
Pager.prototype={
	init:function(_this){
		var page_el=this.el;
		var page_index=+(page_el.attr("data-index")||page_el.attr("data-index","1").attr("data-index"));
		var page_count=+(page_el.attr("data-count")||page_el.attr("data-count","1").attr("data-count"));
		var list=$(_this).parent().parent().children("li");
		var ele="",t=true;
		$(_this).parent().siblings().children("a").removeClass("active");
		if($(_this).attr("data-href")){
			$(_this).attr("data-href")=="-1"&&page_index>1&&(page_index-=1,t=false);
			$(_this).attr("data-href")=="+1"&&page_index<page_count&&(page_index+=1,t=false);
			ele=list.eq(page_index+1).children("a").addClass("active");
		}else if(!(/^\d+$/.test(_this.innerHTML))){
			_this.innerHTML=="首页"&&page_index!=1&&(page_index=1,t=false);
			_this.innerHTML=="尾页"&&page_index!=page_count&&(page_index=page_count,t=false);
			ele=list.eq(page_index+1).children("a").addClass("active");
		}else{
			var num=+_this.innerHTML;
			num!=page_index&&(t=false);
			page_index=num;
			ele=$(_this).addClass("active");
		}
	    page_el.attr("data-index",page_index);//.attr("data-count",page_count);
	    this.page_html(page_count);
	    this.array=[page_index,page_count,ele,t];//[0]是当前页，[1]是总页数，[2]选中的页号的元素，[3]是否重复；
		return [page_index,page_count,ele,t];//[0]是当前页，[1]是总页数，[2]选中的页号的元素，[3]是否重复；
	},
	clear:function(){//清除分页
		this.el.attr("data-index",1).attr("data-count",1);
		this.page_html();
	},
	page_html:function(page){//渲染分页
		var page_el=this.el;
	  page||(page=page_el.attr("data-count")||1);var _i=6,page=1*page,eq=+(page_el.attr("data-index")||page_el.attr("data-index","1").attr("data-index")),i,e,html="";
	  page_el.attr("data-count",page);
	  if(page>1){
		html+=
		  '<ul class="page-nav-box">'+
		    '<li><a href="javascript:;">首页</a></li>'+
		    '<li><a href="javascript:;" data-href="-1">&lt;</a></li>';
	    if(page<10+1){
	    	for(i=1;i<=page;i++){
	    	  if(i==eq){
	    	    html+='<li><a class="active" href="javascript:;">'+i+'</a></li>';
	    	  }else{
	    	    html+='<li><a href="javascript:;">'+i+'</a></li>';
	    	  }
	    	}
	    }else{
	    	if(eq<_i){
		    	for(i=1;i<_i;i++){
		    	  if(i==eq){
		    	    html+='<li><a class="active" href="javascript:;">'+i+'</a></li>';
		    	  }else{
		    	    html+='<li><a href="javascript:;">'+i+'</a></li>';
		    	  }
		    	}
		    	html+='<li><a href="javascript:void(0);">'+(_i)+'</a></li>'+
		    		  '<li><a href="javascript:void(0);">'+(_i+1)+'</a></li>'+
		    		  '<li><a href="javascript:void(0);">'+(_i+2)+'</a></li>';
			    for(e=(_i+3);e<(page-1)-1;e++){
			    	html+='<li class="no" data-num="'+e+'"></li>';
			    }
		    	html+='<li class="dot">...</li>';
				html+='<li><a href="javascript:void(0);">'+(page-1)+'</a></li>'+
					  '<li><a href="javascript:void(0);">'+page+'</a></li>';
	    	}else if(eq>page-_i+1){
		    	html+='<li><a href="javascript:void(0);">1</a></li>'+
					  '<li><a href="javascript:void(0);">2</a></li>'
			    for(e=3;e<(page-_i-1)-1;e++){
			    	html+='<li class="no" data-num="'+e+'"></li>';
			    }
				html+='<li class="dot">...</li>'+
					  '<li><a href="javascript:void(0);">'+(page-_i-1)+'</a></li>'+
		    		  '<li><a href="javascript:void(0);">'+(page-_i)+'</a></li>';
		    	for(i=page-_i+1;i<page+1;i++){
		    	  if(i==eq){
		    	    html+='<li><a class="active" href="javascript:;">'+i+'</a></li>';
		    	  }else{
		    	    html+='<li><a href="javascript:;">'+i+'</a></li>';
		    	  }
		    	}
	    	}else if(eq>0){
		    	html+='<li><a href="javascript:void(0);">1</a></li>'+
					  '<li><a href="javascript:void(0);">2</a></li>';
			    for(e=3;e<(eq-2)-1;e++){
			    	html+='<li class="no" data-num="'+e+'"></li>';
			    }
				html+='<li class="dot">...</li>';
		    	html+='<li><a href="javascript:void(0);">'+(eq-2)+'</a></li>'+
					  '<li><a href="javascript:void(0);">'+(eq-1)+'</a></li>'+
					  '<li><a class="active" href="javascript:void(0);">'+eq+'</a></li>'+
					  '<li><a href="javascript:void(0);">'+(eq+1)+'</a></li>'+
					  '<li><a href="javascript:void(0);">'+(eq+2)+'</a></li>';
			    for(e=(eq+2)+1;e<(page-1)-1;e++){
			    	html+='<li class="no" data-num="'+e+'"></li>';
			    }
		    	html+='<li class="dot">...</li>'+
					  '<li><a href="javascript:void(0);">'+(page-1)+'</a></li>'+
					  '<li><a href="javascript:void(0);">'+page+'</a></li>';
	    	}
	    }
		html+=
		  '<li><a href="javascript:;" data-href="+1">&gt;</a></li>'+
		  '<li><a href="javascript:;">尾页</a></li>'+
		'</ul>';
	  }
		this.el.html(html);
	}
}
window.Pager=Pager;
})();