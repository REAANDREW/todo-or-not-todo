curl -X DELETE http://0.0.0.0:1337/todos/2
curl -X POST -H "Content-type: application/json" -d '{"title":"A new todo", "complete" : false}' http://0.0.0.0:1337/todos
curl http://0.0.0.0:1337/todos
echo
