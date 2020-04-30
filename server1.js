const 
    http = require('http'), // http ist ein COREMODUL
    fs   = require('fs'),   // Kopieren der htmlDateien in die Respone mit filesystemModul
    path = require('path'),
    handlebars = require('handlebars');

require('dotenv').config();



const articles = [
    {
        url: 'https://example.com',
        title: 'Am Sonntag ist....'
    },
    {
        url: 'https://example.com',
        title: 'Bayern kauft Rona....'
    },
    {
        url: 'https://example.com',
        title: 'Wirtschaft schwächelt diesen Sommer....'
    }
];
const registerPartials = () => { 
var part = fs.readdirSync('views/partials/');
for (var i = 0; i < part.length; i++) {
console.log(part[i].slice(0, -5));


    fs.readFileSync('views/partials/' + part[i], 'utf-8');
    handlebars.registerPartial(part[i].slice(0, -5), html);

};
};
/*const registerPartials = () => {
    const html = fs.readFileSync('views/partials/head.html', 'utf-8');
    handlebars.registerPartial('head', html);

    const navHtml = fs.readFileSync('views/partials/navigation.html', 'utf-8');
    handlebars.registerPartial('navigation', navHtml);
};
*/
registerPartials();

const servePage = (res, pageName, data) => {      // Streams wie ein Netflix-Stream (Daten werden ein zu eins ausgegeben, die veränderung wird dynamisch ausgegeben)
/*  res.writeHead(200);                     // Antwortkopf schreiben Statuscode 200 = OK
    let stream = fs.createReadStream('views/' + pageName); // Streams = Datenquelle aus der dynamisch gelesen wird
    stream.pipe(res); */                                      // writeStream Ziel verknüpfen 
    
    
    fs.readFile('views/' + pageName, 'utf-8', (err, html) =>{
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end();
        }else {
            res.writeHead(200);
            const templateFunction = handlebars.compile(html);
            res.end(templateFunction(data || {}));
        }
    });
    
};

const serverPublicFile = (res, url) => {
    res.writeHead(200);                     // Statuscode 200 = OK
    let stream = fs.createReadStream(path.join(__dirname, url)); 
    stream.pipe(res);
}
                                                    // Wir sind die Serverseite
const server = http.createServer((req, res) => {  // webserver anlegen (request eingehende Anfrage untersuchen)
                                                    // (response ausgehende Antwort festlegen)
    console.log('Requesting ' + req.url); 
        

    if (req.url.startsWith('/public')) {
        serverPublicFile(res, req.url);
        return;
    }


    switch (req.url) {
        case '/settings':
            servePage(res, 'settings.html', {
                title: 'Settings',
                heading: 'Settings',
                settingsActive: true
            });
            break;
        default:
            servePage(res, 'home.html', {
                title: 'News',
                heading: 'Welcome to the news dashboard!!',
                homeActive: true,
                settingsActive: false,
                articles
            });
            break;
    }
});


server.listen(process.env.PORT, () => {
    
    console.log('Server listening at port ' + process.env.PORT);
});

