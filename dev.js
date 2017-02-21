var axios = require('axios');
var fs = require('fs');
var cheerio = require('cheerio');
var Iconv  = require('iconv-lite');

// Get the HTML layout
axios({
    url: "http://naver.com"
}).then(function(res) {
    //If set to true, entities within the document will be decoded. Defaults to false.
    //cheerio create html object to string
    var layout = cheerio.load(res, { decodeEntities: false });

    // Render template
    var name = Iconv.decode(new Buffer("seye2"), 'UTF-8');
    var desc = Iconv.decode(new Buffer("test meta tag to change"), 'UTF-8');

    layout('title').html(name);
    layout('meta[property="og:title"]').attr("content",name);
    layout('meta[property="og:description"]').attr("content",desc);
    layout('meta[property="og:image"]').attr("content","http://static.naver.net/www/mobile/edit/2016/0705/mobile_212852414260.png");

    //var html = Iconv.decode(new Buffer(layout.html()), 'euc-kr');
    console.log(layout.html());
});
