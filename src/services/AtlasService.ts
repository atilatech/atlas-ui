import axios, { AxiosRequestConfig } from 'axios';
import Environment from './Environment';

export class AtlasService {

  static async search(query: string, url: string = '') {

    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${Environment.atilaCoreServiceApiUrl}/atlas/search`,
      data: { q: query, url },  // Add request body here
    };

    const token = localStorage.getItem('token')!;

    if (token) {
      options.headers = {
        'Authorization': `Bearer ${token}` 
      }
    }

    const response = await axios.request(options);
    return response;
  }
}
