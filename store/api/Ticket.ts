import {defaultProps, Api} from "./ApiConfig"

export interface threadImage {
    file_url: string
    file_type: string
}

export interface submitThread {
    serial: string
    description: string
    attachment: threadImage[]
}

export interface responseSubmitThread {
    status: string
    message: string
    data: dataSubmitThread
}

interface dataSubmitThread {
    attachmentId: string
    createdAt: string
    createdBy: string
    description: string
    id: number
    name: string
    profilePictureUrl: string
}

class Ticket {
    props: defaultProps;
    constructor(params: defaultProps) {
        this.props = params
    }

    getAll = (search: string, status: string, page: number) => Api(this.props).get(`ticket?search_text=${search}&status=${status}&page=${page}`)
    public getBySerial (serial: string) {
        return Api(this.props).get(`ticket/detail/${serial}`)
    }
    postThread = (data: submitThread) => Api(this.props).post('thread/new', JSON.stringify(data))
}


export default Ticket