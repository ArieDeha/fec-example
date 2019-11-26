import axios, {AxiosResponse} from "axios";
import{Image as img} from 'react-native-image-crop-picker';

export interface responseImage {
    status: string,
    data: dataImage[]
    message: string
}

export interface dataImage {
    serial: string,
    type: string,
    file: string,
    fullpath: string
}

class Image {
    public upload(file: img): Promise<AxiosResponse<responseImage>> {
        const formData = new FormData()
        let photo = {
            uri: file.path,
            type: file.mime,
            name: file.filename,
        };
        
        formData.append('file',photo)
        formData.append('type', 'nik')

        let instance = axios.create({
            baseURL: "https://gw.ruangguru.com/api/v3/",
            validateStatus: function (status: number) {
                return status < 500; 
            },
            timeout: 3000,
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return instance.post('upload-general-asset', formData)
    }
}

export default Image