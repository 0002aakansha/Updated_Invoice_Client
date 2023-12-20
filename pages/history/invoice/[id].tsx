import EditableTable from "@/components/editInvoice/EditableTable";
import TopHeader from "@/components/generate-invoice/TopHeader";
import MiddleMain from "@/components/generate-invoice/middle/MiddleMain";
import useInvoice from "@/components/hooks/useInvoice";
import Layout from "@/components/layout/Layout";
import React from "react";

const EditInvoice = () => {
  const { invoiceById, isLoading } = useInvoice();

  return (
    <Layout>
      <div className="flex justify-between items-center px-4">
        <div className="flex justify-end my-6">
          <h1 className="font-semibold tracking-wider text-[#5a51be] text-xl ml-2">
            Update Invoice
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 m-6 bg-white">
        <TopHeader />
        {!isLoading && (
          <MiddleMain
            flag={true}
            client={invoiceById?.createdFor?.name}
            invoiceType={invoiceById?.invoiceType}
          />
        )}
        <EditableTable invoice={invoiceById} />
      </div>
    </Layout>
  );
};

export default EditInvoice;
