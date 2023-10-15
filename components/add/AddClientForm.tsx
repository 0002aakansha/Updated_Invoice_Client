import { addressType, clientStateType } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";
import { AppDispatch, AppState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../store/client";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const AddClientForm = () => {
  const { error, created, isLoading } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [gstin, setgstin] = useState<string>("");
  const [address, setAddress] = useState<addressType>({
    street: "",
    city: "",
    state: "",
    pin: "",
    country: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createClient({ name, gstin, address }));
  };

  useEffect(() => {
    if (error?.message !== "") toast.error(error?.message);
    else if (created) {
      toast.success("Client Created!");
      router.push("/dashboard");
    }
  }, [error, created]);

  return (
    <div className="w-full">
      <form
        action=""
        className="bg-white p-4 rounded-sm mx-auto w-1/2"
        onSubmit={submitHandler}
      >
        <h1 className="mt-2 uppercase mb-6 border-b p-3 text-center font-bold text-[#5a51be] text-xl tracking-wide">
          Add Client
        </h1>
        <div className="grid grid-cols-2 px-4 space-x-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
              Client
            </label>
            <input
              type="text"
              placeholder="Name"
              autoFocus
              className="outline-none border-2 px-4 py-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
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
        <h2 className="font-bold tracking-wide my-4 px-4">Address: </h2>
        <div className="grid grid-cols-2 my-4 px-4">
          <div className="flex flex-col m-1">
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
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
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              className="outline-none border-2 px-4 py-2 rounded-md"
              value={address?.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>
          <div className="flex flex-col m-1">
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
              PIN
            </label>
            <input
              type="text"
              placeholder="Pin"
              className="outline-none border-2 px-4 py-2 rounded-md"
              value={address?.pin}
              onChange={(e) => setAddress({ ...address, pin: e.target.value })}
            />
          </div>
          <div className="flex flex-col m-1">
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
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
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
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
        <div className="flex justify-center my-3">
          <button className="bg-[#5a51be] text-stone-100 px-4 py-2 w-1/2 rounded-sm font-semibold text-lg">
            {isLoading ? "Adding..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
