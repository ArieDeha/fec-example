import {defaultProps, Api} from "./ApiConfig"

class Ticket {
    props: defaultProps;
    constructor(params: defaultProps) {
        this.props = params
    }

    getAll = (search: string, status: string, page: number) => Api(this.props).get(`ticket?search_text=${search}&status=${status}&page=${page}`)
    public getBySerial (serial: string) {
        return Api(this.props).get(`ticket/detail/${serial}`)
    }
}


export default Ticket