const http = require('http');

const httpUtils = require('./lib/httpUtils');

const hostname = '0.0.0.0';
const port = 1337;

const todos = [{
  id: 1,
  title: 'Buy some milk',
  complete: false
}, {
  id: 2,
  title: 'Book appointment with the dentist',
  complete: false
}, {
  id: 3,
  title: 'Post the letter',
  complete: false
}];

http.createServer((req, res) => {
  console.log(req);
  if (req.url === '/todos') {
    if (req.method == 'POST') {
      httpUtils.extractPostBody(req, (err, payload) => {
        const todo = JSON.parse(payload);
        todo.id = todos.length + 1;
        todo.complete = false;
        todos.push(todo);
        res.writeHead(201, {
          'Content-Type': 'application/json',
          'Location': `/todos/${todo.id}`
        });
        res.end();
      });
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(todos));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
