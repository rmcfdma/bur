import axios from 'axios';
import Service from './Service';

export default class BrudService extends Service {

  constructor(api_base_url: string) {
    super(api_base_url);
  }

  getBruds = async () => {
    try {
      const bruds = await axios.get(`${this.api_base_url}/bruds`, { params: { includeToken: false } })
      return bruds.data;
    } catch (error) {
      console.error(error)
    }
  }

  getBrudsByEstado = async (sigla: string) => {
    try {
      const bruds = await axios.get(`${this.api_base_url}/bruds/estado/${sigla}`, { params: { includeToken: true } })
      return bruds.data;
    } catch (error) {
      console.error(error)
    }
  }
}