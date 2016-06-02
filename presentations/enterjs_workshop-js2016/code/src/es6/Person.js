/**
 * Person module
 * @module person
 */
export default class Person {
	/**
     * What should I say, a person.
	 * @constructor
     * @param {string} name
	 * @param {number} age
     */
  constructor(name, age) {
    console.log('Person: ' + name);
    this._name = name;
  }

  get name() {
    return this._name;
  }

}
