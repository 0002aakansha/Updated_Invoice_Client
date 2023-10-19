import { PdfPreviewProps, invoiceType } from '@/types/types'
import { GrRotateRight } from 'react-icons/gr'
import { AiOutlineDelete } from 'react-icons/ai'
import { TbEditCircle } from 'react-icons/tb'
import PdfPreview from '../generate-invoice/PdfPreview/PdfPreview'
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react'
import { postInvoiceHistory, updateInvoice } from '../store/invoiceHistory'
import AlertDialogExample from '../alerts/AlertDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const HistoryCard = ({ invoiceData }: { invoiceData: invoiceType }) => {

    const [pdfBlob, setPdfBlob] = useState<Blob | MediaSource>()
    const [pdfPreviewData, setpdfPreviewData] = useState<PdfPreviewProps>()
    const [isPreviewOpen, onPreviewClose] = useState(false)
    const [isEditOpen, onEditClose] = useState(false)
    const [isAlertOpen, setAlertOpen] = useState<boolean>(false)
    const [invoiceNumber, setInvoiceNumber] = useState<string>('')
    const [status, setStatus] = useState<string>(invoiceData?.status)
    const [date, setDate] = useState<Date | null>(null)
    const [dueDate, setDueDate] = useState<Date | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const [isUpdateOpen, onUpdateOpen] = useState<boolean>(false)

    // console.log(invoiceData);
    useEffect(() => {

        if (typeof invoiceData?.createdFor !== 'string' && invoiceData?.invoiceCreatedBy && date && dueDate) {

            setpdfPreviewData(
                {
                    invoice: {
                        invoice: invoiceData?.projects,
                        invoiceType: invoiceData?.invoiceType,
                        invoiceNumber: invoiceNumber,
                        Date: date,
                        DueDate: dueDate
                    },
                    user: {
                        name: invoiceData?.invoiceCreatedBy?.name,
                        email: invoiceData?.invoiceCreatedBy?.email,
                        address: invoiceData?.invoiceCreatedBy?.address,
                        contact: invoiceData?.invoiceCreatedBy?.contact,
                        account: invoiceData?.invoiceCreatedBy?.account,
                        pan: invoiceData?.invoiceCreatedBy?.pan,
                        gstin: invoiceData?.invoiceCreatedBy?.gstin
                    },
                    client: {
                        name: invoiceData?.createdFor?.name,
                        gstin: invoiceData?.createdFor?.gstin,
                        address: invoiceData?.createdFor?.address
                    },
                    total: {
                        subtotal: invoiceData?.subtotal,
                        GST: invoiceData?.GST,
                        GrandTotal: invoiceData?.GrandTotal
                    }
                }
            )
        }
    }, [date, dueDate, invoiceData?.GST, invoiceData?.GrandTotal, invoiceData?.createdFor, invoiceData.createdOn, invoiceData.dueDate, invoiceData?.invoiceCreatedBy, invoiceData.invoiceNumber, invoiceData?.invoiceType, invoiceData?.projects, invoiceData?.subtotal, invoiceNumber])

    const generatePDF = async (e: FormEvent) => {
        e.preventDefault()

        if (invoiceNumber !== '' && date && dueDate) {
            onPreviewClose(true)
            onEditClose(false)

            console.log(invoiceData.projects);

            const pdfData = await pdf(
                <PdfPreview data={pdfPreviewData}
                />
            ).toBlob();
            setPdfBlob(pdfData);
        }
        else toast.error('All fields are required!')
    }

    const downloadPDF = () => {
        if (pdfBlob) {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = 'invoice.pdf';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        dispatch(postInvoiceHistory({
            createdFor: invoiceData?.createdFor?._id, invoiceNumber, createdOn: date?.toLocaleDateString('en-GB'), dueDate: dueDate?.toLocaleDateString('en-GB'),
            projects: invoiceData?.projects?.map(project => {
                return { id: project.id, projectDetails: project.projectDetails._id, period: project.period, workingDays: project.workingDays, totalWorkingDays: project.totalWorkingDays, amount: +project.amount }
            }),
            subtotal: invoiceData.subtotal, GST: invoiceData.GST, GrandTotal: invoiceData.GrandTotal, status: 'pending', invoiceType: invoiceData.invoiceType
        }
        ))
        onPreviewClose(false)
        setInvoiceNumber('')
        setDate(null)
        setDueDate(null)
    };

    const updateHandler = (e: FormEvent) => {
        e.preventDefault()

        if (invoiceData?._id) dispatch(updateInvoice({ id: invoiceData?._id, dataToUpdate: { status } }))
    }

    return (
        <>
            <tr className=' h-10 bg-white my-2 border-spacing-3 font'>
                <td className='my-2 px-4 py-4 text-center capitalize font-medium'>{invoiceData?.invoiceNumber}</td>
                <td className='my-2 px-4 py-4 text-center capitalize text-stone-800 font-medium'>{typeof invoiceData?.createdFor !== 'string' && invoiceData?.createdFor?.name}</td>
                <td className='my-2 px-4 py-4 text-center capitalize'>{invoiceData?.createdOn}</td>
                <td className='my-2 px-4 py-4 text-center capitalize'>{invoiceData?.dueDate}</td>
                <td className='my-2 px-4 py-4 text-center capitalize'>{invoiceData?.GrandTotal}</td>
                <td className='my-2 px-4 py-4 text-center capitalize text-sm font-medium'>
                    <FontAwesomeIcon icon={faCircle} className={`${invoiceData.status === 'pending' ? ' text-orange-600' : ' text-green-600'}`} />
                    <span className='ms-1'>{invoiceData?.status}</span>
                </td>
                <td className='my-2 px-4 py-4 text-center capitalize flex justify-around'>
                    <span className='block'>
                        <GrRotateRight className='text-xl text-slate-700 cursor-pointer'
                            onClick={() => onEditClose(true)}
                        />
                    </span>
                    <span>
                        <TbEditCircle className='text-xl text-slate-500 cursor-pointer' onClick={() => onUpdateOpen(true)} />
                    </span>
                    <span className='block'>
                        <AiOutlineDelete className='text-xl text-red-500 cursor-pointer'
                            onClick={() => setAlertOpen(true)}
                        />
                    </span>
                </td>
            </tr>
            {
                isEditOpen && (
                    <Modal isOpen={isEditOpen} onClose={() => onEditClose(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <form action="" onSubmit={generatePDF}>
                                    <div className="flex flex-col my-2">
                                        <label htmlFor="" className="font-semibold text-lg">Invoice Number</label>
                                        <input type="text" placeholder='Invoice Number' className="border-2 mt-2 px-4 py-2 rounded-sm outline-none" maxLength={8} onChange={e => setInvoiceNumber(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col my-2">
                                        <label htmlFor="" className="font-semibold text-lg">Date</label>
                                        <input type="date" placeholder='Date' className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                                            onChange={e => {
                                                const dateValue = e.target.value;
                                                if (dateValue) {
                                                    setDate(new window.Date(dateValue));
                                                } else {
                                                    setDate(null);
                                                }
                                            }} />
                                    </div>
                                    <div className="flex flex-col my-2">
                                        <label htmlFor="" className="font-semibold text-lg">Due Date</label>
                                        <input type="date" placeholder='Due Date' className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                                            onChange={e => {
                                                const dateValue = e.target.value;
                                                if (dateValue) {
                                                    setDueDate(new window.Date(dateValue));
                                                } else {
                                                    setDueDate(null);
                                                }
                                            }}
                                        />
                                    </div>
                                    <ModalFooter>
                                        <Button className="bg-stone-200" mr={3} onClick={() => onEditClose(false)}>
                                            Close
                                        </Button>
                                        <Button type='submit' className="bg-[#5a51be] text-stone-100 px-4 py-2 hover:bg-[#6960cc]">
                                            Download PDF
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </ModalContent>
                    </Modal >
                )
            }
            {
                isUpdateOpen && (
                    <Modal isOpen={isUpdateOpen} onClose={() => onUpdateOpen(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <form action="" onSubmit={updateHandler} className='my-4'>
                                    <div className="flex flex-col my-2">
                                        <label htmlFor="" className="font-semibold text-lg">Status</label>
                                        <select className="border-2 mt-2 px-4 py-2 rounded-sm outline-none bg-white" value={status} onChange={e => setStatus(e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="success">Success</option>
                                        </select>
                                    </div>
                                    <ModalFooter>
                                        <Button className="bg-stone-200" mr={3} onClick={() => onUpdateOpen(false)}>
                                            Close
                                        </Button>
                                        <Button type='submit' className="bg-[#5a51be] text-stone-100 px-4 py-2 hover:bg-[#6960cc]">
                                            Update
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </ModalContent>
                    </Modal >
                )
            }
            {
                isPreviewOpen && (
                    <Modal isOpen={isPreviewOpen} onClose={() => onPreviewClose(false)} size="4xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <PDFViewer width="100%" height="550em">
                                    <PdfPreview data={pdfPreviewData}
                                    />
                                </PDFViewer>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-stone-200" mr={3} onClick={() => onPreviewClose(false)} size={'sm'}>
                                    Close
                                </Button>
                                <Button className="bg-[#5a51be] text-stone-100 px-4  hover:bg-[#6960cc]" onClick={downloadPDF} size={'sm'}>
                                    Download PDF
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )
            }
            {
                isAlertOpen && (
                    <AlertDialogExample _id={invoiceData?._id} isOpen={isAlertOpen} onClose={setAlertOpen} filter='invoiceDelete' />
                )
            }
        </>
    )
}

export default HistoryCard