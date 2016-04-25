/**
 * Created by luoxudong on 2016/4/20.
 */
var allmyjs = function(){
    this.iecss();
    this.slideshow();//初始化
    this.mousego();//文字随着鼠标移动而移动
    this.flax();//闪电购上下页切换
    this.procollec();//产品收藏点击
    this.proche();//产品切换
    this.accordion();//手风琴
    this.shoppingcartCollec();//购物车收藏
    this.others();//1点击区域以外隐藏,2防止事件冒泡
    this.backtop();//backtop
    this.shopStyle();//购物车隐藏显示切换加载等样式的操作
    this.shopmoneycount();//购物车金额相关计算
    this.countdown();//倒计时
};
allmyjs.prototype = {
    iecss: function(){
        $(".changeShow ul li a:last-child").css({"width":"230px","height":"50px"});
        $(".prodect dl dt:nth-child(7)").css("border-right","1px solid #ccc");
        $(".food dt:last-child").css({"margin-left":"24px","display":"inline"});
        $(".new ul li:first-child").css("margin-left","0px");
        $(".cP ul li:first-child").css("margin-right","24px");
        $(".changeShow ul li:first-child").css("margin-left","0px");
    },
    slideshow: function(){
        setInterval(ChangePic,3000);
        var imgli = $(".imgList li");
        var numli = $(".numList li");
        var imgNumber=imgli.length;//图片的个数
        var index = 0;

        function ChangePic(){
            if(index==0){
                imgli.hide();
                imgli.eq(index+1).show();//只显示当前图片
                numli.removeClass("selected");
                numli.eq(index+1).addClass("selected");
                index=index+1;
            }
            else if(index<imgNumber){
                imgli.hide();
                imgli.eq(index).show();//只显示当前图片
                numli.removeClass("selected");
                numli.eq(index).addClass("selected");
                index=index+1;
            }
            else{
                imgli.hide();
                imgli.eq(0).show();//只显示当前图片
                numli.removeClass("selected");
                numli.eq(0).addClass("selected");
                index=1;
            }
        }
    },
    mousego: function(){
        var x = 20;
        var y = 10;
        var thisdom = $("#tooltip");
        $("a.tooltip").mouseover(function (e) { //当鼠标指针从元素上移入时
            this.myTitle = this.title;
            this.title = "";
            var tooltip = "<div id='tooltip'>" + this.myTitle + "</div>";
            $("body").append(tooltip);
            thisdom.css({ "top": (e.pageY + y) + "px", "left": (e.pageX + x) + "px" }).fadeIn(1000);
        }).mouseout(function () { //当鼠标指针从元素上移开时
            this.title = this.myTitle;
            thisdom.remove();
        }).mousemove(function (e) { //当鼠标指针从元素上移动时
            thisdom.css({ "top": (e.pageY + y) + "px", "left": (e.pageX + x) + "px" });
        });
    },
    flax: function(){
        var goodsNumber=$(".new ul").length || $(".cP ul").length || $(".foodchange ul").length;
        var g=0;
        function exchNext(cli,ulShow){//显示下一页
            $(""+cli).click(function(){
                if(g==0){
                    $("."+ulShow).hide();
                    $("."+ulShow).eq(g+1).show();
                    g=g+2;
                }
                else if(g<goodsNumber){
                    $("."+ulShow).hide();
                    $("."+ulShow).eq(g).show();
                    g=g+1;
                }
                else{
                    $("."+ulShow).hide();
                    $("."+ulShow).eq(0).show();
                    g=1;
                }
            });
        }
        exchNext(".push_right","cP ul");
        exchNext(".push_right","new ul");
        exchNext(".nextImg","foodchange ul");


        function exchPrve(cli,ulShow){//显示上一页
            $(""+cli).click(function(){
                if(g>0)
                {
                    g=g-1;

                    $("."+ulShow).hide();
                    $("."+ulShow).eq(g-1).show();
                }
                if(g==0)
                {
                    $("."+ulShow).hide();
                    $("."+ulShow).eq(goodsNumber-1).show();
                    g=goodsNumber;
                }
            });
        }
        exchPrve(".prveImg","foodchange ul");
    },
    procollec: function(){
        function chufa(hov,showhide,ys1,ys2) {
            $(""+ hov).hover(function () {
                $(this).find("" + showhide).show();
                $(this).find(""+ys1).css({"border":"1px solid #fc3a3a","border-left":"none"});
                $(""+ys2).css("border-right","1px solid #fc3a3a");
                $(this).css("border-right","none");
            }, function () {
                $(this).find("" + showhide).hide();
                $(""+ys2).css("border-right","none");
            });
        }
        chufa(".youhui","p");//右侧侧边栏
        chufa(".moduleGoods",".colleted");
        chufa(".new li,.cP li",".shoucang");//收藏夹
        chufa(".nav dl dt",".more",".more",".nav dl dt");//导航栏
        chufa(".allShow",".list_hide");//列表页导航栏
    },
    proche: function(){
        function luoxudong(sel,add,remo,cha,charemo,chaadd){
            $(""+sel).click(function(){
                $(this).addClass(""+add).siblings().removeClass(""+remo);
                var number=$(this).index();
                $(""+cha).removeClass(""+charemo);
                $(""+cha).eq(number).addClass(""+chaadd);
            });
        };
        luoxudong(".prodect>dl>dt","sel","sel",".change","changeShow","changeShow");
        luoxudong(".ticketUse>ul>li","noUser","noUser",".exTicket","exTicketShow","exTicketShow");
    },
    accordion: function(){
        $(".ttpp1").css({"height":"190px","margin-left":"0px"});
        $(".buy dl dt").hover(function(){
            $(this).parent("dl").find(".ttpp1").css("height","45px");//content
            $(this).parent("dl").find(".meihu").hide();//content
            $(this).parent("dl").find(".chanPin").show();//title

            $(this).find(".meihu").show();//content
            $(this).find(".chanPin").hide();//title
            $(this).css("height","190px");
        },function(){
            $(this).find(".meihu").hide();//content
            $(this).find(".chanPin").show();//title
            $(this).css("height","45px");
        });
        $(".buy dl").mouseleave(function(){
            $(this).find("dt").eq(0).css("height","190px");
            $(this).find(".chanPin").eq(0).hide();
            $(this).find(".meihu").eq(0).show();
        });
    },
    shoppingcartCollec: function(){
        $(".yuShou > p").click(function(){
            if($(this).hasClass("scn")){//检查是有scn
                $(this).find("img").attr("src","img/s22.png");
                $(this).removeClass("scn");//移除scn
                var ysc = $('<div class="posz">取消收藏成功</div>');
                $("body").append(ysc);
            }
            else
            {
                $(this).find("img").attr("src","img/scn.png");
                var ysc = $('<div class="posz">收藏成功</div>');
                $("body").append(ysc);//塞进div
                $(this).addClass("scn");//添加scn

            }
            setTimeout(moveTime, 1000);//显示1s
            function moveTime(){
                $(".posz").fadeOut().remove();//移除
            }
            var winWidth = $(window).width();//获取屏幕宽度
            var divWidth= $(".posz").width();//层宽
            var left=(winWidth-divWidth)/2;  //获取距离
            $(".posz").css("left",left+"px");//层左右居中
            var winHeight = $(window).height();//获取屏幕高度
            var divHeight= $(".posz").height();//获取层高
            var top=(winHeight-divHeight)/2; //获取高度距离
            $(".posz").css("top",top+"px");//层上下居中
        });
    },
    others: function(){
        $(document).not($(".side")).click(function(){
            $(".sideRight").hide(400);
            $(".rightShop,.youhui111,.youhui222").css("background","#333333");
            $(".rightShop,.youhui111,.youhui222").removeClass("ston");
            $(".rightShop,.youhui111,.youhui222").removeClass("stend");
        });
        $(".side").click(function(event){
            event.stopPropagation();
        });
    },
    backtop: function(){
        function z(){
            h = $(window).height();
            t = $(document).scrollTop();
            if(t > h){
                $(".bakTop").show();
            }else{
                $(".bakTop").hide();
            }
        }
        $(document).ready(function(s){
            z();
            $(".bakTop").click(function(){
                $(document).scrollTop(0);
            });
        });
        $(window).scroll(function(e){
            z();
        });
    },
    shopStyle: function(){
        function ShowHide(clic,block,none,bg,bg2,bg3,bg4,bg5,ig){
            $(""+clic).click(function(){
                if($(""+none).css("display","none"))
                {
                    $(""+block).show();
                    $(""+bg).html("我的优惠券").css("color","#fff");
                    $(""+bg2).html("我的收藏").css("color","#666");
                    $(this).css("background","#fc3a3a");
                    $(""+bg3).css("background","#333");
                    $(""+bg4).css("background","#f9f9f9");
                    $(""+bg5).css("background","#474747");
                    $(""+ig).hide();
                }
            });
        }
        ShowHide(".rightShop",".sideRight,.column",".ticket,.module","",".sideTitle",".youhui222,.youhui111",".sideRight,.sideTitle","");
        //购物车  切换里面内容,依次(购物车),(右侧隐藏层，购物车内容)，(优惠券内容，我的收藏里面内容),(  ),(右侧标题)，(心形收藏，优惠券符合)，(右侧隐藏层，标题)
        ShowHide(".youhui111",".sideRight,.ticket",".column,.module",".sideTitle","",".youhui222,.rightShop","",".sideRight,.sideTitle",".ig33");
        //购物券  切换里面内,依次(优惠券符合),(右侧隐藏层，优惠券内容)，(购物车内容，我的收藏里面内容),(右侧标题),(  )，(心形收藏，购物车)，(右侧隐藏层，标题)
        ShowHide(".youhui222",".sideRight,.module",".column,.ticket","",".sideTitle",".rightShop,.youhui111",".sideRight,.sideTitle","",".ig33");
        //收藏  切换里面内,依次(心形符合),(右侧隐藏层，我的收藏里面内容)，(购物车内容，优惠券内容),(  ),(右侧标题)，(购物车，优惠券符合，)，(右侧隐藏层，标题)


        /*--- 侧边栏显示隐藏切换----*/
        function mens(mnj,moe,lse,ig){
            $(""+mnj).click(function(){
                if($(this).hasClass("stend") ){//检查有stend
                    $(".sideRight").hide();//右侧隐藏
                    $(this).removeClass("stend");//移除stend
                    $(this).css("background","#333");//背景还原
                }
                else
                {
                    $(this).addClass("stend");//添加stend

                    $(""+moe).click(function(){//点击另外两个切换
                        if($(""+moe).hasClass("ston")){//检查有ston
                            $(".sideRight").hide();//右侧隐藏
                            $(""+moe).removeClass("ston");//移除ston
                        }else{
                            $(""+moe).addClass("ston");//添加ston
                        }
                        $(""+lse).removeClass("stend");//移除stend
                        $(""+moe).removeClass("ston");//移除ston
                    });
                }
                if($(".sideNumber").html()==0){
                    $(""+ig).show();
                }
            });
            $(".sideRight > p").click(function(){
                $(".sideRight").hide();
                $(".rightShop,.youhui111,.youhui222").removeClass("stend");
            });
        }
        mens(".rightShop",".youhui111,.youhui222",".rightShop",".ig33");
        mens(".youhui111",".youhui222,.rightShop",".youhui111");
        mens(".youhui222",".rightShop,.youhui111",".youhui222");


        /*点击加载更多---start*/
        function many(clik,hide,more,bg3){
            $(""+clik).click(function(){
                $(""+more).show();
                $(""+hide).hide();
                $(""+bg3).css("background","#333");
            });
        }
        many(".clicMore",".clicMore",".m_yc");//查看跟多产品
        many(".motic1",".motic1",".motic2,.ticHide");//查看跟多优惠券
        many(".sideRight > p",".sideRight","",".youhui111,.youhui222,.rightShop");//关闭右侧边栏
        many(".motic2",".motic2,.ticHide",".motic1");//收起
    },
    shopmoneycount: function(){
        //求和
        function sumjia(){
            //总价格
            var sum = 0;
            $(".columnPrice>span").each(function(){

                sum+=Math.round($(this).html()*100)/100;//保留2个小数
            });
            sum=Math.round(sum*100)/100;//保留2个小数
            $(".goShop em").html(sum);//总价

            //购物车数量
            var total=0;
            $(".coD2").each(function(){
                total+=parseInt($(this).html());
            });
            $(".sideNumber").html(total);
            $(".goShop > p > small").html( $(".sideNumber").html());//当前的数量
            $(".Nums").html($(".sideNumber").html());//当前的数量
        };
        sumjia();


        //删除购物车
        function del(){
            $(".delete").click(function(){
                $(this).parents("li").remove();//删除当前收藏
                sumjia();
                if($(".sideNumber").html()==0){
                    $(".ig33").show();
                    $(".goShop").hide();
                }
            });
        }
        del();

        /*--递增---*/
        function add(){
            //递增
            $(".add").click(function(){

                var oldValue=parseFloat($(this).parent(".columnDetail").find(".coD2").html());//取出现在的值
                var shopNumber=parseInt($(".sideNumber").html());//购物车
                var basePrices=$(this).parents("li").find("span").attr("lang");//原始单价

                oldValue++;//个数
                shopNumber++;//购物车
                var nowPrice=basePrices*oldValue;//单价*数量
                var nowPrice=Math.round(nowPrice*100)/100;//保留2个小数

                $(this).parents("li").find("span").html(nowPrice);//价格
                $(this).parent(".columnDetail").find(".coD2").html(oldValue);//个数

                $(".Nums").html(shopNumber);//购物车
                $(".sideNumber").html(shopNumber);//购物车
                $(".goShop > p > small").html(shopNumber);
                sumjia();//总价，购物车数量
            });
        }
        add();

        /*--递减---*/
        function Less(){
            //递减
            $(".remove").click(function(){
                var oldValue=parseFloat($(this).parent(".columnDetail").find(".coD2").html());//取出现在的值
                var shopNumber=parseInt($(".sideNumber").html());//购物车
                var basePrices=$(this).parents("li").find("span").attr("lang");//原始单价

                oldValue--;//个数
                shopNumber--;//购物车
                var nowPrice=basePrices*oldValue;//单价*数量
                var nowPrice=Math.round(nowPrice*100)/100;//保留2个小数

                $(this).parents("li").find("span").html(nowPrice);//价格
                sumjia();//总价，购物车数量

                if(oldValue>1){
                    $(this).parent(".columnDetail").find(".coD2").html(oldValue);//个数
                    $(".Nums").html(shopNumber);//购物车
                    $(".sideNumber").html(shopNumber);//购物车
                    $(".goShop > p > small").html(shopNumber);
                }
                else
                {
                    $(this).parent(".columnDetail").find(".coD2").html("1");
                    $(this).parents("li").find("span").html(basePrices);//原始单价
                }
            });
        }
        Less();

        function leave(){
            $(".coD2").keyup(function(){
                var oldValue=parseFloat($(this).parent(".columnDetail").find(".coD2").html());//取出现在的值
                var basePrices=$(this).parents("li").find("span").attr("lang");//原始单价
                var nowPrice=basePrices*oldValue;//单价*数量
                var nowPrice=Math.round(nowPrice*100)/100;//保留2个小数
                $(this).parents("li").find("span").html(nowPrice);//价格

                if(oldValue>1){

                }
                else{
                    $(this).parent(".columnDetail").find(".coD2").html("1");
                    $(this).parents("li").find("span").html(basePrices);//价格
                }

                del();//删除
                sumjia();//总和
            });
        }
        leave();
        /*----- 侧边栏 end  */


        $('.btnCart').on("click",function(){
            var luo=$(this).parents("li").find("img").eq(0).attr("src");//所收藏的图片
            $("#flyItem>img").attr("src",""+luo);
            var eleFlyElement = document.querySelector("#flyItem"),
                eleShopCart = document.querySelector("#rightShop");

            $(".ig33").hide();

            var Ip=$(this).parents("li").attr("ip");//点击时候获取参数
            var thisIntroduce=$(this).parents("li").find(".dicourt a").html() || $(this).parents("li").find(".moduleGoods > a >span").html();//商品介绍
            var OnePrice=$(this).parents("li").find(".price span").html() || $(this).parents("li").find(".moduleGoods i").html();//商品价格

            var arrip = new Array();
            for(var i=0; i<$(".column li").length; i++){

                var IOP=$(".column li").eq(i).attr("ip");
                arrip.push(IOP);

            };
            var goodsnum = $(".column>ul>li[ip ='"+Ip+"']").find(".coD2").text();//产品的个数
            var $price=$(".column>ul>li[ip ='"+Ip+"']").find(".columnPrice span").attr("lang");
            Array.prototype.in_array = function(e)
            {
                for(i=0;i<this.length;i++)
                {
                    if(this[i] == e)
                        return true;
                }
                return false;
            }

            if(arrip.in_array(Ip)){
                goodsnum++;
                $(".column>ul>li[ip ='"+Ip+"']").find(".coD2").text(goodsnum);//产品的个数

                var nowPrice=$price*goodsnum;//单价*数量
                var nowPrice=Math.round(nowPrice*100)/100;//保留2个小数

                $(".column>ul>li[ip ='"+Ip+"']").find(".columnPrice span").text(nowPrice);
                del();//删除
                add();//递增，
                Less();//递减
                sumjia();//总和
                leave();//个数
            }else{
                var addDom='<li ip="'+Ip+'">'+
                    '<a href="" class="columnImg">'+
                    '<img src="'+luo+'"/>'+
                    '</a>'+
                    '<div class="columnWord">'+
                    '<a href="" class="columnIntro">'+thisIntroduce+'</a>'+
                    '<div class="columnDetail">'+
                    '<p class="remove">'+"-"+'</p>'+
                    '<div contentEditable=true class="coD2">'+"1"+'</div>'+
                    '<p class="add">'+"+"+'</p>'+
                    '</div>'+
                    '</div>'+
                    '<div class="columnRight">'+
                    '<p class="columnPrice">'+"￥"+'<span lang="'+OnePrice+'">'+OnePrice+'</span>'+'</p>'+
                    '<p class="delete">'+"删除"+'</p>'+
                    '</div>'+
                    '<div class="clear">'+'</div>'
                '</li>'

                $(".column ul").append(addDom);
                del();//删除
                add();//递增，
                Less();//递减
                sumjia();//总和
                leave();//个数
            }


            // 抛物线运动
            var myParabola = funParabola(eleFlyElement, eleShopCart,{
                speed: 400, //抛物线速度
                curvature: 0.0008, //控制抛物线弧度
                complete: function() {
                    $(eleFlyElement).css('visibility','hidden');
                }
            })

            var scrollLeft = $(window).scrollLeft() || $('body').scrollLeft() || 0,
                scrollTop = $(window).scrollTop() || $('body').scrollTop() || 0;
            $(eleFlyElement).css('left', event.clientX + scrollLeft + "px");
            $(eleFlyElement).css('top', event.clientY + scrollTop + "px");
            $(eleFlyElement).css('visibility', 'visible');

            // 需要重定位
            myParabola.position().move();

        });
    },
    countdown: function(){
        //倒计时
        var intDiff = parseInt(86398);//倒计时总秒数量
        function timer(intDiff){
            window.setInterval(function(){
                var hour=23,
                    minute=23,
                    second=59;//时间默认值
                if(intDiff > 0){
                    day = Math.floor(intDiff / (60 * 60 * 24));
                    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                $('.foodLeft > ul > li > p').html('距离闪购结束时间'+hour+':'+minute+':'+second);
                intDiff--;
            }, 1000);
        }
        timer(intDiff);
    }

}