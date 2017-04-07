define(['jquery'],function(){
//进度圆上的结束点（圆圈）插件
    (function() {
        var _proto = $.circleProgress.defaults,
            _superInitWidget = _proto.initWidget,
            _superDrawFrame = _proto.drawFrame;
        $.extend(_proto, {
            dotRadius: 17,
            initWidget: function() {
                //console.log(this.dotRadius)               //圆点的直径     20
                //console.log(this.getThickness())          //线的宽度       10
                //console.log(this.radius)                  //圆的半径       200/2
                _superInitWidget.call(this);
                this.dotOffset = this.dotRadius - this.getThickness() / 2;  //20-10/2=15
                //this.radius -= this.dotOffset;
                this.radius = this.radius - this.dotOffset;     //100-15=85
                this.el.append('<div class="text-num"><strong>0</strong><span>信用评分</span></div>');
            },
            drawFrame: function(v) {
                this.ctx.save();
                this.ctx.clearRect(0, 0, this.size, this.size);
                this.ctx.translate(this.dotOffset, this.dotOffset);
                _superDrawFrame.call(this, v);
                if (v < 1) {
                    this.drawDot(v);
                }
                this.ctx.restore();
                //console.log(v);
                if(v == 0.96){
                    v = v + 0.04
                }
                this.el.find('strong').html(Math.ceil(v*1300));
            },
            drawDot: function(v) {
                //console.log(v);
                //console.log(this.startAngle);
                //console.log(Math.PI * 2 * v);
                var ctx = this.ctx,
                    sa = this.startAngle + Math.PI * 2 * v,
                    r = this.radius,                                    //this.radius = 85
                    rd = r - this.getThickness() / 2,                   //85-10/2 = 80
                    x = r + rd * Math.cos(sa),
                    y = r + rd * Math.sin(sa);
                ctx.save();
                ctx.fillStyle = "#f1831e";
                ctx.beginPath();
                ctx.arc(x, y, this.dotRadius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }
        });
    })();
})
 


