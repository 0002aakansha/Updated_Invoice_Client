import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'

const UpdateProjectModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: (value: boolean) => void }) => {
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
                            <div className='flex flex-col my-2'>
                                <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Description</label>
                                <input type="text" placeholder='Description' className='outline-none border-2 px-4 py-2 rounded-md' />
                            </div>
                            <div className='flex flex-col my-2'>
                                <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Project Amount</label>
                                <input type="number" step='0.01' placeholder='Project Amount' className='outline-none border-2 px-4 py-2 rounded-md' />
                            </div>
                            <div className='flex flex-col my-2'>
                                <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Rate</label>
                                <input type="number" step='0.01' placeholder='Rate' className='outline-none border-2 px-4 py-2 rounded-md' />
                            </div>
                            <div className='flex flex-col my-2'>
                                <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Conversion Rate</label>
                                <input type="number" step='0.01' placeholder='Conversion Rate' className='outline-none border-2 px-4 py-2 rounded-md' />
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

export default UpdateProjectModal