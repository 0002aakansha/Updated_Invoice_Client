export interface dataProps {
    _id: string,
    description: string,
    period?: string,
    workingDays?: string,
    totalWorkingDays?: string,
    hours?: string,
    amount?: string | number,
    projectAmount?: number,
    rate?: { currency: string, rate: string },
    conversionRate?: number,
    checked: boolean
}

export interface childrenProps {
    children: JSX.Element | JSX.Element[] | string
}

export interface loginType {
    email: string,
    password: string
}

export interface userType {
    _id: string,
    name: string,
    email: string,
    gstin: string,
    pan: string,
    account: {
        acc_no: number | string,
        bank: string,
        ifsc: string
    },
    address: {
        street: string,
        city: string,
        state: string,
        pin: number | string,
        country: string
    },
    contact: number | string
}

export interface clientType {
    _id: string,
    name: string,
    gstin: string,
    address: {
        street: string,
        city: string,
        pin: number,
        state: string,
        country: string
    }
}

export interface projectType {
    _id: string,
    description: string,
    rate: {
        currency: string,
        rate: string | number
    },
    projectAmount: number,
    conversionRate: number,
}

export interface userStateType {
    user: userType,
    isLoading: boolean,
    error: string
}

export interface projectStateType {
    projects: projectType[],
    isLoading: boolean,
    error: { status: number | string, message: string }
}

export interface clientStateType {
    clients: clientType[],
    isLoading: boolean,
    error?: { status: number | string, message: string }
}

export interface invoiceStateType {
    invoiceType: string;
    isChecked: boolean,
    setisChecked: (value: boolean) => void
    setInvoiceType: (type: string) => void
    projectDataType: dataProps[],
    setDataOnChecked: (value: dataProps) => void,
    setterOfProjectDataType: (value: dataProps[]) => void
    calculateSubtotal: () => void,
    subtotal: number
};
