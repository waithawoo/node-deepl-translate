let deeplApi = require("deepltranslate")

let deeplTranslation = new deeplApi({token: 'this is token'})

deeplTranslation.translate("hello", "en", "ja").then((res)=>{
    console.log(res);
})

deeplTranslation.getLanguages().then((res)=>{
    console.log(res);
})