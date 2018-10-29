import BaseService from './BaseService';


export default class TwiloClientService extends BaseService {
    constructor(domain) {
        super(domain)
    }

    async post(data){
        try {
            const res = await this.axios.post(`${this.RootURL}/${this.domain}`, data);
            return res.data;
        } catch (error) {
            console.log(error);
            return { error: true}
        }
    }
    
}

