import { FormEvent, useContext, useState } from 'react'
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react'
import { InvoiceContext } from '@/state-management/context/context'

const CheckedModal = () => {
    const { isChecked, invoiceType, setisChecked, setCheckedProject, period, workingDays, totalWorkingDays, rate, hours, conversionRate, setPeriod, setworkingDays, settotalworkingDays, setrate, sethours, setconversionRate } = useContext(InvoiceContext)

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()

        invoiceType === 'monthly' ? setCheckedProject({ period, workingDays, totalWorkingDays }) : setCheckedProject({ rate, hours, conversionRate })
        setisChecked(false)
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
                                            <input type="text" value={period} onChange={e => setPeriod(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Working Days*</label>
                                            <input type="text" value={workingDays} onChange={e => setworkingDays(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Total Working Days*</label>
                                            <input type="text" value={totalWorkingDays} onChange={e => settotalworkingDays(e.target.value)} />
                                        </div>
                                    </>
                                )
                            }
                            {
                                invoiceType === 'hourly' && (
                                    <>
                                        <div>
                                            <label htmlFor="">Rate*</label>
                                            <input type="text" value={rate} onChange={e => setrate(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Hours*</label>
                                            <input type="text" value={hours} onChange={e => sethours(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Conversion Rate*</label>
                                            <input type="text" value={conversionRate} onChange={e => setconversionRate(e.target.value)} />
                                        </div>
                                    </>
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