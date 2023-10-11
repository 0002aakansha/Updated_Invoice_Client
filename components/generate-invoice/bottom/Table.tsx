import CheckedModal from '@/components/modals/checkedModal'
import { InvoiceContext } from '@/state-management/context/context'
import { useContext } from 'react'

const Table = () => {
    const { invoiceType, isChecked, setisChecked, setCheckedProject } = useContext(InvoiceContext)

    return (
        <>
            <div>
                <table className='table-auto'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Description</th>
                            {invoiceType === 'monthly' ? (
                                <>
                                    <th>Period</th>
                                    <th>Working Days</th>
                                    <th>Total Working Days</th>
                                </>
                            ) : (
                                <>
                                    <th>Rate</th>
                                    <th>Hours</th>
                                    <th>Conversion Rate</th>
                                </>
                            )}
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" onChange={(e) => {
                                    if (e.target.checked) {
                                        setisChecked(true)
                                        invoiceType === 'monthly' ? setCheckedProject({ description: 'QA on Builder (Ashsih)', amount: '0.0', period: '0', workingDays: '0', totalWorkingDays: '0' }) : setCheckedProject({ description: 'QA on Builder (Ashsih)', amount: '0.0', rate: '0', hours: '0', conversionRate: '82.05' })
                                    }
                                    else setisChecked(false)
                                }} />
                            </td>
                            {invoiceType === 'monthly' ? (
                                <>
                                    <td>QA on Builder</td>
                                    <td>0 Days</td>
                                    <td>0</td>
                                    <td>INR 0,00</td>
                                </>
                            ) : (
                                <>
                                    <td>QA on Builder</td>
                                    <td>0 $/Hour</td>
                                    <td>17:28</td>
                                    <td>1$ = 82.05 INR</td>
                                    <td>INR 0,00</td>
                                </>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
            {isChecked && <CheckedModal />}
        </>
    )
}

export default Table