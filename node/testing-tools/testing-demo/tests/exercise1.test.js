const lib = require('../exercise1');

describe('fizzbuzz', () => {
  it('should throw an error if the input is NaN', () => {
    expect(() => { lib.fizzBuzz('Tez') }).toThrow()
    expect(() => { lib.fizzBuzz(null) }).toThrow()
  })

  it('should return FizzBuzz if input is evenly divisible by 3 and 5', () => {
     const result = lib.fizzBuzz(15);
     expect(result).toBe('FizzBuzz');
  })

  it('should return Fizz if input is evenly divisible by 3 but not 5', () => {
     const result = lib.fizzBuzz(3);
     expect(result).toBe('Fizz');
  })

  it('should return Buzz if input is evenly divisible by 5 but not 3', () => {
     const result = lib.fizzBuzz(5);
     expect(result).toBe('Buzz');
  })

  it('if number is not evenly divisible by 5 or 3 return number', () => {
     const result = lib.fizzBuzz(1);
     expect(result).toBe(1);
  })

})
