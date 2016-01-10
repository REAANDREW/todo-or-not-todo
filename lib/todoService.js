const httpUtils = require('./httpUtils');

const extractTodoId = (req) => {
  var parts = req.url.substring(1).split('/');
  var id = parseInt(parts[1]);
  return id;
}

class TodoService {

  constructor(todos) {
    this.todos = todos;
    this.currentId = this.todos.length;
  }

  create(req, res) {
    httpUtils.extractJsonPostBody(req, (err, todo) => {
      todo.id = ++this.currentId;
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
    var id = extractTodoId(req);

    var todo = this.todos.find((element, index, array) => {
      return element.id === id;
    });

    res.writeHead(200);
    res.end(JSON.stringify(todo));
  }
  update(req, res) {
    var id = extractTodoId(req);

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
  delete(req, res) {
    var id = extractTodoId(req);

    var todoIndex = this.todos.findIndex((element, index, array) => {
      return element.id === id;
    })
    if (todoIndex > -1) {
      this.todos.splice(todoIndex, 1);
      res.writeHead(204);
    } else {
      res.writeHead(404);
    }
    res.end();
  }
}

module.exports = TodoService;
