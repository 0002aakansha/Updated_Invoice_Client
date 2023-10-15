import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'

const UpdateClientModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: (value: boolean) => void }) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => onClose(false)}
            >
                <ModalOverlay />
                <ModalContent className='mt-4 w-full'>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <form action="">
                        <ModalBody pb={6}>
                            <div className='grid grid-cols-2 space-x-2'>
                                <div className='flex flex-col'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Client</label>
                                    <input type="text" placeholder='Name' className='outline-none border-2 px-4 py-2 rounded-md' />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>GSTIN</label>
                                    <input type="text" placeholder='GSTIN' className='outline-none border-2 px-4 py-2 rounded-md' />
                                </div>
                            </div>
                            <h2 className='font-semibold my-2'>Address: </h2>
                            <div className='grid grid-cols-2 my-4'>
                                <div className='flex flex-col m-1'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Street</label>
                                    <input type="text" placeholder='Street' className='outline-none border-2 px-4 py-2 rounded-md' />
                                </div>
                                <div className='flex flex-col m-1'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>City</label>
                                    <input type="text" placeholder='City' className='outline-none border-2 px-4 py-2 rounded-md' />
                                </div>
                                <div className='flex flex-col m-1'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>PIN</label>
                                    <input type="text" placeholder='Pin' className='outline-none border-2 px-4 py-2 rounded-md' />
                                </div>
                                <div className='flex flex-col m-1'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>State</label>
                                    <input type="text" placeholder='State' className='outline-none border-2 px-4 py-2 rounded-md' />
                                </div>
                                <div className='flex flex-col m-1'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Country</label>
                                    <input type="text" placeholder='Country' className='outline-none border-2 px-4 py-2 rounded-md' />
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button className='bg-[#5a51be] text-stone-100 hover:bg-[#645bc5]' mr={3}>
                                Save
                            </Button>
                            <Button onClick={() => onClose(false)}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateClientModal