import Person from './person';

const person = new Person('Ruslan', 33);

const result = person.sayName();

document.getElementById('result').textContent = result;
