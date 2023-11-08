import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { clientStateType } from "@/types/types";

const useRowData = () => {
  const { clients } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;

  const [clientRow, setClientRow] = useState<any>();

  useEffect(() => {
    setClientRow(
      clients
        ?.filter((client) => client.active === true)
        .map((client, indx) => {
          console.log(client.projects);

          return {
            _id: client?._id,
            sno: indx + 1,
            client: client?.name,
            gstin: client?.gstin,
            address: `${client?.address?.street}, ${client?.address?.city}, ${client?.address?.pin}${client?.address?.state}, ${client?.address?.country}`,
            projects: client?.projects?.length,
          };
        })
    );
  }, [clients]);

  return { clientRow };
};

export default useRowData;
