import axios from 'axios';

export default class AuthService {
  api_base_url: string;

  constructor(api_base_url: string) {
    this.api_base_url = api_base_url;
  }

  tokenIsValid = async () => {
    try {
      const resultado = await axios.get(`${this.api_base_url}/auth`, { params: { includeToken: true } })
      return resultado.data;
    } catch (error) {
      console.error(error)
      return null
    }
  }

  
}