import axios from 'axios';
import Environment from './Environment';

export class UserProfileService {

  static async create(email: string, username: string, password: string) {
    const options = {
      method: 'POST',
      url: `${Environment.atilaCoreServiceApiUrl}/atila/users/`,
      data: { user: { email, username, password} },
    };

    const response = await axios.request(options);
    return response;
  }

  static async login(username: string, password: string) {
    const options = {
      method: 'POST',
      url: `${Environment.atilaCoreServiceApiUrl}/atila/users/login/`,
      data: { username, password },
    };

    const response = await axios.request(options);
    return response;
  }
}
