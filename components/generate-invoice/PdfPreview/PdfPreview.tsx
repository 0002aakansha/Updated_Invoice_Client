import { PdfPreviewProps, dataProps } from '@/types/types';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useEffect, useState } from 'react'; const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 40,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 50,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHead: {
    padding: 10,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#5A51BE',
    color: 'white',
  },
  rightColumn: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // textAlign: 'right',
    fontSize: 12,
    marginTop: 50,
    marginRight: '30%',
  },
  tableCell: {
    border: '1 solid #B0B0B0',
    padding: 10,
    fontSize: 10,
    textAlign: 'center',
    width: '100%',
  },
  txt: {
    fontSize: 13,
    marginTop: 10,
    backgroundColor: '#5A51BE',
    color: 'white',
    padding: 5,
    width: '33%',
  },
  txt1: {
    fontSize: 13,
    marginTop: 50,
    backgroundColor: '#5A51BE',
    color: 'white',
    padding: 5,
    width: '33%',
  },
  account: {
    marginTop: 60,
    fontSize: 12,
    flex: 1,
  },
  subtotal: {
    fontSize: 12,
    marginTop: 60,
  },
  cgst: {
    marginTop: 15,
  },
  total: {
    marginTop: 15,
    backgroundColor: '#5A51BE',
    color: 'white',
    padding: 5,
  },
  digit: {
    marginLeft: 50,
  },
  logo: {
    width: '80%',
    marginRight: '38%',
  },
  email: {
    marginTop: 7,
    fontSize: 13,
    color: 'blue',
    textDecoration: 'underline'
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    marginTop: 2,
  },
  txt2: {
    marginTop: 7,
    fontSize: 13,
  },
  billTo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    marginTop: 50,
    marginRight: '12%',
    marginLeft: '5%',
  },
  billToCubexo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    marginTop: 50,
    marginRight: '20%',
    marginLeft: '5%',
  },
  address: {
    marginTop: 7,
    fontSize: 13,
    width: '30%',
  },
});

const PdfPreview = ({ data }: { data: PdfPreviewProps }) => {
  const [formattedInvoiceDate, setformattedInvoiceDate] = useState('')
  const [formattedDueDate, setformattedDueDate] = useState('')

  // console.log(data);
  

  function formatDate(date: Date) {
    return date?.toLocaleDateString('en-GB');
  } useEffect(() => {
    setformattedInvoiceDate(formatDate(data?.invoice?.Date))
    setformattedDueDate(formatDate(data?.invoice?.DueDate))
  }, [data?.invoice?.Date, data?.invoice?.DueDate])


  return (
    <Document>
      <Page size={[800, 1000]} orientation='landscape' style={styles.page}>
        <View style={styles.section}>
          {/* top */}
          <View style={styles.top}>
            <View style={styles.logo}>
              {
                data?.user?.name?.toLowerCase().startsWith('gammaedge') ? <Image src='/images/logo.png' alt='gammaedge' /> : <Image src='/images/cubexoLogo.png' alt='cubexo' />
              }
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.title}>{data?.user?.name}</Text>
              <Text style={styles.txt2}>GSTIN: {data?.user?.gstin}</Text>
              <Text style={styles.txt2}>PAN : {data?.user?.pan}</Text>
              <Text style={styles.txt2}>{data?.user?.address?.street},</Text>
              <Text style={styles.txt2}> {data?.user?.address?.city} {data?.user?.address?.pin}, {data?.user?.address?.state} {data?.user?.address?.country}</Text>
              <Text style={styles.email}>{data?.user?.email}</Text>            </View>
          </View>
          {/* middle */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txt1}>Invoice Number : {data?.invoice?.invoiceNumber}</Text>
              <Text style={styles.txt}>Invoice Date : {formattedInvoiceDate}</Text>
              <Text style={styles.txt}>Due Date: {formattedDueDate}</Text>
            </View>            {data?.user?.name?.toLowerCase().startsWith('gammaedge') ? (
              <View style={styles.billTo}>
                <Text style={styles.title}>Bill To:</Text>
                <Text style={styles.title}>{data?.client?.name}</Text>
                <Text style={styles.txt2}>GSTIN: {data?.client?.gstin}</Text>
                <Text style={styles.txt2}>{data?.client?.address?.street}, {data?.client?.address?.city} {data?.client?.address?.pin}, {data?.client?.address?.state}, {data?.client?.address?.country} </Text>
              </View>
            ) : (
              <View style={styles.billToCubexo}>
                <Text style={styles.title}>Bill To:</Text>
                <Text style={styles.title}>{data?.client?.name}</Text>
                <Text style={styles.txt2}>GSTIN: {data?.client?.gstin}</Text>
                <Text style={styles.address}>{data?.client?.address?.street}, {data?.client?.address?.city} {data?.client?.address?.pin}, {data?.client?.address?.state}, {data?.client?.address?.country} </Text>
              </View>
            )}
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Description</Text>
              {data?.invoice?.invoiceType === 'monthly' && <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Period</Text>}
              {data?.invoice?.invoiceType === 'monthly' && <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Working Days</Text>}
              {data?.invoice?.invoiceType === 'monthly' && <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Total Working Days</Text>}
              {data?.invoice?.invoiceType === 'hourly' && <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Rate</Text>}
              {data?.invoice?.invoiceType === 'hourly' && <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Hour</Text>}
              {data?.invoice?.invoiceType === 'hourly' && <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Conversion Rate</Text>}
              <Text style={[styles.tableHead, { fontWeight: 'bold' }]}>Amount</Text>
            </View>
            {data?.invoice?.invoice?.map((invoice) => (
              <View key={invoice?.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{invoice?.description || invoice?.projectDetails?.description}</Text>
                {data?.invoice?.invoiceType === 'monthly' && <Text style={styles.tableCell}>{invoice?.period}</Text>}
                {data.invoice.invoiceType === 'monthly' && <Text style={styles.tableCell}>{invoice.workingDays}</Text>}
                {data?.invoice?.invoiceType === 'monthly' && <Text style={styles.tableCell}>{invoice.totalWorkingDays}</Text>}
                {data?.invoice?.invoiceType === 'hourly' && (
                  <Text style={styles.tableCell}>
                    {`${invoice?.rate?.rate} ${invoice?.rate?.currency === 'USD' ? '$' : invoice?.rate?.currency === 'POUND' ? '£' : invoice?.rate?.currency === 'INR' ? 'INR' : ''} / Hour`}
                  </Text>
                )}
                {data?.invoice?.invoiceType === 'hourly' && <Text style={styles.tableCell}>{invoice?.hours}</Text>}
                {invoice?.conversionRate ? (
                  <Text style={styles.tableCell}>
                    {invoice?.rate?.currency === 'INR' ? (
                      <Text style={styles.tableCell}>N/A</Text>
                    ) : (
                      `${invoice?.rate?.currency === 'USD' ? '1$' : `1£`} = ${invoice?.conversionRate}`

                    )}
                  </Text>
                ) : (
                  <Text style={styles.tableCell}>N/A</Text>
                )}
                <Text style={styles.tableCell}>{invoice?.amount}</Text>
              </View>
            ))}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.account}>
              <Text style={styles.title}>{data?.user?.name}</Text>
              <Text style={styles.txt2}>A/C NO: {data?.user?.account?.acc_no}</Text>
              <Text style={styles.txt2}>BANK: {data?.user?.account?.bank}</Text>
              <Text style={styles.txt2}>IFSC: {data?.user?.account?.ifsc}</Text>
            </View>
            <View style={styles.subtotal}>
              <Text style={styles.calSubTotal}>SUBTOTAL  {'          '}
                <Text style={styles.digit}>{data?.total?.subtotal}</Text>
              </Text>
              {typeof data?.total?.GST === 'number' ? (
                <Text style={styles.cgst}>CGST @18% {'          '}
                  <Text style={styles.digit}>{data?.total?.GST}</Text>
                </Text>
              ) : (
                <View>
                  <Text style={styles.cgst}>CGST @9% {'          '}
                    <Text style={styles.digit}>{data?.total?.GST?.CGST}</Text>
                  </Text>
                  <Text style={styles.sgst}>SGST @9% {'          '}
                    <Text style={styles.digit}>{data?.total?.GST?.SGST}</Text>
                  </Text>
                </View>
              )}
              <Text style={styles.total}>Total Amount {'        '}
                <Text style={styles.digit}>{data?.total?.GrandTotal}</Text>
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, padding: 2, marginTop: 100, textAlign: 'center', fontStyle: 'italic' }}>
            We appreciate your collaboration and look forword to a long relationship with you.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
export default PdfPreview;