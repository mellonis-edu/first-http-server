import http from 'http';

const server = http.createServer((request, response) => {
  switch (request.url) {
    case '':
    case '/index.html':
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.end(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test Server</title>
  </head>
  <body>
    <script type="module">
      import Person from '/modules/person.js';

      const person = new Person('Ruslan', 33);

      person.sayName();
    </script>
  </body>
</html>
      `);
      break;
    case '/modules/person.js':
      response.setHeader('Content-Type', 'application/javascript; charset=utf-8 ');
      response.end(`
export default class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(\`My name is \${this.name}\`);
  }
}
      `);
      break;
    default:
      response.statusCode = 404;
      response.end('Not found!');
      break;
  }
});

server.listen(80);
