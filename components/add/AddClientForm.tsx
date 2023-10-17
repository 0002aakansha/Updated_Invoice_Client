import { addressType, clientStateType } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";
import { AppDispatch, AppState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createClient, setCreate } from "../store/client";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { states } from "@/utils/states";
import TextLoaders from "../spinners/textLoaders";

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
    state: states[0],
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
      dispatch(setCreate())
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
              required
              className="outline-none border-2 px-4 py-2 rounded-md"
              value={name}
              onChange={(e) => {
                const inputValue = e.target.value;
                const pattern = /^[A-Za-z\s]*$/;
                if (pattern.test(inputValue) || inputValue === '') {
                  setName(inputValue);
                }
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
              GSTIN
            </label>
            <input
              type="text"
              placeholder="GSTIN"
              required
              className="outline-none border-2 px-4 py-2 rounded-md"
              value={gstin}
              maxLength={15}
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
              required
              onChange={(e) => {
                const inputValue = e.target.value;
                const pattern = /^[A-Za-z\s]*$/;
                if (pattern.test(inputValue) || inputValue === '') {
                  setAddress({ ...address, street: inputValue });
                }
              }}
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
              required
              onChange={(e) => {
                const inputValue = e.target.value;
                const pattern = /^[A-Za-z\s]*$/;
                if(pattern.test(inputValue) || inputValue === ''){
                  setAddress({ ...address, city: inputValue });
                }
              }}
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
              maxLength={6}
              required
              onChange={(e) => {
                const inputValue = e.target.value;
                const alphabeticValue = inputValue.replace(/[^0-9]/g, '');
                setAddress({ ...address, pin: alphabeticValue });
              }}
            />
          </div>
          <div className="flex flex-col m-1">
            <label htmlFor="name" className="font-semibold tracking-wide mb-2">
              State
            </label>
            <select
              className="outline-none border-2 px-4 py-2 rounded-md"
              value={address?.state}
              required
              onChange={(e) => setAddress({ ...address, state: e.target.value })}>
              {
                states.map(state => <option key={state} value={state}>{state}</option>)
              }
            </select>
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
              required
              onChange={(e) => {
                const inputValue = e.target.value;
                const alphabeticValue = inputValue.replace(/[^A-Za-z]/g, '');
                setAddress({ ...address, country: alphabeticValue });
              }}
            />
          </div>
        </div>
        <div className="flex justify-center my-3">
          <button className="bg-[#5a51be] text-stone-100 px-4 py-2 w-1/2 rounded-sm font-semibold text-lg">
            {isLoading ? <TextLoaders /> : "Submit"}
          </button>
        </div>
      </form >
    </div >
  );
};

export default AddClientForm;
