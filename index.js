const http = require('http');

const hostname = '0.0.0.0';
const port = 1337;

const todos = [
	'Buy some milk',
	'Book appointment with the dentist',
	'Post the letter'
];

http.createServer((req, res) => {
  console.log(req.url);
  if(req.url === '/todos'){
     res.writeHead(200, { 'Content-Type': 'text/plain' });
     res.end(todos.join('\n')+'\n');
  }else{
     res.writeHead(404);
     res.end();   
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
