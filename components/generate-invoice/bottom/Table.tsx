import { useEffect, useState } from "react";
import TableTr from "./TableTr";
import CheckedModal from "@/components/modals/checkedModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/components/store/store";
import {
  clientStateType,
  clientType,
  invoiceStateType,
  userStateType,
} from "@/types/types";
import {
  calculateGST,
  calculateSubtotal,
  setisChecked,
  updatedChecked,
} from "@/components/store/invoice";
import { setDetailedProject } from "../../store/invoice";

const Table = () => {
  const { projects, clients } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const { invoiceType, isChecked, detailedProject } = useSelector<AppState>(
    (state) => state.invoice
  ) as invoiceStateType;
  const { user, isLoading } = useSelector<AppState>(
    (state) => state.user
  ) as userStateType;
  const dispatch = useDispatch<AppDispatch>();

  const [uniqueKey, setUniqueKey] = useState<number>(0);

  useEffect(() => {
    const Projects =
      projects &&
      projects.map((project) => {
        return {
          _id: project._id,
          period: "",
          description: project.description,
          workingDays: "0",
          totalWorkingDays: "0",
          hours: "0.0",
          projectAmount: project.projectAmount,
          amount: "0,0.0",
          rate: project.rate,
          conversionRate: project.conversionRate,
          projectBelongsTo: project.projectBelongsTo,
          checked: false,
        };
      });

    if (Projects !== undefined) dispatch(setDetailedProject(Projects));
  }, [projects]);

  return (
    <>
      {projects?.length !== 0 && (
        <div>
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead>
              <tr className="border-2 border-[#9d96e4] bg-[#5a51be] text-stone-100">
                <th className="p-2"></th>
                <th className="p-2">S. No.</th>
                <th className="p-2">Description</th>
                {invoiceType === "monthly" ? (
                  <>
                    <th className="p-2">Period</th>
                    <th className="p-2">Working Days</th>
                    <th className="p-2">Total Working Days</th>
                  </>
                ) : (
                  <>
                    <th className="p-2">Rate</th>
                    <th className="p-2">Hours</th>
                    <th className="p-2">Conversion Rate</th>
                  </>
                )}
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {projects &&
                projects?.map((project, indx) => {
                  return (
                    <>
                      <tr
                        key={project?._id}
                        className="border-2 border-[#9d96e4]"
                      >
                        <td className="border-2 border-[#9d96e4] text-center p-2">
                          <input
                            type="checkbox"
                            className="outline-none accent-[#5a51be]"
                            checked={detailedProject[indx]?.checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(setisChecked(true));
                                setUniqueKey(indx);
                                dispatch(
                                  updatedChecked({ indx, checked: true })
                                );
                              } else {
                                setisChecked(false);
                                dispatch(
                                  updatedChecked({ indx, checked: false })
                                );
                                dispatch(calculateSubtotal());
                              }

                              const clientState = clients.filter(
                                (client) => client._id === project?.projectBelongsTo
                              )[0] as clientType;


                              !isLoading &&
                                dispatch(
                                  calculateGST({
                                    userState: user.address.state,
                                    clientState: clientState?.address?.state,
                                  })
                                );

                            }}
                          />
                        </td>
                        <TableTr
                          key={project._id}
                          indx={indx}
                          project={project}
                        />
                      </tr>
                      {isChecked && (
                        <CheckedModal key={project._id} indx={uniqueKey} />
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
