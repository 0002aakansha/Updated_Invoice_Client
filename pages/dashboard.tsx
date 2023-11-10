import Layout from "@/components/layout/Layout";
import FullPageLoader from "@/components/spinners/fullPageLoader";
import { fetchClient } from "@/components/store/client";
import { AppDispatch, AppState } from "@/components/store/store";
import { clientStateType } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "@/components/cards/Cards";
import MainTable from "@/components/tables/MainTable";
import { fetchProjects } from "@/components/store/project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSync, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getAllInvoice } from "@/components/store/invoiceHistory";
import ResetYearModal from "@/components/modals/resetYearModal";

const Dashboard = () => {
  const { isLoading, error } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const dispatch = useDispatch<AppDispatch>();

  const [isResetYearOpen, setIsResetYearOpen] = useState(false);

  useEffect(() => {
    (async function () {
      await dispatch(fetchClient());
      await dispatch(fetchProjects());
      await dispatch(getAllInvoice());
    })();
  }, []);

  if (error)
    return (
      <Layout>
        {isLoading ? (
          <FullPageLoader />
        ) : (
          <>
            {/* <nav className="flex justify-end space-x-2 p-4 mr-4">
              <button
                className="flex items-center space-x-2 bg-[#5a51be] text-white py-2 px-3 rounded-md text-sm hover:bg-[#6860c7] transition-all delay-[.1s] ease-in"
                // onClick={() => setIsResetYearOpen(true)}
              >
                <FontAwesomeIcon icon={faSync} />
                <span className="font-bold ">Reset Year</span>
              </button>

              <Link href="/addClient">
                <button className="flex items-center space-x-2 bg-[#5a51be] text-white py-2 px-3 rounded-md text-sm hover:bg-[#6860c7] transition-all delay-[.1s] ease-in">
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span className="font-bold ">Add Client</span>
                </button>
              </Link>
              <Link href="/addProject">
                <button className="flex items-center space-x-2 bg-[#5a51be] text-white py-2 px-3 rounded-md text-sm hover:bg-[#6860c7] transition-all delay-[.1s] ease-in">
                  <FontAwesomeIcon icon={faPlus} />
                  <span className="font-bold">New Project</span>
                </button>
              </Link>
            </nav> */}
            <Cards />
            <div className="flex justify-end my-8 space-x-4 mr-4">
              <button className="flex items-center" onClick={() => setIsResetYearOpen(true)}>
                <FontAwesomeIcon
                  icon={faSync}
                  className="bg-[#5a51be] text-white text-[1.4rem] p-3 shadow-lg rounded-[50%] font-bold mx-1 transition-all delay-100 hover:bg-[#665dc7]"
                />
                <span className="font-bold text-slate-800">Reset Year</span>
              </button>

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
        <ResetYearModal
          isOpen={isResetYearOpen}
          onClose={() => setIsResetYearOpen(false)}
        />
      </Layout>
    );
};

export default Dashboard;
