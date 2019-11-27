interface attachment {
    fileUrl: string
    fileType: string
    createdBy: string
    id: number
}

interface history {
    reason: string
    status: string
}

export interface thread {
    name: string
    description: string
    createdAt: string
    profilePictureUrl: string
}

export interface detail {
    attachment: attachment[]
    caseName: string
    categoryName: string
    createBy: string
    createdAt: string
    description: string
    email: string
    handledBy: string
    history: history[]
    id: number
    invoiceCode: string
    serial: string
    thread: thread[]
    userCellphoneNumber: string
    userId: number
}

export default interface dataDetail {
    data: detail
    errorState?: boolean
    errorMsg?: string
    loading: boolean 
    message?: string
    status?: string
}
