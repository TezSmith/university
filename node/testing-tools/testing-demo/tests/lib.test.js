const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')

describe('absolute', () => {
  it('should return positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1)
  })
  
  it('should return positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1)
  })
  
  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0)
  })
})

describe('greet', () => {
  it('should return greeting message', () => {
    const result = lib.greet('Tez')
    expect(result).toMatch(/Tez/)
    expect(result).toContain('Tez')
  })
})

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
  })
})

describe('getProduct', () => {
  it('should return product with the given id ', () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 })
    expect(result).toMatchObject({ id: 1, price: 10 }) 
    expect(result).toHaveProperty('id', 1) 
  })
})

describe('registerUser', () => {
  const args = [null, undefined, NaN, '', 0, false]
  test.each(args)('should throw if username is falsy', (firstArg) => {
    expect(() => { lib.registerUser(firstArg); }).toThrow();
  })

  //  Before Jest 23
  // it('should throw if username is falsy ', () => {
    // Falsy: Null, undefined, NaN, '', 0, false
    // const args = [[null, Error], [undefined, Error]]
    // args.forEach(a => expect(() => { lib.registerUser(a); }).toThrow())
  // })

  it('should return a user object if a valid username is passed', () => {
    const result = lib.registerUser('Tez')
    expect(result).toMatchObject({ username: 'Tez'})
    expect(result.id).toBeGreaterThan(0)
  })
})

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId) {
      console.log('Fake DB reading customer...')
      return { id: customerId, points: 20 }
    }
    
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order)
    expect(order.totalPrice).toBe(9)
  })
})

describe('notifyCustomer', () => {
  it('should send email to the customer', () => {

    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1)
    // mockFunction.mockResolvedValue(1) // Promise
    // mockFunction.mockRejectedValue(new Error('...')) // Rejected Promise
    // const result = await mockFunction();

    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })

    // db.getCustomerSync = function (customerId) {
    //   console.log('Fake DB reading customer...');
    //   return { email: 'a' };
    // };

    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled(); // Checks if fn was triggered
    // expect(mail.send).toHaveBeenCalledWith('a'); // Best fro sending in Number & Booleans arguments
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)

  });
});