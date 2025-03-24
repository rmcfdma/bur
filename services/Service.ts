export default class Service {
    protected api_base_url: string;
  
    constructor(api_base_url: string) {
      this.api_base_url = api_base_url;
    }
}