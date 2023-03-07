const { Test, TestingModule } = require('@nestjs/testing');
const { AuthController } = require('./auth.controller');
const { AuthService } = require('./auth.service');

describe('AuthController', () => {
  let controller;
  let authService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

   // controller = moduleRef.get(AuthController);
    //authService = moduleRef.get(AuthService);
  });

  describe('signUp', () => {
    it('should return a token when sign up is successful', async () => {
      const signUpDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        accountNumber: '1234567890',
      };
      const expectedResult = { token: 'testtoken', message: 'Account Created, Login to continue' };
      jest.spyOn(authService, 'signUp').mockResolvedValue(expectedResult);

      const result = await controller.signUp(signUpDto);

      expect(result).toBe(expectedResult);
    });

    it('should throw an error if email already exists', async () => {
      const signUpDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        accountNumber: '1234567890',
      };
      jest.spyOn(authService, 'signUp').mockRejectedValue(new Error('Email already exists'));

      await expect(controller.signUp(signUpDto)).rejects.toThrow('Email already exists');
    });

    it('should throw an error if account number already exists', async () => {
      const signUpDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        accountNumber: '1234567890',
      };
      jest.spyOn(authService, 'signUp').mockRejectedValue(new Error('Account number already exists'));

      await expect(controller.signUp(signUpDto)).rejects.toThrow('Account number already exists');
    });
  });

  describe('login', () => {
    it('should return a token and userId when login is successful', async () => {
      const loginDto = {
        email: 'test@example.com',
        accountNumber: '1234567890',
        password: 'password',
      };
      const expectedResult = { token: 'testtoken', userId: '123', message: 'Login successful' };
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(result).toBe(expectedResult);
    });

    it('should throw an error if email, account number, or password is invalid', async () => {
      const loginDto = {
        email: 'test@example.com',
        accountNumber: '1234567890',
        password: 'password',
      };
      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Invalid email, password, or account number'));

      await expect(controller.login(loginDto)).rejects.toThrow('Invalid email, password, or account number');
    });
  });
});
