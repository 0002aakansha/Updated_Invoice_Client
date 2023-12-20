import {
  calculateGST,
  calculateSubtotal,
  setisChecked,
  updatedChecked,
} from "@/components/store/invoice";
import { setUniqueKey } from "@/components/store/project";
import { AppState } from "@/components/store/store";
import {
  clientStateType,
  clientType,
  invoiceStateType,
  userStateType,
} from "@/types/types";
import { useDispatch, useSelector } from "react-redux";

const EditTableColumn = (invoiceType: string) => {
  const { detailedProject } = useSelector<AppState>(
    (state) => state.invoice
  ) as invoiceStateType;
  const { clients } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const { user, isLoading } = useSelector<AppState>(
    (state) => state.user
  ) as userStateType;

  const dispatch = useDispatch();

  return [
    {
      headerName: "S. No.",
      field: "sno",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      cellRenderer: (params: any) => (
        <>
          <label
            htmlFor="sno"
            className="flex items-center justify-center space-x-2"
          >
            <input
              type="checkbox"
              id="sno"
              className="outline-none accent-[#5a51be]"
              checked={
                detailedProject.filter((val) => val._id === params.data._id)[0]
                  ?.checked
              }
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setUniqueKey(params.data?._id || ""));
                  dispatch(setisChecked(true));
                  dispatch(
                    updatedChecked({
                      indx: params.data?._id || "",
                      checked: true,
                    })
                  );
                } else {
                  setisChecked(false);
                  dispatch(
                    updatedChecked({
                      indx: params.data?._id || "",
                      checked: false,
                    })
                  );

                  dispatch(
                    calculateSubtotal({
                      flag: undefined,
                      tds: clients.filter(
                        (client) => client._id === params.data?.projectBelongsTo
                      )[0]?.tds,
                    })
                  );
                }

                const clientState = clients.filter(
                  (client) => client._id === params.data?.projectBelongsTo
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
            <span>{params.data.sno}</span>
          </label>
        </>
      ),
      width: 80,
    },
    {
      headerName: "Description",
      field: "description",
      cellClass: "centered-cell",
      resizable: true,
      headerClass: "custom-header",
    },
    {
      headerName: "Period",
      field: "period",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      hide: invoiceType === "monthly" ? false : true,
    },
    {
      headerName: "Working Days",
      field: "workingDays",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      hide: invoiceType === "monthly" ? false : true,
    },
    {
      headerName: "Total Working Days",
      field: "totalWorkingDays",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      hide: invoiceType === "monthly" ? false : true,
    },
    {
      headerName: "Rate",
      field: "rate",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      hide: invoiceType === "hourly" ? false : true,
    },
    {
      headerName: "Hours",
      field: "hours",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      hide: invoiceType === "hourly" ? false : true,
    },
    {
      headerName: "Conversion rate",
      field: "conversionRate",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      hide: invoiceType === "hourly" ? false : true,
    },
    {
      headerName: "Project Amount",
      field: "projectAmount",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      hide: invoiceType === "fixedbudget" ? false : true,
    },
    {
      headerName: "Amount",
      field: "amount",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
    },
  ];
};

export default EditTableColumn;
