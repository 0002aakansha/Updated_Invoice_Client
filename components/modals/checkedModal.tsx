import { FormEvent, useContext, useState } from 'react'
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react'
import { InvoiceContext } from '@/state-management/context/context'
import ValidationAlert from '../alerts/validationAlert'
import toast from 'react-hot-toast'

const CheckedModal = ({ indx }: { indx: number }) => {

    const { isChecked, invoiceType, setisChecked, projectDataType, setDataOnChecked, calculateSubtotal } = useContext(InvoiceContext)
    const [period, setPeriod] = useState(projectDataType[indx].period)
    const [workingDays, setworkingDays] = useState(projectDataType[indx].workingDays)
    const [totalWorkingDays, settotalworkingDays] = useState(projectDataType[indx].totalWorkingDays)
    const [hours, sethours] = useState(projectDataType[indx].hours)

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()

        const project = projectDataType[indx]
        if (workingDays !== project.workingDays && totalWorkingDays !== project.totalWorkingDays && invoiceType === 'monthly') {
            if (workingDays && totalWorkingDays && workingDays <= totalWorkingDays) {
                setDataOnChecked({ ...project, _id: indx.toString(), period, workingDays, totalWorkingDays, amount: '0,0.0', rate: project.rate, conversionRate: project.conversionRate })
            }
            else return toast.error(`working days can'nt be greater than totalworking days`)
        }
        else if (invoiceType === 'hourly' && hours !== project.hours) {
            setDataOnChecked({ ...project, _id: indx.toString(), hours, rate: project.rate, conversionRate: project.conversionRate })
        }
        else return toast.error('all fields are required!')
        setisChecked(false)
        calculateSubtotal()
    }

    return (
        <>
            <Modal
                isOpen={isChecked}
                onClose={() => setisChecked(false)}
            >

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form action="" onSubmit={submitHandler}>
                            {
                                invoiceType === 'monthly' && (
                                    <>
                                        <div className='flex flex-col'>
                                            <label htmlFor="">Period*</label>
                                            <input type="text" value={period} onChange={e => setPeriod(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label htmlFor="">Working Days*</label>
                                            <input type="number" step='0.01' value={workingDays} onChange={e => setworkingDays(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label htmlFor="">Total Working Days*</label>
                                            <input type="number" value={totalWorkingDays} onChange={e => settotalworkingDays(e.target.value)} required />
                                        </div>
                                    </>
                                )
                            }
                            {
                                invoiceType === 'hourly' && (
                                    <div>
                                        <label htmlFor="">Hours*</label>
                                        <input type="number" step='0.01' value={hours} onChange={e => sethours(e.target.value)} required />
                                    </div>
                                )
                            }
                            <ModalFooter>
                                <Button type='submit' colorScheme='purple' mr={3}>
                                    Save
                                </Button>
                                <Button onClick={() => setisChecked(false)}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CheckedModal