import Layout from "@/components/layout/Layout";
import FullPageLoader from "@/components/spinners/fullPageLoader";
import { fetchClient } from "@/components/store/client";
import { AppDispatch, AppState } from "@/components/store/store";
import { clientStateType } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Cards from "@/components/cards/Cards";
import MainTable from "@/components/tables/MainTable";
import { fetchProjects } from "@/components/store/project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Dashboard = () => {
  const { isLoading, error } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      await dispatch(fetchClient());
      await dispatch(fetchProjects());
    })();
  }, []);

  if (error)
    return (
      <Layout>
        {isLoading ? (
          <FullPageLoader />
        ) : (
          <>
            <Cards />
            <div className="flex justify-end my-8 space-x-4 mr-4">
              <Link href="/addClient">
                <button className="flex items-center">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="bg-[#5a51be] text-white text-[1.4rem] p-3 shadow-lg rounded-[50%] font-bold mx-1 transition-all delay-100 hover:bg-[#665dc7]"
                  />
                  <span className="font-bold text-slate-800">Add Client</span>
                </button>
              </Link>
              <Link href='/addProject'>
                <button className="flex items-center">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="bg-[#5a51be] text-white text-[1.4rem] p-3 shadow-lg rounded-[50%] font-bold mx-1 transition-all delay-100 hover:bg-[#665dc7]"
                  />
                  <span className="font-bold text-slate-800">Add Project</span>
                </button>
              </Link>
            </div>
            <MainTable />
          </>
        )}
      </Layout>
    );
};

export default Dashboard;
