var http = require('http');
var static = require('node-static');
var file = new static.Server('./public/');

http.createServer(function (req, res) {
    if (req.url.indexOf('/api/') === -1) {
        file.serve(req, res);
    } else {
        var urlParts = req.url.split('/');

        switch (urlParts[urlParts.length - 2]) {
            case "questions":
                if (req.method === "GET") {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({
                        "000-display-vocabulary-with-image": {
                            "title": "Study the words",
                                "data": [
                                {
                                    "lang1": "Hello",
                                    "lang2": "Hallo",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                },
                                {
                                    "lang1": "I am Sandra",
                                    "lang2": "Ich Bin Sandra",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                },
                                {
                                    "lang1": "How are you?",
                                    "lang2": "Wie geht's?",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                },
                                {
                                    "lang1": "Fine thank you",
                                    "lang2": "Gut danke",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                }
                            ]
                        },
                        "001-match-vocabulary-1-with-image": {
                            "title": "Choose the correct translation",
                            "data": [
                                {
                                    "lang1": "Hello",
                                    "lang2": "Hallo",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                },
                                {
                                    "lang1": "I am Sandra",
                                    "lang2": "Ich Bin Sandra",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                },
                                {
                                    "lang1": "How are you?",
                                    "lang2": "Wie geht's?",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                },
                                {
                                    "lang1": "Fine thank you",
                                    "lang2": "Gut danke",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg"
                                }
                            ]
                        },
                        "002-match-vocabulary-n-wo-image": {
                            "title": "Match the items",
                            "data": [
                                {
                                    "lang1": "the fruit",
                                    "lang2": "das Obst"
                                },
                                {
                                    "lang1": "the vegetables",
                                    "lang2": "das Gemuse"
                                },
                                {
                                    "lang1": "the cheese",
                                    "lang2": "der Kase"
                                },
                                {
                                    "lang1": "the sausage",
                                    "lang2": "die Wurst"
                                }
                            ]
                        },
                        "003-write-vocabulary-with-image": {
                            "title": "Write the translation",
                            "data": [
                                {
                                    "lang1": "Hello!",
                                    "lang2": "Hallo!",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg",
                                    "startsFromChar": 1,
                                    "countChar": 5
                                },
                                {
                                    "lang1": "I am Sandra.",
                                    "lang2": "Ich Bin Sandra.",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg",
                                    "startsFromChar": 1,
                                    "countChar": 7
                                },
                                {
                                    "lang1": "How are you?",
                                    "lang2": "Wie geht's?",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg",
                                    "tooltip": "<i>Wie geht's?</i> is short for <i>Wie geht es?</i> (lit. How goes it?). The <i>'s</i> replaces <i>es</i>.",
                                    "startsFromChar": 1,
                                    "countChar": 8
                                },
                                {
                                    "lang1": "Fine, thank you.",
                                    "lang2": "Gut, danke.",
                                    "img": "http://scaleflex.cloudimg.io/crop/200x200/x/sample.li/birds.jpg",
                                    "startsFromChar": 1,
                                    "countChar": 3
                                }
                            ]
                        }
                    }));
                } else {
                    res.statusCode = 404;
                    res.end();
                }
                break;

            case "check-question":
                if (req.method === "GET") {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({
                        //"go_to_another_question": 900,
                        // "total_progression": 21,
                        "result": {
                            "status": "success",
                            "msg": "Answer accepted successfully!"
                        }
                    }));
                } else {
                    res.statusCode = 404;
                    res.end();
                }
                break;
        }
        res.statusCode = 404;
        res.end("Page not found");
    }
}).listen(8080);

console.log('Server running on port 8080');
