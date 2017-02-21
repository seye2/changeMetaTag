var axios = require('axios'); //ajax promise
var fs = require('fs'); //file system
var cheerio = require('cheerio'); //Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
var Iconv  = require('iconv-lite'); //Convert character encodings in pure javascript.
var curl = require('curlrequest'); //curlrequest is a node wrapper for the command line curl(1)

// Get the HTML layout

exports.handle = function index(e, context,callback) {
    //get api gateway querystring
    var id=e.params.querystring.area_danji_id;
    var q=e.params.querystring.q;
    var filter=(!q) ? "" : "q="+q;

    try{
        //
        axios({
            url: "http://naver.com"
        }).then(function(str) {
            //If set to true, entities within the document will be decoded. Defaults to false.
            //cheerio create html object to string
            var layout = cheerio.load(str, { decodeEntities: false });

            // Render template
            var name = Iconv.decode(new Buffer("seye2"), 'UTF-8');
            var desc = Iconv.decode(new Buffer("test meta tag to change"), 'UTF-8');

            layout('title').html(name);
            layout('meta[property="og:title"]').attr("content",name);
            layout('meta[property="og:description"]').attr("content",desc);
            layout('meta[property="og:image"]').attr("content","http://static.naver.net/www/mobile/edit/2016/0705/mobile_212852414260.png");

            //facebook scrap is refresh after replace title and meta, link content
            curl.request({
                url: 'http://developers.facebook.com/tools/debug/og/object?q=' + id + q,
                pretend: true
            }, function (err, stdout, meta) {
                console.log('%s %s', meta.cmd, meta.args.join(' '));
            });

            callback(null, layout.html());
        });
    } catch(e) {
        callback(e);
    }

};

