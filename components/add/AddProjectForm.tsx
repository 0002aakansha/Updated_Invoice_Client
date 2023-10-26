import React, { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import { clientStateType, projectStateType, rateType } from "@/types/types";
import { createProject, setCreate } from "../store/project";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import TextLoaders from "../spinners/textLoaders";

const AddProjectForm = () => {
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState<rateType>({ currency: "INR", rate: 0 });
  const [projectType, setProjectType] = useState<string>("monthly");
  const [conversionRate, setConversionRate] = useState<number>();
  const [projectAmount, setProjectAmount] = useState<number>();
  const [BelongsTo, setBelongsTo] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { clients } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;

  const { error, created, isLoading } = useSelector<AppState>(
    (state) => state.project
  ) as projectStateType;

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    projectType === "hourly"
      ? await dispatch(
          createProject({
            description,
            rate,
            projectType,
            conversionRate,
            amount: projectAmount,
            companyId: BelongsTo,
          })
        )
      : await dispatch(
          createProject({
            description,
            rate: { currency: rate.currency },
            projectType,
            conversionRate,
            amount: projectAmount,
            companyId: BelongsTo,
          })
        );
  };

  useEffect(() => {
    setBelongsTo(clients[0]?._id);
    if (error?.message !== "") toast.error(error?.message);
    else if (created) {
      toast.success("Project Created!");
      router.push("/dashboard");
      dispatch(setCreate());
    }
  }, [error, created]);

  return (
    <div className="w-full">
      <form
        action=""
        className="bg-white p-4 rounded-sm mx-auto w-1/2 sm:w-1/2 xs:w-3/4"
        onSubmit={submitHandler}
      >
        <h1 className="mt-2 mb-4 uppercase border-b p-3 text-center font-bold text-[#5a51be] xs:text-xs sm:text-sm md:text-xl tracking-wide">
          Add Project
        </h1>
        <div className="p-4">
          <div className="flex flex-col my-2">
            <label
              htmlFor="name"
              className="font-semibold tracking-wide mb-2 xs:text-xs sm:text-sm md:text-md"
            >
              Description
            </label>
            <input
              type="text"
              placeholder="Description"
              className="outline-none border-2 px-4 py-2 rounded-md xs:text-xs sm:text-sm md:text-md xs:w-full"
              value={description}
              onChange={(e) => {
                const inputValue = e.target.value;
                const pattern = /^[A-Za-z\s]*$/;
                if (pattern.test(inputValue) || inputValue === "") {
                  setDescription(inputValue);
                }
              }}
            />
          </div>
          <div className="sm:grid sm:grid-cols-1   md:grid md:grid-cols-2 space-x-2 my-2">
            <div>
              <div className="flex flex-col my-2">
                <label
                  htmlFor="name"
                  className="font-semibold tracking-wide mb-2 xs:text-xs sm:text-sm md:text-md"
                >
                  Project Type
                </label>
                <select
                  name=""
                  id=""
                  className="bg-white outline-none border-2 px-4 py-2 rounded-md xs:text-xs sm:text-sm md:text-md"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="name"
                className="font-semibold tracking-wide mb-2 xs:text-xs sm:text-sm md:text-md"
              >
                Project Amount
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Project Amount"
                className="outline-none border-2 px-4 py-2 rounded-md xs:text-xs sm:text-sm md:text-md"
                value={projectAmount === 0 ? "" : projectAmount}
                onChange={(e) => {
                  const input = e.target.value;
                  if (input === "" || !isNaN(+input)) {
                    setProjectAmount(input === "" ? 0 : parseFloat(input));
                  }
                }}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 space-x-2 my-2">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="font-semibold tracking-wide mb-2 xs:text-xs sm:text-sm md:text-md"
              >
                Currency
              </label>
              <select
                name=""
                id=""
                className="bg-white outline-none border-2 px-4 py-2 rounded-md xs:text-xs sm:text-sm md:text-md"
                value={rate?.currency}
                onChange={(e) => setRate({ ...rate, currency: e.target.value })}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="POUND">POUND</option>
              </select>
            </div>

            


            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="font-semibold tracking-wide mb-2 xs:text-xs sm:text-sm md:text-md"
              >
                Rate
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Rate"
                disabled={projectType === "monthly" ? true : false}
                className={`outline-none border-2 px-4 py-2 rounded-md xs:text-xs sm:text-sm md:text-md ${
                  projectType === "monthly"
                    ? "cursor-not-allowed bg-stone-100"
                    : "cursor-text"
                }`}
                value={rate?.rate || ""}
                onChange={(e) => {
                  const input = e.target.value;
                  setRate({ ...rate, rate: +input || 0 });
                }}
              />
            </div>


          </div>
          <div className="sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 space-x-2">
            <div className="flex flex-col my-2">
              <label
                htmlFor="name"
                className="font-semibold tracking-wide mb-2 xs:text-xs sm:text-sm md:text-md md:text-md"
              >
                Conversion Rate
              </label>
              <input
                type="number"
                step="0.01"
                disabled={rate.currency === "INR" ? true : false}
                placeholder="Conversion Rate"
                className={`outline-none border-2 px-4 py-2 rounded-md xs:text-xs sm:text-sm md:text-md  ${
                  rate.currency === "INR"
                    ? "cursor-not-allowed bg-stone-100"
                    : "cursor-text"
                }`}
                value={conversionRate || ""}
                onChange={(e) => {
                  const input = e.target.value;
                  setConversionRate(+input);
                }}
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="name"
                className="font-semibold tracking-wide mb-2 xs:text-xs sm:text-sm md:text-md"
              >
                Belongs To:
              </label>
              <select
                name=""
                id=""
                className="outline-none bg-white border-2 px-4 py-2 rounded-md xs:text-xs sm:text-sm md:text-md"
                value={BelongsTo}
                onChange={(e) => setBelongsTo(e.target.value)}
              >
                {clients?.map((client) => (
                  <option value={client?._id} key={client._id}>
                    {client?.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-3">
          <button className="bg-[#5a51be] text-stone-100 px-4 py-2 w-1/2 rounded-sm font-semibold xs:text-xs sm:text-sm md:text-md">
            {isLoading ? <TextLoaders /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
