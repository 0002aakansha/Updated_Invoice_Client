import React from "react";
import SelectClient from "./SelectClient";

const MiddleMain = ({
  flag,
  client,
  invoiceType,
}: {
  flag?: boolean;
  client?: string;
  invoiceType?: string;
}) => {
  return (
    <div className="xs:grid xs:grid-cols-1 md:grid container md:grid-cols-2 my-[2rem]">
      <div></div>
      <SelectClient flag={flag} client={client} invoiceType={invoiceType} />
    </div>
  );
};

export default MiddleMain;
