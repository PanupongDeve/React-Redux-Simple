
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3004');

export default class BaseSocket {
    constructor(domain) {
        this.domain = domain;
        this.socket = socket;
        this.fetchAllUrl = `${this.domain}/fetchAll`;
        this.fetchByIdUrl= `${this.domain}/fetchById`;
        this.createDataUrl = `${this.domain}/create`;
        this.updateDataUrl = `${this.domain}/update`;
    }

    async getAll(functionReciveData) {
        socket.emit(this.fetchAllUrl, 'fetchAll');
        socket.on(this.fetchAllUrl, (data) => {
            functionReciveData(data);
        });
    }

    async getById(functionReciveData, response) {
        socket.emit(this.fetchByIdUrl, response);
        socket.on(this.fetchByIdUrl, (data) => {
            functionReciveData(data);
        });
    }

    async create(data) {
        socket.emit(this.createDataUrl, data);
    }

    async update(response) {
        socket.emit(this.updateDataUrl, response); 
    }
}