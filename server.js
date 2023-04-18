const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

function isWordPalindrome(word) {
  // remove non-alphanumeric characters and convert to lowercase
  const cleanWord = word.replace(/[^0-9a-z]/gi, '').toLowerCase();
  // compare the clean word to its reverse
  return cleanWord === cleanWord.split('').reverse().join('');
}

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/palindrome') {
    if ('palindrome' in params) {
      const word = params['palindrome'];
      const isPalindrome = isWordPalindrome(word);
      const objToJson = {
        word: word,
        isPalindrome: isPalindrome
      };
      console.log(objToJson); // log the object before calling JSON.stringify()
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(objToJson));
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.end('Bad request');
    }
  } else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
