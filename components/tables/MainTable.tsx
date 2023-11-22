import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/project";
import { AppDispatch, AppState } from "../store/store";
import { fetchClient } from "../store/client";
import ClientTable from "./clientTable";
import ProjectTable from "./projectTable";

const MainTable = () => {
  const [select, setSelect] = useState("clients");
  const dispatch = useDispatch<AppDispatch>();

  const changeHandler = async (e: { target: { value: string } }) => {
    setSelect(e.target.value);
    console.log(e.target.value);

    e.target.value === "clients"
      ? await dispatch(fetchClient())
      : await dispatch(fetchProjects());
  };

  return (
    <div className=" bg-white p-4 rounded-md">
      <div className="flex justify-between">
        <h1 className="text-xl text-[#5a51be] uppercase font-bold mt-4 mb-8 p-1">{`${
          select === "clients" ? "All Clients" : "All Projects"
        }`}</h1>

        <div className="flex">
          <form action="" className="flex flex-row items-center space-x-4">
            <label className="space-x-2 flex items-center">
              <input
                type="radio"
                value="clients"
                checked={select === "clients"}
                onChange={changeHandler}
                id="purple-radio"
                className="accent-[#5a51be] cursor-pointer"
              />
              <span className="text-sm tracking-wider text-stone-700">View Clients</span>
            </label>

            <label className="space-x-2 flex items-center">
              <input
                type="radio"
                value="projects"
                checked={select === "projects"}
                onChange={changeHandler}
                className="accent-[#5a51be] cursor-pointer"
              />
              <span className="text-sm tracking-wider text-stone-700">View Projects</span>
            </label>
          </form>
        </div>
      </div>
      {select === "clients" ? <ClientTable /> : <ProjectTable />}
    </div>
  );
};

export default MainTable;
