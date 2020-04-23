const 
    http = require('http'),
    fs   = require('fs'),
    path = require('path'),
    handlebars = require('handlebars');

require('dotenv').config();

const servePage = (res, pageName) => {
    res.writeHead(200);
    let stream = fs.createReadStream('views/' + pageName);
    stream.pipe(res);
            
};

const serverPublicFile = (res, url) => {
    res.writeHead(200);
    let stream = fs.createReadStream(path.join(__dirname, url)); 
    stream.pipe(res);
}

const server = http.createServer((req, res) => {
    console.log('Requesting ' + req.url);

    if (req.url.startsWith('/public')) {
        serverPublicFile(res, req.url);
        return;
    }


    switch (req.url) {
        case '/settings':
            servePage(res, 'settings.html');
            break;
        default:
            servePage(res, 'home.html');
            break;
    }
});


server.listen(process.env.PORT, () => {
    
    console.log('Server listening at port ' + process.env.PORT);
});

