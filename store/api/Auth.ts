import {defaultProps, Api} from "./ApiConfig"

interface dataLogin {
    email: string,
    grantAccess: string,
    token: string
}
export interface ServerData {
    data?: dataLogin
    status?: string
    message?: string
}

export interface Request {
    google_token: string,
	email: string,
	profile_picture_url: string | null,
	name: string | null,
	fcm_token: string
}

const props: defaultProps = {}
  
const Login = (data: Request) => Api(props).post<ServerData>(`auth`, JSON.stringify(data))

export default Login
