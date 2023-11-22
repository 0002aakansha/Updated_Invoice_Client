import { PdfPreviewProps } from "@/types/types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import { useEffect, useState } from "react";



const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
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
    textAlign: "center",
    textDecoration: "underline",
  },
  table: {
    // display: 'table',
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHead: {
    padding: 4,
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    backgroundColor: "#5A51BE",
    color: "white",
  },

  //landscape
  // rightColumn: {
  //   // flex: 1,
  //   display: "flex",
  //   flexDirection: "column",
  //   // textAlign: 'right',
  //   fontSize: 12,
  //   marginTop: 50,
  //   marginRight: "30%",
  // },

  //A4
  rightColumn: {
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    // textAlign: 'right',
    fontSize: 10,
    marginTop: 10,
    marginRight: "35%",
  },
  tableCell: {
    border: "1 solid #B0B0B0",
    padding: 4,
    fontSize: 8,
    textAlign: "center",
    width: "100%",
  },
  txt: {
    fontSize: 8,
    marginTop: 3,
    backgroundColor: "#5A51BE",
    color: "white",
    padding: 2,
    width: "33%",
  },
  txt1: {
    fontSize: 8,
    marginTop: 1,
    backgroundColor: "#5A51BE",
    color: "white",
    padding: 3,
    width: "33%",
  },
  account: {
    marginTop: 35,
    fontSize: 12,
    flex: 1,
  },
  subtotal: {
    fontSize: 8.5,
    marginTop: 12,
  },
  discount: {
    marginTop: 25,
  },
  cgst: {
    marginTop: 12,
  },
  total: {
    marginTop: 12,
    backgroundColor: "#5A51BE",
    color: "white",
    padding: 5,
  },
  digit: {
    marginLeft: 50,
  },

  //landscape
  logo: {
    width: "150%",
    height: "100%",
    marginRight: "38%",
    marginTop: 20,
  },

  email: {
    // marginTop: 7,
    // fontSize: 13,
    fontSize: 8,
    color: "blue",
    textDecoration: "underline",
  },
  top: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    //landscape
    // fontSize: 16,
    fontSize: 10,
    marginBottom: 2,
    marginTop: 2,
  },
  txt2: {
    //landscape
    // marginTop: 7,
    // fontSize: 13,
    fontSize: 8.5,
  },
  billTo: {
    display: "flex",
    flexDirection: "column",
    fontSize: 12,
    marginTop: 2,
    marginRight: '9.5%',
    marginLeft: '5%',

  },
  billToCubexo: {
    display: "flex",
    flexDirection: "column",
    fontSize: 12,
    marginTop: 2,
    marginRight: '19%',
    marginLeft: '5%',

  },
  address: {
    // marginTop: 7,
    fontSize: 8.5,
    width: "60%",
  },

});



const PdfPreview = ({ data }: { data: PdfPreviewProps | any }) => {
  // console.log(data);

  const [formattedInvoiceDate, setformattedInvoiceDate] = useState("");
  const [formattedDueDate, setformattedDueDate] = useState("");

  function formatDate(date: Date) {
    return date?.toLocaleDateString("en-GB");
  }
  useEffect(() => {
    setformattedInvoiceDate(formatDate(data?.invoice?.Date));
    setformattedDueDate(formatDate(data?.invoice?.DueDate));
  }, [data?.invoice?.Date, data?.invoice?.DueDate]);

  return (
    <Document>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* top */}
          <View style={styles.top}>
            <View style={styles.logo}>
              {data?.user?.name?.toLowerCase().startsWith("gammaedge") ? (
                <Image src="/images/logo.png" />
              ) : (
                <Image src="/images/cubexoLogo.png" />
              )}
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.title}>{data?.user?.name}</Text>
              <Text style={styles.txt2}>GSTIN: {data?.user?.gstin}</Text>
              <Text style={styles.txt2}>PAN : {data?.user?.pan}</Text>
              <Text style={styles.txt2}>{data?.user?.address?.street},</Text>
              <Text style={styles.txt2}>
                {data?.user?.address?.city} {data?.user?.address?.pin},{" "}
                {data?.user?.address?.state} {data?.user?.address?.country}
              </Text>
              <Text style={styles.email}>{data?.user?.email}</Text>{" "}
            </View>
          </View>

          {/* middle */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ flex: 1, marginTop: 2 }}>
              <Text style={styles.txt1}>
                Invoice Number : {data?.invoice?.invoiceNumber}
              </Text>
              <Text style={styles.txt}>
                Invoice Date : {formattedInvoiceDate}
              </Text>
              <Text style={styles.txt}>Due Date: {formattedDueDate}</Text>
            </View>{" "}
            {data?.user?.name?.toLowerCase().startsWith("gammaedge") ? (
              <View style={styles.billTo}>
                <Text style={styles.title}>Bill To:</Text>
                <Text style={styles.title}>{data?.client?.name}</Text>
                <Text style={styles.txt2}>GSTIN: {data?.client?.gstin}</Text>
                <Text style={styles.txt2}>
                  {data?.client?.address?.street}, {data?.client?.address?.city}{" "}
                  {data?.client?.address?.pin}, {data?.client?.address?.state},{" "}
                  {data?.client?.address?.country}{" "}
                </Text>
              </View>
            ) : (
              //bill cubexo styling
              <View style={styles.billToCubexo}>
                <Text style={styles.title}>Bill To:</Text>
                <Text style={styles.title}>{data?.client?.name}</Text>
                <Text style={styles.txt2}>GSTIN: {data?.client?.gstin}</Text>
                <Text style={styles.address}>
                  {data?.client?.address?.street}, {data?.client?.address?.city}{" "}
                  {data?.client?.address?.pin}, {data?.client?.address?.state},{" "}
                  {data?.client?.address?.country}{" "}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                Description
              </Text>
              {data?.invoice?.invoiceType !== "hourly" && (
                <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                  Period
                </Text>
              )}
              {data?.invoice?.invoiceType !== "hourly" && (
                <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                  Working Days
                </Text>
              )}
              {data?.invoice?.invoiceType !== "hourly" && (
                <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                  Total Working Days
                </Text>
              )}
              {data?.invoice?.invoiceType === "hourly" && (
                <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                  Rate
                </Text>
              )}
              {data?.invoice?.invoiceType === "hourly" && (
                <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                  Hour
                </Text>
              )}
              {data?.invoice?.invoiceType === "hourly" && (
                <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                  Conversion Rate
                </Text>
              )}
              <Text style={[styles.tableHead, { fontWeight: "bold" }]}>
                Amount
              </Text>
            </View>

            {data?.invoice?.invoice?.map((invoice: any, index: number) => (
              <View key={invoice?.id} style={styles.tableRow}>

                <Text style={styles.tableCell}>
                  {invoice?.description || invoice?.projectDetails?.description}
                </Text>
                {data?.invoice?.invoiceType !== "hourly" && (
                  <Text style={styles.tableCell}>{invoice?.period}</Text>
                )}
                {data.invoice.invoiceType !== "hourly" && (
                  <Text style={styles.tableCell}>{invoice.workingDays}</Text>
                )}
                {data?.invoice?.invoiceType !== "hourly" && (
                  <Text style={styles.tableCell}>
                    {invoice.totalWorkingDays}
                  </Text>
                )}
                {data?.invoice?.invoiceType === "hourly" && (
                  <Text style={styles.tableCell}>
                    {invoice?.rate?.rate || invoice?.projectDetails?.rate?.rate}
                    {invoice?.rate?.currency === 'USD' ? '$' :
                      invoice?.rate?.currency === 'POUND' ? '£' :
                        invoice?.rate?.currency === 'INR' ? 'INR' : ''} / Hour
                  </Text>
                )}
                {data?.invoice?.invoiceType === "hourly" && (
                  <Text style={styles.tableCell}>{invoice?.hours}</Text>
                )}
                {/* {data?.invoice?.invoiceType === "hourly" && (
                  <Text style={styles.tableCell}>
                    {invoice?.conversionRate ||
                      invoice?.projectDetails?.conversionRate ||
                      "N/A"}
                  </Text>
                )} */}

                {data?.invoice?.invoiceType === "hourly" && (
                  <Text style={styles.tableCell}>
                    {invoice?.rate?.currency === 'USD' ? `1$ = ${invoice?.conversionRate || 'N/A'} INR` :
                      invoice?.rate?.currency === 'POUND' ? `1£ = ${invoice?.conversionRate || 'N/A'} INR` :
                        'N/A'}
                  </Text>
                )}



                <Text style={styles.tableCell}>{invoice?.amount}</Text>
              </View>

              //logic for conditionally rendering epmty row after particular index

              // <React.Fragment key={invoice?.id}>
              //   <View style={styles.tableRow}>
              //     <Text style={styles.tableCell}>
              //       {invoice?.description || invoice?.projectDetails?.description}
              //     </Text>
              //     {data?.invoice?.invoiceType !== "hourly" && (
              //       <Text style={styles.tableCell}>{invoice?.period}</Text>
              //     )}
              //     {data.invoice.invoiceType !== "hourly" && (
              //       <Text style={styles.tableCell}>{invoice.workingDays}</Text>
              //     )}
              //     {data?.invoice?.invoiceType !== "hourly" && (
              //       <Text style={styles.tableCell}>{invoice.totalWorkingDays}</Text>
              //     )}
              //     {data?.invoice?.invoiceType === "hourly" && (
              //       <Text style={styles.tableCell}>
              //         {invoice?.rate?.rate || invoice?.projectDetails?.rate?.rate}
              //         {invoice?.rate?.currency === 'USD' ? '$' :
              //           invoice?.rate?.currency === 'POUND' ? '£' :
              //           invoice?.rate?.currency === 'INR' ? 'INR' : ''} / Hour
              //       </Text>
              //     )}
              //     {data?.invoice?.invoiceType === "hourly" && (
              //       <Text style={styles.tableCell}>{invoice?.hours}</Text>
              //     )}
              //     {data?.invoice?.invoiceType === "hourly" && (
              //       <Text style={styles.tableCell}>
              //         {invoice?.conversionRate ||
              //           invoice?.projectDetails?.conversionRate ||
              //           "N/A"}
              //       </Text>
              //     )}
              //     <Text style={styles.tableCell}>{invoice?.amount}</Text>
              //   </View>
              //   {(index === 10) && (
              //     <View>
              //       <Text>{/* Empty cell */}</Text>
              //       <Text>{/* Empty cell */}</Text>
              //       <Text>{/* Empty cell */}</Text>
              //       <Text>{/* Empty cell */}</Text>
              //       <Text>{/* Empty cell */}</Text>
              //       <Text>{/* Empty cell */}</Text>
              //       <Text>{/* Empty cell */}</Text>
              //       <Text>{/* Empty cell */}</Text>
              //     </View>
              //   )}
              // </React.Fragment>
            ))}

          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.account}>
              <Text style={styles.title}>{data?.user?.name}</Text>
              <Text style={styles.txt2}>
                A/C NO: {data?.user?.account?.acc_no}
              </Text>
              <Text style={styles.txt2}>BANK: {data?.user?.account?.bank}</Text>
              <Text style={styles.txt2}>IFSC: {data?.user?.account?.ifsc}</Text>
            </View>
            <View style={styles.subtotal}>
              {/* <Text style={styles.discount}>
                DISCOUNT {"          "}
                <Text style={styles.digit}> </Text>
              </Text>
              <Text style={styles.subtotal}>
                TDS {"          "}
              </Text>
              <Text style={styles.subtotal}>
                SUBTOTAL {"          "}
                <Text style={styles.digit}>{data?.total?.subtotal}</Text>
              </Text>
              {typeof data?.total?.GST === "number" ? (
                <Text style={styles.cgst}>
                  CGST @18% {"          "}
                  <Text style={styles.digit}>{data?.total?.GST}</Text>
                </Text>
                
              ) : (
                <View>
                  <Text style={styles.cgst}>
                    CGST @9% {"          "}
                    <Text style={styles.digit}>{data?.total?.GST?.CGST}</Text>
                  </Text>
                  <Text style={styles.cgst}>
                    SGST @9% {"          "}
                    <Text style={styles.digit}>{data?.total?.GST?.SGST}</Text>
                  </Text>
                </View>
              )} */}
              {data?.total?.discount !== undefined && data?.total?.discount !== null && data?.total?.discount !== 0 && (
                <Text style={styles.discount}>
                  DISCOUNT {"          "}
                  <Text style={styles.digit}>{data?.total?.discount}</Text>
                </Text>
              )}
              <Text style={styles.subtotal}>
                SUBTOTAL {"          "}
                <Text style={styles.digit}>{data?.total?.subtotal}</Text>
              </Text>
              {typeof data?.total?.GST === "number" ? (
                <Text style={styles.cgst}>
                  CGST @18% {"          "}
                  <Text style={styles.digit}>{data?.total?.GST}</Text>
                </Text>
              ) : (
                <View>
                  <Text style={styles.cgst}>
                    CGST @9% {"          "}
                    <Text style={styles.digit}>{data?.total?.GST?.CGST}</Text>
                  </Text>
                  <Text style={styles.cgst}>
                    SGST @9% {"          "}
                    <Text style={styles.digit}>{data?.total?.GST?.SGST}</Text>
                  </Text>
                </View>
              )}
              <Text style={styles.total}>
                Total Amount {"        "}
                <Text style={styles.digit}>{data?.total?.GrandTotal}</Text>
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 9,
              padding: 2,
              marginTop: 45,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            We appreciate your collaboration and look forword to a long
            relationship with you.
          </Text>
        </View>

      </Page>
    </Document>
  );
};
export default PdfPreview;
