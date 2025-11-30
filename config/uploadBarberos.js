import {createUploader} from "./uploadBuilder.js"


console.log('Subiendo...')
const uploadFotoBarbero = createUploader({
    folder : 'barberos',
    allowedTypes : ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB : 3
})


export {
    uploadFotoBarbero
}