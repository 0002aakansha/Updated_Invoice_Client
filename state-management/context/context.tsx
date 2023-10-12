import { childrenProps, dataProps, invoiceContextType } from "@/types/types";
import { createContext, useState } from "react";

const invoiceContextDefaultValues: invoiceContextType = {
    invoiceType: '',
    isChecked: false,
    projectDataType: [],
    subtotal: 0.0,
    setisChecked: () => { },
    setInvoiceType: () => { },
    setDataOnChecked: () => { },
    setterOfProjectDataType: () => { },
    calculateSubtotal: () => { }
};

export const InvoiceContext = createContext<invoiceContextType>(invoiceContextDefaultValues);

export default function InvoiceProvider({ children }: childrenProps) {
    const [type, setType] = useState('monthly');
    const [isChecked, setChecked] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [projectDataType, setProjectDataType] = useState<dataProps[]>([])

    const setInvoiceType = (type: string) => {
        setType(type)
    }

    const setisChecked = (value: boolean) => {
        setChecked(value)
    }

    const setDataOnChecked = (value: dataProps) => {
        const project = projectDataType[+value._id]

        if (type === 'monthly' && value.period && value.workingDays && value.totalWorkingDays) {
            const projectAmount = Number(project?.projectAmount)
            const workingDays = Number(value?.workingDays)
            const totalWorkingDays = Number(value?.totalWorkingDays)

            const amount = ((projectAmount / totalWorkingDays) * workingDays).toFixed(3)

            projectDataType[+value._id] = { ...value, amount }
        } else if (value.hours) {
            const rate = Number(project?.rate?.rate)
            const currency = project?.rate?.currency
            const hours = Number(value?.hours)
            const conversionRate = Number(project?.conversionRate)

            const amount = currency === 'INR' ? (rate * hours) : (rate * conversionRate * hours)

            projectDataType[+value._id] = { ...value, amount: amount.toFixed(3) }
        }
    }

    const setterOfProjectDataType = (value: dataProps[]) => {
        setProjectDataType(value)
    }

    const calculateSubtotal = () => {

        const istrue = projectDataType.filter(project => project.checked === true)
        
        const data = istrue.reduce((value, project) => value += Number(project.amount), 0)
        setSubtotal(+data.toFixed(3))

        console.log(data);
        
    }

    const value = {
        invoiceType: type,
        setInvoiceType,
        isChecked,
        subtotal,
        setisChecked,
        projectDataType,
        setDataOnChecked,
        setterOfProjectDataType,
        calculateSubtotal
    }
    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    )
}
