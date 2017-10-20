var app = angular.module("myApp", ['ngRoute']); 
//判断是否为电脑端
function IsPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
//如果是电脑端，则正常显示，否则则无法访问
// if(!IsPC()){
	// document.body.innerHTML = "暂时还没有手机页面哦~~~~~";
	// document.body.style.fontSize = '0.7rem';
	// document.body.style.color = '#fff';
	// document.body.style.textAlign = 'center';
	// document.body.style.paddingTop = '5.8rem';
	// document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
// }

//判断时间是否过期（超过一个小时）,过期为1，不过期为0
function timeOut(object,time){
	var nowTime=parseInt(new Date().getTime()/1000);
	var flag = 0;
	var oldTime = localStorage.getItem(object);
	
	if(oldTime){
		if(nowTime - oldTime > time){
			localStorage.setItem(object,parseInt(new Date().getTime()/1000));
			flag = 1;
			console.log(oldTime);
		}
	}else{
		localStorage.setItem(object,parseInt(new Date().getTime()/1000));
	}
	return flag;
};
//获取地址栏中传递的值
function getUrl(url){
	var Request = new Object();
	if(url.indexOf("?")!=-1)
	{
	var str = url.substr(1)　//去掉?号
	　　strs = str.split("&");
	for(var i=0;i<strs.length;i++)
	{
	 　 Request[strs[i ].split("=")[0]]=decodeURI(strs[ i].split("=")[1]);
	}
	}
	return Request;
};
//控制顶部导航栏收起展开
$(document).ready(function(){
    $(document).scroll(function(){
        var top = $(document).scrollTop();
        if(top > 100){
			$('.navbar').attr('class','navbar navbar-min');
			$('.nav-box .pic').attr('class','pic show');
			$('.min-user-state').attr('class','user-state min-user-state');
		}
		if(top < 100){
			$('.navbar').attr('class','navbar');
			$('.nav-box .pic').attr('class','pic');
			$('.min-user-state').attr('class','user-state min-user-state hidden');
		}
		//隐藏/显示返回顶部的按钮
		if(top > 1000){
			$('.footer .pic-top').attr('class','pic pic-top pic-show');
		}
		if(top < 1000){
			$('.footer .pic-top').attr('class','pic pic-top');
		}
    });
});

//美洽客服
(function(m, ei, q, i, a, j, s) {
	m[i] = m[i] || function() {
		(m[i].a = m[i].a || []).push(arguments)
	};
	j = ei.createElement(q),
		s = ei.getElementsByTagName(q)[0];
	j.async = true;
	j.charset = 'UTF-8';
	j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
	s.parentNode.insertBefore(j, s);
})
(window, document, 'script', '_MEIQIA');
_MEIQIA('entId', '44676');

 _MEIQIA('withoutBtn');
_MEIQIA('init');

$(document).ready(function(){
	//banner图素材移动位置
	setTimeout(function(){
		$('.pic-group .pic').attr('class','pic move');
		$('.pic-group .example-text').attr('class','example-text move');
		
		//点击按钮，回到页面顶部
		$(".footer .pic-top").click(function() {
		   $("html,body").animate({scrollTop:0}, 1000);
		}); 
		
		//弹出客服对话框
		$('.online-service').click(function(){
			var userData = {
				name:$('.contact-name').val(),
				phone:$('.contact-phone').val(),
				email:$('.contact-email').val(),
				company:$('.contact-company').val()
			};
			console.log(userData.name);
			_MEIQIA('showPanel');
			if(userData.name){
				_MEIQIA('metadata', {
					comment:'一传互动客户',
					name: userData.name,
				})
			}
			if(userData.phone){
				_MEIQIA('metadata', {
					comment:'一传互动客户',
					tel: userData.phone
				})
			}
			if(userData.email){
				_MEIQIA('metadata', {
					comment:'一传互动客户',
					email: userData.email
				})
			}
			if(userData.company){
				_MEIQIA('metadata', {
					comment:'一传互动客户',
					公司名称: userData.company
				})
			}
			
			
		})
	},0);
});





var flag = 0; //判断验证码
var flagYzm = 0; //判断是否获取短信验证码
app.controller("user-state", ['$scope',function($scope) {
	
    //登陆框
	$scope.login = function(){
		console.log(flag);
		layer.open({
			type: 1,
			title: '登陆',
			area: '350px',
			closeBtn:1,
			shadeClose: false,
			skin: 'layer-class',
			content: $(".login-box"),
			cancel: function(){
				$("#slider2").slider("restore");
				$("#slider3").slider("restore");
				flag = 0;
			}
		});
	}

	//注册框
	$scope.register = function(){
		layer.open({
			type: 1,
			title: '新用户注册',
			area: '350px',
			closeBtn:1,
			shadeClose: false,
			skin: 'layer-class',
			content: $(".register-box"),
			cancel: function(){
				$("#slider2").slider("restore");
				$("#slider3").slider("restore");
				flag = 0;
			}
		});
	}
	//验证码
	$("#slider2").slider({
		width: 300, // width
		height: 40, // height
		sliderBg:"rgb(134, 134, 131)",// 滑块背景颜色
		color:"#fff",// 文字颜色
		fontSize: 14, // 文字大小
		bgColor: "#33CC00", // 背景颜色
		textMsg: "按住滑块，拖拽验证", // 提示文字
		successMsg: "验证成功", // 验证成功提示文字
		successColor: "#fff", // 滑块验证成功提示文字颜色
		time: 400, // 返回时间
		callback: function(result) { // 回调函数，true(成功),false(失败)
			flag = 1;
		}
	});
	
	$("#slider3").slider({
		width: 300, // width
		height: 40, // height
		sliderBg:"rgb(134, 134, 131)",// 滑块背景颜色
		color:"#fff",// 文字颜色
		fontSize: 14, // 文字大小
		bgColor: "#33CC00", // 背景颜色
		textMsg: "按住滑块，拖拽验证", // 提示文字
		successMsg: "验证成功", // 验证成功提示文字
		successColor: "#fff", // 滑块验证成功提示文字颜色
		time: 400, // 返回时间
		callback: function(result) { // 回调函数，true(成功),false(失败)
			flag = 1;
		}
	});
	
	$scope.closeAll = function(){
		flag = 0;
		layer.closeAll();
		$("#slider2").slider("restore");
		$("#slider3").slider("restore");
	};
	$scope.getYzm = function(e){
		$scope.phone = {
			phone:$('.phone').val()
		};
		//判断输入的是否是标准手机号
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($scope.phone.phone))){
			layer.msg('请输入正确的手机号',function(){});
			return false; 
		}
		if(!flagYzm){
			if(flag){
				//验证通过，调用短信接口
				flagYzm = 1;
				layer.msg('已发送成功',function(){});
				var i = 60;
				var timer = setInterval(function(){
					if(i>0){
						e.currentTarget.innerHTML = i + 's';
						i--;
					}else{
						clearInterval(timer);
						e.currentTarget.innerHTML = '获取验证码';
						flagYzm = 0;
					}
				},1000);
			}else{
				//没有通过滑动验证
				layer.msg('请先完成下方的滑动验证',function(){});
			}
		}else{
			//已经点击获取验证码，60s后重试
			layer.msg('验证码已经发送，请稍后再试',function(){});
		}
	}
	//我有账号
	$scope.have = function(){
		layer.closeAll();
		setTimeout(function(){
			layer.open({
				type: 1,
				title: '登陆',
				area: '350px',
				closeBtn:1,
				shadeClose: false,
				skin: 'layer-class',
				content: $(".login-box"),
				cancel: function(){
					$("#slider2").slider("restore");
					$("#slider3").slider("restore");
					flag = 0;
				}
			});
		},500)
	}
	
	//提交登陆信息
	$scope.loginBtn = function(){
		$scope.userData = {
			name:$('.name').val(),
			pwd:$('.password').val()
		};
		if(flag&&$scope.userData.name&&$scope.userData.pwd){
			console.log($scope.userData.name);
			console.log($scope.userData.pwd);
		}else if(!flag){
			layer.msg('请先完成下方的滑动验证',function(){});
		}else if(!$scope.userData.name){
			layer.msg('用户名不能为空',function(){});
		}else if(!$scope.userData.pwd){
			layer.msg('密码不能为空',function(){});
		}
	};
	
	//提交注册信息
	$scope.registerBtn = function(){
		$scope.userRegisterData = {
			name:$('.register-name').val(),
			pwd:$('.register-password').val(),
			pwd2:$('.password-sub').val()
		};
		if(flag && $scope.userRegisterData.name && $scope.userRegisterData.pwd && $scope.userRegisterData.pwd2 && ($scope.userRegisterData.pwd2 == $scope.userRegisterData.pwd)){
			layer.msg('成功注册',function(){});
		}else if(!flag){
			layer.msg('请先完成下方的滑动验证',function(){});
		}else if(!$scope.userRegisterData.name){
			layer.msg('注册用户名不能为空',function(){});
		}else if(!$scope.userRegisterData.pwd){
			layer.msg('密码不能为空',function(){});
		}else if(!$scope.userRegisterData.pwd2){
			layer.msg('密码不能为空',function(){});
		}else if($scope.userRegisterData.pwd2 != $scope.userRegisterData.pwd){
			layer.msg('两次输入密码不一样',function(){});
		}
	};
}]);


    

app.controller("header", ['$scope',function($scope) {
    $scope.list = [
		{id:1,name:'平台概况',className:'active',src:'index.html'},
		{id:2,name:'广告合作',className:'',src:'adCooperate.html'},
		{id:3,name:'代理合作',className:'',src:'agent.html'},
		{id:4,name:'流量变现',className:'',src:'flow.html'},
		{id:5,name:'广告类型',className:'',src:'adType.html'},
		{id:6,name:'加入我们',className:'',src:'recruit.html'},
		
	];
	$scope.choosePage = function(e){
		window.open(e.item.src + '?pageId=' + e.item.id,'_self');
	}
	var pageId = getUrl(location.search).pageId
	if(pageId){
		for(var i = 0;i < $scope.list.length;i++){
			$scope.list[i].className = '';
		}
		$scope.list[pageId - 1].className = 'active';
	}else{
		
	}
}]);

app.controller("companyList", ['$scope',function($scope) {
    $scope.list = [
		{id:1,url:'img/companyList/1.png'},
		{id:2,url:'img/companyList/2.png'},
		{id:3,url:'img/companyList/3.png'},
		{id:4,url:'img/companyList/4.png'},
		{id:5,url:'img/companyList/5.png'},
		{id:6,url:'img/companyList/6.png'},
		{id:7,url:'img/companyList/7.png'},
		{id:8,url:'img/companyList/8.png'},
		{id:9,url:'img/companyList/9.png'},
		{id:10,url:'img/companyList/10.png'},
		{id:11,url:'img/companyList/11.png'},
		{id:12,url:'img/companyList/12.png'},
		{id:13,url:'img/companyList/13.png'},
		{id:14,url:'img/companyList/14.png'},
		{id:15,url:'img/companyList/15.png'},
		{id:16,url:'img/companyList/16.png'},
		{id:17,url:'img/companyList/17.png'},
		{id:18,url:'img/companyList/18.png'}
	];
}]);



