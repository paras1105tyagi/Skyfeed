import UserService from '../../src/service/user-service.js';
import UserRepository from '../../src/repository/user-repository.js';
import User from '../../src/models/user.js';

jest.mock('../../src/repository/user-repository.js');
 

describe('user service signup test',() => {
    test('should signup a user', async () => {
        const data ={
            email: 'a@google.com',
            password: 'abcd1234',
        };

        (UserRepository.prototype.create).mockReturnValue({...data, createdAt:'2025-10-01', updatedAt: '2025-10-01'});
        const service = new UserService();
        const response = await service.signup(data);
        expect(response.email).toBe(data.email);

    });
})