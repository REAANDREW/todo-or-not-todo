curl -X DELETE http://0.0.0.0:1337/todos/2
curl http://0.0.0.0:1337/todos
echo

curl -X DELETE http://0.0.0.0:1337/todos/2
curl http://0.0.0.0:1337/todos
echo

curl -X POST -H "Content-type: application/json" -d '{"title":"A new todo", "complete" : false}' http://0.0.0.0:1337/todos
echo
curl http://0.0.0.0:1337/todos
echo
