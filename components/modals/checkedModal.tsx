import { FormEvent, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { AppDispatch, AppState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
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
  updateDetailedProjectOnChecked,
  updatedChecked,
} from "../store/invoice";

const CheckedModal = ({ indx }: { indx: number }) => {
  const { invoiceType, isChecked, detailedProject } =
    useSelector<AppState>((state) => state.invoice) as invoiceStateType;
  const { user, isLoading } = useSelector<AppState>(
    (state) => state.user
  ) as userStateType;
  const client = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const dispatch = useDispatch<AppDispatch>();

  const [period, setPeriod] = useState(detailedProject[indx].period);
  const [workingDays, setworkingDays] = useState(
    detailedProject[indx].workingDays
  );
  const [totalWorkingDays, settotalworkingDays] = useState(
    detailedProject[indx].totalWorkingDays
  );
  const [hours, sethours] = useState<number>(+detailedProject[indx]?.hours);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const project = detailedProject[indx];
    if (
      workingDays !== '0' &&
      totalWorkingDays !== '0' &&
      invoiceType === "monthly"
    ) {
      if (workingDays && totalWorkingDays && +workingDays <= +totalWorkingDays) {
        dispatch(
          updateDetailedProjectOnChecked({
            ...project,
            id: indx,
            period,
            workingDays,
            totalWorkingDays,
            amount: "0,0.0",
            rate: project.rate,
            conversionRate: project.conversionRate,
            projectBelongsTo: project.projectBelongsTo
          })
        );
        dispatch(calculateSubtotal());

        const clientState = client.clients.filter(
          (client) => client._id === project?.projectBelongsTo
        )[0] as clientType;

        !isLoading &&
          dispatch(
            calculateGST({
              userState: user.address.state,
              clientState: clientState?.address?.state,
            })
          );
      } else
        return toast.error(
          `working days can'nt be greater than totalworking days`
        );
    } else if (invoiceType === "hourly" && hours !== 0.0) {
      dispatch(
        updateDetailedProjectOnChecked({
          ...project,
          id: indx,
          hours,
          rate: project.rate,
          conversionRate: project.conversionRate,
        })
      );
      dispatch(calculateSubtotal());

      const clientState = client.clients.filter(
        (client) => client._id === project?.projectBelongsTo
      )[0] as clientType;

      !isLoading &&
        dispatch(
          calculateGST({
            userState: user.address.state,
            clientState: clientState?.address?.state,
          })
        );
    } else return toast.error("all fields are required!");
    dispatch(setisChecked(false));
  };

  return (
    <>
      <Modal isOpen={isChecked} onClose={() => dispatch(setisChecked(false))}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-[#5a51be] uppercase font-bold text-center">
            Update Project
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form action="" className="p-4" onSubmit={submitHandler}>
              {invoiceType === "monthly" && (
                <>
                  <div className="flex flex-col my-2">
                    <label htmlFor="" className="font-semibold text-lg">
                      Period*
                    </label>
                    <input
                      type="text"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      required
                      className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                    />
                  </div>
                  <div className="flex flex-col my-2">
                    <label htmlFor="" className="font-semibold text-lg">
                      Working Days*
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={workingDays}
                      onChange={(e) => setworkingDays(e.target.value)}
                      required
                      className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                    />
                  </div>
                  <div className="flex flex-col my-2">
                    <label htmlFor="" className="font-semibold text-lg">
                      Total Working Days*
                    </label>
                    <input
                      type="number"
                      value={totalWorkingDays}
                      onChange={(e) => settotalworkingDays(e.target.value)}
                      required
                      className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                    />
                  </div>
                </>
              )}
              {invoiceType === "hourly" && (
                <div className="flex flex-col my-2">
                  <label htmlFor="" className="font-semibold text-lg">
                    Hours*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={hours}
                    onChange={(e) => sethours(e.target.value)}
                    required
                    className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                  />
                </div>
              )}
              <ModalFooter>
                <Button
                  type="submit"
                  mr={3}
                  className="bg-[#5a51be] text-stone-100 hover:bg-[#5a51be]"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    dispatch(setisChecked(false))
                    dispatch(updatedChecked({ indx, checked: false }))
                  }}
                  className="bg-slate-100"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckedModal;
