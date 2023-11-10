import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { clientStateType, projectStateType } from "@/types/types";

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

export const useProjectRowData = () => {
  const { projects } = useSelector<AppState>(
    (state) => state.project
  ) as projectStateType;

  const [projectRow, setProjectRow] = useState<any>();

  useEffect(() => {
    setProjectRow(
      projects
        ?.filter((project) => project.active === true)
        ?.map((project, indx) => ({
          _id: project?._id,
          sno: indx + 1,
          description: project.description,
          client: project?.projectBelongsTo?.name,
          projectCycle: project?.projectCycle,
          projectType: project?.projectType,
          projectAmount: `${
            project?.projectAmount
              ? `${project?.projectAmount}`
              : "N/A"
          }`,
          rate: `${
            project?.rate?.rate
              ? `${project?.rate?.rate} ${project?.rate?.currency}`
              : "N/A"
          }`,
          conversionRate: `${
            project?.conversionRate ? project?.conversionRate : "N/A"
          }`,
        }))
    );
  }, [projects]);
  return { projectRow };
};

export default useRowData;
