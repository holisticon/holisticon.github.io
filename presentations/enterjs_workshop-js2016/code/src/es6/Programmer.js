import {nameDerPerson as name, log} from './util';
import Person from './Person';

export {log} from './util';
// export {default as Person} from './Person';

class Programmer extends Person {
  constructor(name, language) {
    console.log('Programmer');
    super(name);
  }
}

export default Programmer;
export {Person};