export default class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    return `My name is ${this.name}`;
  }
}
