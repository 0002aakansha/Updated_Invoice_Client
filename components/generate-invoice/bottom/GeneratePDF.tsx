import { AppDispatch, AppState } from "@/components/store/store"
import { PdfPreviewProps, clientStateType, dataProps, invoiceStateType, userType } from "@/types/types"
import { PDFViewer, pdf } from "@react-pdf/renderer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react'
import PdfPreview from "../PdfPreview/PdfPreview"
import { setDate, setDueDate, setInvoiceNumber, updatedChecked } from "@/components/store/invoice"
import toast from "react-hot-toast"
import { getClientById } from "@/components/store/client"

const GeneratePDF = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | MediaSource>()
  const [isOpen, onClose] = useState(false)
  const [checkedInvoice, setCheckedInvoice] = useState<dataProps[] | undefined>()
  const [pdfPreviewData, setpdfPreviewData] = useState<PdfPreviewProps>()

  const { detailedProject, invoiceType, invoiceNumber, Date, DueDate, subtotal, GrandTotal, GST } = useSelector<AppState>(state => state.invoice) as invoiceStateType
  const { name, email, address, contact, account, pan, gstin } = useSelector<AppState>(state => state.user.user) as userType
  const { clientById } = useSelector<AppState>(state => state.client) as clientStateType

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setCheckedInvoice(detailedProject.filter((invoice) => invoice.checked === true))
    dispatch(getClientById(detailedProject[0]?.projectBelongsTo))

    setpdfPreviewData(
      {
        invoice: {
          invoice: checkedInvoice,
          invoiceType,
          invoiceNumber,
          Date,
          DueDate
        },
        user: {
          name,
          email,
          address,
          contact,
          account,
          pan,
          gstin
        },
        client: {
          name: clientById?.name,
          gstin: clientById?.gstin,
          address: clientById?.address
        },
        total: {
          subtotal,
          GST,
          GrandTotal
        }
      }
    )

  }, [detailedProject, Date, DueDate, GST, GrandTotal, account, address, checkedInvoice, clientById?.address, clientById?.gstin, clientById?.name, contact, dispatch, email, gstin, invoiceNumber, invoiceType, name, pan, subtotal])

  const generatePDF = async () => {
    if (invoiceNumber === '' || !Date || !DueDate) return toast.error('All fileds are required!')
    if (!checkedInvoice || checkedInvoice.length === 0) {
      return toast.error('No rows Selected. Please select records to generate an invoice.')
    }
    onClose(true)

    const pdfData = await pdf(
      <PdfPreview data={pdfPreviewData}
      />
    ).toBlob();
    setPdfBlob(pdfData);

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
      onClose(false);
      checkedInvoice?.map((_, indx) => dispatch(updatedChecked({ indx, checked: false })))
      dispatch(setInvoiceNumber(''))
      dispatch(setDate(new window.Date()))
      dispatch(setDueDate(new window.Date()))
    }
    onClose(false)
  };


  return (
    <div className="flex justify-center mt-[5rem]" onClick={generatePDF}>
      <button className='bg-[#5a51be] cursor-pointer text-stone-100 px-4 py-2 rounded-sm tracking-wider font-bold'>Generate PDF</button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => onClose(false)} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <PDFViewer width="100%" height="550em">
                <PdfPreview data={pdfPreviewData}
                />
              </PDFViewer>
            </ModalBody>
            <ModalFooter>
              <Button className="bg-stone-200" mr={3} onClick={() => onClose(false)} size={'sm'}>
                Close
              </Button>
              <Button className="bg-[#5a51be] text-stone-100 px-4  hover:bg-[#6960cc]" onClick={downloadPDF} size={'sm'}>
                Download PDF
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

export default GeneratePDF