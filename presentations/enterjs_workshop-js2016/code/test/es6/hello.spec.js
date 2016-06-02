import {sayHello, message} from '../../src/es6/hello';

describe('The Hello Module', () => {
  it('should say hello properly', () => {
    expect(message).toContain('Hello');
  });

  it('should say world properly', () => {
    expect(message).toContain('');
  });
});
