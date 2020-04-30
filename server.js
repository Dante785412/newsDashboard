const 
    expressHandlebars = require('express-handlebars');
    express = require('express');
require('dotenv').config();

const server = express();  // Mit Express einen Server erstellen

server.set('viewDir', 'views');     // server.set wo sind die Templates zu finden sind viewdir wird auf views gesetzt

const logUrlMiddleware = (req, res, next) => {
    console.log(req.url);
    next();
};

server.use(logUrlMiddleware);

server.use(express.static('public'));   // express.static middleware 'public' Verzeichnis das die statischen Dateien enthält

server.set('view engine', 'html');          // standart engine 

server.engine('html', expressHandlebars({   // Welche Template Engine soll benutzt werden
    extname: 'html'
}));

const renderHome = (req, res) => {
    res.render('home', {
    title: 'News',
    heading: 'Welcome to the news dashboard!!',
    homeActive: true,
     settingsActive: false,
    articles
     });
    };

const renderSettings = (req, res) => {
    res.render('settings', {
        title: 'Settings',
        heading: 'Settings',
        settingsActive: true
    });
};

server.get('/', renderHome);
server.get('/home', (req, res) => {         // routing mit server.get (http get request)
    res.render('home', {                    // mit res.render die Antwort (response) 
        title: 'News',                      // festlegen 'home' ist der Template name
        heading: 'Welcome to the news dashboard!!',     // und dann die Platzhalter
        homeActive: true,                   // title: 'News' usw.
        settingsActive: false,
        articles
    });
});
server.get('/admin', renderSettings); 
server.get('/settings', renderSettings);

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

server.listen(process.env.PORT, () => {          //  Server starten mit server.listen          
    
    console.log('Server listening at port ' + process.env.PORT);
});

