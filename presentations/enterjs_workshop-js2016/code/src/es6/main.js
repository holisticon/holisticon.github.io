import Person from './Person.js';
var pete = new Person('Pete', 72);

var firstName = 'pete';

var x = new Person(firstName, 72);

if (pete === 'pete') {
	console.log('hello', firstName, x);
}

