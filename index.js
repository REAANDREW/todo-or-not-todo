const http = require('http');

const TodoService = require('./lib/todoService');

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

const todoService = new TodoService(todos);

http.createServer((req, res) => {
  if (req.url === '/todos') {
    if (req.method == 'POST') {
      todoService.create(req, res);
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(todos));
    }
  } else if (req.url.indexOf('/todos/') > -1 && req.method == 'GET') {
    todoService.get(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
