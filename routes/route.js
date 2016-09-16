

module.exports = function(app){
	app.post('/reg',function(req,res){
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
				req.flash('access','注册成功');
				res.redirect('/');
			})
		})
	})
}
