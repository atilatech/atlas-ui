import axios, { AxiosResponse } from 'axios';
import { UserProfile } from '../models/UserProfile';
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

  static async getUserProfile(userId: string): Promise<AxiosResponse<UserProfile>> {
    const token = localStorage.getItem('token')!;
    const options = {
      method: 'GET',
      url: `${Environment.atilaCoreServiceApiUrl}/userprofile/userprofile/${userId}/`,
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    };

    const response = await axios.request(options);
    return response;
  }
}
