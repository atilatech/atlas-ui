import axios from 'axios';
import Environment from './Environment';

export class AtlasService {
  static API_URL = 'https://atila-core-service.herokuapp.com';

  static async search(query: string, url: string = '') {
    const options = {
      method: 'POST',
      url: `${Environment.atilaCoreServiceApiUrl}/atlas/search`,
      data: { q: query, url },  // Add request body here
    };

    const response = await axios.request(options);
    return response;
  }
}
