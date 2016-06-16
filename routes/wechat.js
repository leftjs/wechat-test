/**
 * Created by Maggie on 6/15/16.
 */
var OAuth=require('wechat-oauth');
var config = require('config');
var express = require('express');
var router = express.Router();

//get cfginfo
var app_id      = 'wx926e5c3031482d64';
var app_secret  = '248630d1718eab25774b5414f944d0f8';
var domain = 'http://qs-admin.lefttjs.com';

// 微信授权和回调npm s
var client = new OAuth(app_id, app_secret);

// 主页,主要是负责OAuth认证
router.get('/', function(req, res) {

    var url = client.getAuthorizeURL(domain + '/weixin/callback','123','snsapi_userinfo');
    console.log(url)
    res.redirect(url)
})

/**npm
 * 认证授权后回调函数
 *
 * 根据openid判断是否用户已经存在
 * - 如果是新用户，注册并绑定，然后跳转到手机号验证界面
 * - 如果是老用户，跳转到主页
 */
router.get('/callback', function(req, res) {
    console.log('----weixin callback -----')
    var code = req.query.code;



    client.getAccessToken(code, function (err, result) {
        console.dir('err',err)
        console.dir('result', result)
        var accessToken = result.data.access_token;
        var openid = result.data.openid;

        console.log('token=' + accessToken);
        console.log('openid=' + openid);
        client.getUser(openId, function(err,result){
    			if(err) return next(err)
    			console.log('result', result)
    			res.json(result)
		      })

    });
});

module.exports = router;
