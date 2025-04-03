import axios from 'axios';

export default class UtilService {
    frontend_base_url: string;

    constructor(frontend_base_url: string) {
        this.frontend_base_url = frontend_base_url;
    }

    getEstados = async () => {
        try {
            const response = await axios.get(`${this.frontend_base_url}/json/estados.json`,{ params: {"includeToken": false}}); // Replace 'estados.json' with your actual file name
            return response.data;
        } catch (error) {
            console.error('Error fetching estados:', error);
            return [];
        }
    };
}