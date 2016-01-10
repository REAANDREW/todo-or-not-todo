const httpUtils = require('./httpUtils');

class TodoService {

  constructor(todos) {
    this.todos = todos;
  }

  create(req, res) {
    httpUtils.extractJsonPostBody(req, (err, todo) => {
      todo.id = this.todos.length + 1;
      todo.complete = false;
      this.todos.push(todo);
      res.writeHead(201, {
        'Content-Type': 'application/json',
        'Location': `/todos/${todo.id}`
      });
      res.end();
    });
  }
  get(req, res) {
    var parts = req.url.substring(1).split('/');

    var id = parseInt(parts[1]);

    var todo = this.todos.find((element, index, array) => {
      return element.id === id;
    });

    res.writeHead(200);
    res.end(JSON.stringify(todo));
  }
  update(req, res) {
    var parts = req.url.substring(1).split('/');

    var id = parseInt(parts[1]);

    httpUtils.extractJsonPostBody(req, (err, todo) => {

      var todoIndex = this.todos.findIndex((element, index, array) => {
        return element.id === id;
      })

      todo.id = this.todos[todoIndex].id;
      this.todos[todoIndex] = todo;

      res.writeHead(204);
      res.end();
    });
  }
}

module.exports = TodoService;
