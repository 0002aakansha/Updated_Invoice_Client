import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../store/store';
import { projectStateType, projectType } from '@/types/types';
import { FormEvent, useEffect, useState } from 'react';
import { UpdateProject, setUpdate } from '../store/project';
import toast from 'react-hot-toast';

const UpdateProjectModal = ({ isOpen, onClose, _id }: { isOpen: boolean, onClose: (value: boolean) => void, _id: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, error, updated } = useSelector<AppState>(
        (state) => state.project
    ) as projectStateType;

    const [description, setDescription] = useState('')
    const [rate, setRate] = useState({ currency: '', rate: 0 })
    const [conversionRate, setConversionRate] = useState(0)
    const [projectAmount, setProjectAmount] = useState(0)
    const [BelongsTo, setBelongsTo] = useState('')

    useEffect(() => {
        const project = projects?.filter(
            (project) => project?._id === _id
        )[0] as projectType;
        setDescription(project?.description);
        setRate(project?.rate);
        setConversionRate(project?.conversionRate);
        setProjectAmount(project?.projectAmount);
        setBelongsTo(project?.projectBelongsTo?._id || project?.projectBelongsTo)

        if (error.message !== '') toast.error(error.message)
        else if (updated) {
            toast.success("Project Updated!");
            dispatch(setUpdate())
        }
    }, [_id, projects, error.message, updated]);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()

        if (rate.currency !== 'INR') {
            await dispatch(
                UpdateProject({ cid: BelongsTo, _id, project: { description, rate, conversionRate, projectAmount } })
            );
        }
        else {
            await dispatch(
                UpdateProject({ cid: BelongsTo, _id, project: { description, rate, conversionRate: undefined, projectAmount } })
            );
        }
        onClose(false)
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => onClose(false)}
            >
                <ModalOverlay />
                <ModalContent className='mt-4 w-full'>
                    <ModalHeader>Update Project!</ModalHeader>
                    <ModalCloseButton />
                    <form action="" onSubmit={submitHandler}>
                        <ModalBody pb={6}>
                            <div className='flex flex-col my-2'>
                                <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Description</label>
                                <input type="text" placeholder='Description' className='outline-none border-2 px-4 py-2 rounded-md' value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className='flex flex-col my-2'>
                                <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Project Amount</label>
                                <input type="number" step='0.01' placeholder='Project Amount' value={projectAmount} className='outline-none border-2 px-4 py-2 rounded-md' onChange={e => setProjectAmount(+e.target.value)} />
                            </div>
                            <div>
                                <div className='flex flex-col my-2'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Rate</label>
                                    <select className='outline-none border-2 px-4 py-2 rounded-md' value={rate?.currency} onChange={e => setRate({ ...rate, currency: e.target.value })}>
                                        <option value={'INR'}>INR</option>
                                        <option value={'USD'}>USD</option>
                                        <option value={'POUND'}>POUND</option>
                                    </select>
                                </div>
                                <div className='flex flex-col my-2'>
                                    <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Rate</label>
                                    <input type="number" step='0.01' placeholder='Rate' value={rate?.rate} className='outline-none border-2 px-4 py-2 rounded-md' onChange={e => setRate({ ...rate, rate: +e.target.value })} />
                                </div>
                            </div>
                            {
                                rate?.currency !== 'INR' && (
                                    <div className='flex flex-col my-2'>
                                        <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Conversion Rate</label>
                                        <input type="number" step='0.01' placeholder='Conversion Rate' className='outline-none border-2 px-4 py-2 rounded-md' value={conversionRate} onChange={e => setConversionRate(+e.target.value)} />
                                    </div>
                                )
                            }
                        </ModalBody>

                        <ModalFooter>
                            <Button type='submit' className='bg-[#5a51be] text-stone-100 hover:bg-[#645bc5]' mr={3}>
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