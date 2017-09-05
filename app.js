var express = require("express"); 
var request = require("request");
var bodyParser = require("body-parser");
var bitcore = require("bitcore-lib");
var app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set("view engine","ejs");
request({
	url :"https://blockchain.info/ticker",
	json : true
},function(err,res,body){
	price = body.USD.last
});
app.get("/wallet",function(req,res){
	res.render("wallet",{
		lastPrice : price 
	});
});
app.get("/converter",function(req,res){
	res.render("converter",{
		lastPrice : price 
	});
});
app.get("/",function(req,res){
	res.render("index",{
		lastPrice : price 
	});
});
app.post("/wallet",function(req,res){
	var brainsrc = req.body.brainsrc;
	var input = new Buffer(brainsrc);
	var hash = bitcore.crypto.Hash.sha256(input);
	var bn = bitcore.crypto.BN.fromBuffer(hash);
	var pk = new bitcore.PrivateKey(bn).toWIF();
	var addy = new bitcore.PrivateKey(bn).toAddress();
	console.log("public Key"+":" + pk);
	console.log("your addr is" + " : " + addy);
	res.send("Brain wallet of: " + brainsrc + "<br> Addy :" + addy + "<br> Private Key :" + pk);
	
});


app.listen(8080,function(){
	console.log("app is running on 8080");
}); 