const https = require('https');
const deeplTranslateError = require('./deeplTranslateError');

class deeplApi {

    hostname = 'api.deepl.com';
    headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    API_LANGUAGE_RESOURCE = 'languages';
    API_TRANSLATE_RESOURCE = 'translate';
    API_VERSION = '2';

    #_token;
    #options;
    constructor(options) {
        this.#options = {
            hostname : this.hostname,
            ...options
        }
        this.hostname = this.#options.hostname;
        this.#_token = this.#options.token;
    }

    translate = async (text, source_lang, target_lang, split_sentences = 0) => {
        let prefix = `/v${this.API_VERSION}/${this.API_TRANSLATE_RESOURCE}?auth_key=${this.#_token}&`;
        let path = this.#buildPath(prefix, {text:text,source_lang:source_lang,target_lang:target_lang,split_sentences:split_sentences})
        try{
            const response = await this.#requestAPI(path)
            if(response.message) throw new deeplTranslateError(JSON.stringify(response.message))
            return response.translations[0].text
        }catch(error){
            throw error
        }
    }

    getLanguages =  async (type = 'source') => {
        let prefix = `/v${this.API_VERSION}/${this.API_LANGUAGE_RESOURCE}?auth_key=${this.#_token}&`;
        let path = this.#buildPath(prefix, {type:type})
        try {
            const response = await this.#requestAPI(path)
            if(response.message) throw new deeplTranslateError(JSON.stringify(response.message))
            return response
        }catch(error){
            throw error
        }
    }

    #buildPath = (prefix, parameters) =>{
        let params = new URLSearchParams(parameters);
        let body = prefix+params.toString();

        return body;
    }

    #requestAPI = (path) =>{
        return new Promise(resolve => {
            const options = {
                hostname: this.hostname,
                port: 443,
                path: path,
                method: 'GET',
                headers: this.headers,
                // rejectUnauthorized:false
            }

            const req = https.request(options, res => {
                let data = [];

                res.on('data', chunk => {
                  data.push(chunk);
                });

                res.on('end', () => {
                  const result = JSON.parse(Buffer.concat(data).toString());
                  resolve(result);
                });

            })
            req.on('error', error => {
                throw new deeplTranslateError(JSON.stringify(error))
            })
            req.end()
        });

    }
}

module.exports = deeplApi
