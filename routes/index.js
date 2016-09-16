var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../routes/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '主页' });
});
router.get('/login',function(req,res){
	res.render('login',{title:"用户登录"});
})
router.get('/reg',function(req,res){
	res.render('reg',{title:"用户注册"});
})

router.get('/logout',function(req,res){
	req.session.user = null;
	req.flash('success','退出成功');
	res.redirect('/');
})

router.get('/u',function(req,res){
	var HotPlace = [
		{"name":"长隆野生动物世界","position":[113.327273,23.004827],"score":78.26},
		{"name":"长隆水上乐园","position":[113.331236,23.00596],"score":74.93},
		{"name":"上海野生动物园","position":[121.723604,31.059374],"score":72.39},
		{"name":"中华恐龙园","position":[120.009994,31.829242],"score":71.29},
		{"name":"珠海长隆海洋王国","position":[113.54499,22.104624],"score":71.17},
		{"name":"西溪湿地公园","position":[120.073998,30.274767],"score":70.92},
		{"name":"青岛海昌极地海洋世界","position":[120.449529,36.076396],"score":70.28},
		{"name":"东方明珠","position":[121.506368,31.245259],"score":70.10},
		{"name":"圣亚海洋世界","position":[121.577727,38.884699],"score":69.23},
		{"name":"长隆国际大马戏","position":[113.339106,23.009033],"score":68.97}
	]
	req.session.user = req.session.user;
	res.render('user',{ data:HotPlace });
})

router.get('/history',function(req,res){
	User.get(req.session.user.name,function(err,user){
		req.session.user = req.session.user;
		res.render('history',{data:user});
	});
})

router.get('/newjour',function(req,res){
	req.session.user = req.session.user;
	res.render('newjour',{data:req.session.user});
})

router.get('/recommend',function(req,res){
	var HotPlace = [
		{"name":"长隆野生动物世界","position":[113.327273,23.004827],"score":78.26},
		{"name":"长隆水上乐园","position":[113.331236,23.00596],"score":74.93},
		{"name":"上海野生动物园","position":[121.723604,31.059374],"score":72.39},
		{"name":"中华恐龙园","position":[120.009994,31.829242],"score":71.29},
		{"name":"珠海长隆海洋王国","position":[113.54499,22.104624],"score":71.17},
		{"name":"西溪湿地公园","position":[120.073998,30.274767],"score":70.92},
		{"name":"青岛海昌极地海洋世界","position":[120.449529,36.076396],"score":70.28},
		{"name":"东方明珠","position":[121.506368,31.245259],"score":70.10},
		{"name":"圣亚海洋世界","position":[121.577727,38.884699],"score":69.23},
		{"name":"长隆国际大马戏","position":[113.339106,23.009033],"score":68.97}
	]
	req.session.user = req.session.user;
	res.render('userrecom',{data:HotPlace});
})

module.exports = router;

module.exports.doReg = function(req,res){
		if(req.body['inputPassword2'] != req.body['inputPassword']){
			req.flash('error','两次输入不一致');
			return res.redirect('/reg');
		}
		//生成口令的散列值
		var MD5 = crypto.createHash('md5');
		var password = MD5.update(req.body.inputPassword).digest('base64');

		var newUser = new User({
			name:req.body.username,
			password:password
		});

		User.get(newUser.name,function(err,user){
			if(user) err = '用户名已经注册';
			if(err){
				req.flash('error',err);
				return res.redirect('/reg');
			}

			newUser.save(function(err){
				if(err){
					req.flash('error',err);
					return res.redirect('/reg');
				}

				req.session.user = newUser;
				req.flash('success','注册成功');
				res.redirect('/');
			})
		})
	}

module.exports.doLogin = function(req,res){
	var MD5 = crypto.createHash('md5');
	var password = MD5.update(req.body.password).digest('base64');

	var Luser = new User({
		name:req.body.username,
		password:password
	});

	User.get(Luser.name,function(err,user){
		if(user){
			if(Luser.password != user.password) err = '密码错误';
		}else{
			err = '用户名不存在';
		}
		if(err){
			req.flash('error',err);
			return res.redirect('/login');
		}
		req.session.user = Luser;
		req.flash('sucess','登陆成功');
		res.redirect('/');
	})

}

module.exports.doSave = function(req,res){
	var newjour = {
		startplace:req.body.startplace,
		endplace:req.body.endplace,
		time:req.body.time
	}

	User.savehis(req.session.user.name,newjour,function(err,result){
		if(err){
			req.flash('error',err);
			return res.redirect('/newjour');
		}
		req.session.user = req.session.user;
		req.flash('success','添加成功');
		res.redirect('/newjour')
	})
}

