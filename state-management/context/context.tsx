import { createContext, useState } from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string
}

interface dataProps {
    description?: string,
    amount?: string,
    period?: string,
    workingDays?: string,
    totalWorkingDays?: string
    rate?: string,
    hours?: string,
    conversionRate?: string
}

type invoiceContextType = {
    invoiceType: string;
    isChecked: boolean,
    setisChecked: (value: boolean) => void
    setInvoiceType: (type: string) => void,
    setCheckedProject: (data: dataProps) => void,
    setPeriod: (value: string) => void,
    setworkingDays: (value: string) => void,
    settotalworkingDays: (value: string) => void,
    setrate: (value: string) => void,
    sethours: (value: string) => void,
    setconversionRate: (value: string) => void,
} & dataProps;

const invoiceContextDefaultValues: invoiceContextType = {
    invoiceType: '',
    isChecked: false,
    description: '',
    amount: '',
    period: '',
    workingDays: '',
    totalWorkingDays: '',
    rate: '',
    hours: '',
    conversionRate: '',
    setisChecked: () => { },
    setInvoiceType: () => { },
    setCheckedProject: () => { },
    setPeriod: () => { },
    setworkingDays: () => { },
    settotalworkingDays: () => { },
    setrate: () => { },
    sethours: () => { },
    setconversionRate: () => { },
};

export const InvoiceContext = createContext<invoiceContextType>(invoiceContextDefaultValues);

export default function InvoiceProvider({ children }: Props) {
    const [type, setType] = useState('monthly');
    const [isChecked, sethChecked] = useState(false);
    const [period, setPeriod] = useState('')
    const [description, setDescription] = useState('')
    const [workingDays, setworkingDays] = useState('')
    const [totalWorkingDays, settotalworkingDays] = useState('')
    const [rate, setrate] = useState('')
    const [hours, sethours] = useState('')
    const [conversionRate, setconversionRate] = useState('')
    const [amount, setamount] = useState('')

    const setInvoiceType = (type: string) => {
        setType(type)
    }

    const setisChecked = (value: boolean) => {
        sethChecked(value)
    }

    const setCheckedProject = (data: dataProps) => {
        console.log(data);

        if (data.description && data.amount) {
            setDescription(data.description)
            setamount(data.amount)
        }

        if (type === 'monthly') {
            if (data.period && data.workingDays && data.totalWorkingDays) {
                setPeriod(data.period)
                setworkingDays(data.workingDays)
                settotalworkingDays(data.totalWorkingDays)
            }
        }
        else {
            if (data.rate && data.conversionRate && data.hours) {
                setrate(data.rate)
                sethours(data.hours)
                setconversionRate(data.conversionRate)
            }
        }
    }

    const value = {
        invoiceType: type,
        setInvoiceType,
        isChecked,
        setisChecked,
        description,
        amount,
        period,
        workingDays,
        totalWorkingDays,
        rate,
        hours,
        conversionRate,
        setCheckedProject,
        setPeriod,
        setworkingDays,
        settotalworkingDays,
        setrate,
        sethours,
        setconversionRate
    }
    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    )
}
