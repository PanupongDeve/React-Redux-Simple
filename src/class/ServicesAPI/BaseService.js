import axios from 'axios';
import openSocket from 'socket.io-client';

const RootURL = 'http://localhost:3004';
const socket = openSocket('http://localhost:3004');

export default class BaseService {
    constructor(domain) {
        this.axios = axios;
        this.RootURL = RootURL;
        this.domain = domain;
        this.socket = socket;
        this.fetchAllUrl = `${this.domain}/fetchAll`;
    }

    async getAllWithSocket(functionReciveData) {
        socket.emit(this.fetchAllUrl, 'fetchAll');
        socket.on(this.fetchAllUrl, (data) => {
            functionReciveData(data);
        });
    }

    async get(){
        try {
            const res = await this.axios.get(`${this.RootURL}/${this.domain}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return { error: true}
        }   
    }
    async getById(id){
        try {
            const res = await this.axios.get(`${this.RootURL}/${this.domain}/${id}`);
            return res.data[0];
        } catch (error) {
            console.log(error);
            return { error: true}
        } 
    }

    async post(data){
        try {
            const res = await this.axios.post(`${this.RootURL}/${this.domain}/create`, data);
            return res.data;
        } catch (error) {
            console.log(error);
            return { error: true}
        }
    }
    async edit(id, data){
        try {
            const res = await this.axios.patch(`${this.RootURL}/${this.domain}/${id}`, data);
            return res.data;
        } catch (error) {
            console.log(error);
            return { error: true}
        } 
    }
    async remove(id) {
        try {
            const res = await this.axios.delete(`${this.RootURL}/${this.domain}/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return { error: true}
        } 
    }
}