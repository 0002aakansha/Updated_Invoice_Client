import { addressType, clientStateType, clientType } from "@/types/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import { UpdateClient} from "../store/client";
import toast from "react-hot-toast";

const UpdateClientModal = ({
  isOpen,
  _id,
  onClose,
}: {
  isOpen: boolean;
  _id: string;
  onClose: (value: boolean) => void;
}) => {
  const { clients, error } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [gstin, setgstin] = useState<string>("");
  const [address, setAddress] = useState<addressType>({
    street: "",
    city: "",
    state: "",
    pin: "",
    country: "",
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const { error } = await dispatch(
      UpdateClient({ _id, name, gstin, address })
    );

    if (error?.message === "Rejected") throw new Error(error);
    onClose(false)
    toast.success("Client Updated!");
  };

  useEffect(() => {
    const client = clients.filter(
      (client) => client._id === _id
    )[0] as clientType;
    setName(client?.name);
    setgstin(client?.gstin);
    setAddress(client?.address);
  }, [_id]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)}>
        <ModalOverlay />
        <ModalContent className="mt-4 w-full">
          <ModalHeader>Update Client!</ModalHeader>
          <ModalCloseButton />
          <form action="" onSubmit={submitHandler}>
            <ModalBody pb={6}>
              <div className="grid grid-cols-2 space-x-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-semibold tracking-wide mb-2"
                  >
                    Client
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="outline-none border-2 px-4 py-2 rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-semibold tracking-wide mb-2"
                  >
                    GSTIN
                  </label>
                  <input
                    type="text"
                    placeholder="GSTIN"
                    className="outline-none border-2 px-4 py-2 rounded-md"
                    value={gstin}
                    onChange={(e) => setgstin(e.target.value)}
                  />
                </div>
              </div>
              <h2 className="font-semibold my-2">Address: </h2>
              <div className="grid grid-cols-2 my-4">
                <div className="flex flex-col m-1">
                  <label
                    htmlFor="name"
                    className="font-semibold tracking-wide mb-2"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    placeholder="Street"
                    className="outline-none border-2 px-4 py-2 rounded-md"
                    value={address?.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col m-1">
                  <label
                    htmlFor="name"
                    className="font-semibold tracking-wide mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="outline-none border-2 px-4 py-2 rounded-md"
                    value={address?.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col m-1">
                  <label
                    htmlFor="name"
                    className="font-semibold tracking-wide mb-2"
                  >
                    PIN
                  </label>
                  <input
                    type="text"
                    placeholder="Pin"
                    className="outline-none border-2 px-4 py-2 rounded-md"
                    value={address?.pin}
                    onChange={(e) =>
                      setAddress({ ...address, pin: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col m-1">
                  <label
                    htmlFor="name"
                    className="font-semibold tracking-wide mb-2"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    className="outline-none border-2 px-4 py-2 rounded-md"
                    value={address?.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col m-1">
                  <label
                    htmlFor="name"
                    className="font-semibold tracking-wide mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="outline-none border-2 px-4 py-2 rounded-md"
                    value={address?.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                className="bg-[#5a51be] text-stone-100 hover:bg-[#645bc5]"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={() => onClose(false)}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateClientModal;
