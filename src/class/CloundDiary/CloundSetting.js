

export default class CloundSetting {
    constructor() {
        this.cloundName = 'panupongapi',
        this.api_key = '725313154266889'
        this.api_secret = 'YvxdH33CxBeivj5MTOmFCxqpmdk'
    }

    getSetting() {
        return {
            cloud_name: this.cloundName,
            api_key: this.api_key,
            api_secret: this.api_secret
        }
    }
}