import Loader from "@/components/spinners/Loader";
import {
  fetchClient,
  fetchClientProjects,
  setHidden,
} from "@/components/store/client";
import { calculateGST, calculateSubtotal, setInvoiceType, setTotalToZero, updateSpecificField, updatedChecked } from "@/components/store/invoice";
import project from "@/components/store/project";
import { AppDispatch, AppState } from "@/components/store/store";
import {
  clientStateType,
  clientType,
  invoiceStateType,
  userStateType,
} from "@/types/types";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const SelectClient = () => {
  const { user, isLoading } = useSelector<AppState>(
    (state) => state.user
  ) as userStateType;
  const client = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const invoice = useSelector<AppState>(
    (state) => state.invoice
  ) as invoiceStateType;

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [Error, setError] = useState<string | null>();
  const [clientId, setClientId] = useState<string | undefined>(undefined);

  async function onLoadClient() {
    const { error } = await dispatch(fetchClient());

    if (error?.message === "Rejected") {
      if (client.error?.status == 401) {
        toast.error("Please login first!");
        router.push("/");
      } else setError(client.error?.message);
    }
  }

  function changeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setClientId(e.target.value);

    const clientState = client.clients.filter(
      (client) => client._id === e.target.value
    )[0] as clientType;

    !isLoading &&
      dispatch(
        calculateGST({
          userState: user.address.state,
          clientState: clientState?.address?.state,
        })
      );
  }

  function changeInvoiceTypeHandler(e: { target: { value: any; }; }) {
    dispatch(setInvoiceType(e.target.value))
    invoice.detailedProject.map((_, indx) => {
      dispatch(updatedChecked({ indx, checked: false }))
      dispatch(updateSpecificField({ indx, field: 'amount', data: '0,0' }))
    })
    dispatch(setTotalToZero())
  }

  useEffect(() => {
    onLoadClient();
  }, []);

  useEffect(() => {
    if (clientId === "undefined" || clientId === undefined)
      dispatch(setHidden(true));
    else {
      dispatch(setHidden(false));
      dispatch(fetchClientProjects(clientId));
    }
  }, [clientId]);

  return (
    <div className="flex justify-around">
      <div>
        <form action="" className="flex flex-col">
          <label htmlFor="select" className="font-semibold">
            Bill To:
          </label>
          <select
            id="select"
            className="outline-none bg-transparent border-2 px-4 py-2 rounded-sm my-2"
            value={clientId}
            onChange={changeHandler}
          >
            {client?.clients?.length !== 0 ? (
              <>
                <option value={"undefined"}>Select Client</option>
                {client?.clients?.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">There are no clients</option>
            )}
          </select>
        </form>
      </div>
      <div>
        {!client.isHidden && client.projects?.length !== 0 && (
          <form action="" className="flex flex-col">
            <label htmlFor="select" className="font-semibold">
              Invoice Type:
            </label>
            <select
              id="select"
              onChange={changeInvoiceTypeHandler}
              className="outline-none bg-transparent border-2 px-4 py-2 rounded-sm my-2"
            >
              <option value="monthly">Monthly</option>
              <option value="hourly">Hourly</option>
            </select>
          </form>
        )}
      </div>
    </div>
  );
};

export default SelectClient;
