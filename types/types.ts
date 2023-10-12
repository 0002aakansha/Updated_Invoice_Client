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

export interface invoiceContextType {
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

export interface childrenProps {
    children: JSX.Element | JSX.Element[] | string
}