import axios, {AxiosInstance} from "axios";

const baseURL = "https://gw-staging.ruangguru.com/fec-ticketing/"
const getHeader = (token?: string) => ({
    "Content-Type": "application/json",
    "Authorization": token
})

export interface defaultProps {
    token?: string,
    callBackUnauthorize?: (this: void) => void
}

const Config = (props: defaultProps) => {
    return {
        baseURL: baseURL,
        validateStatus: function (status: number) {
            return status < 500; 
        },
        timeout: 3000,
        headers: getHeader(props.token)
    }
}

export const Api = (props: defaultProps): AxiosInstance => {
    let instance = axios.create(Config(props))

    instance.interceptors.response.use(response => response,
        error => {
            console.log(error)
            if (error.response) {
                return Promise.reject(error);
            }

            const {status} = error.response;

            if (status === 401 && props.callBackUnauthorize) {
                props.callBackUnauthorize()
            }
        return Promise.reject(error);
    })
    return instance
}

export default Config