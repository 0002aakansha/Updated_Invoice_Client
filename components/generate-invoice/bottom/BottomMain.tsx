import Table from "./Table";
import Account from "./Account";
import Total from "./Total";
import { useSelector } from "react-redux";
import { AppState } from "@/components/store/store";
import { clientStateType } from "@/types/types";
import NotFound from "@/components/alerts/notFound";
import ButtonLoading from "@/components/spinners/buttonLoading";
import GeneratePDF from "./GeneratePDF";

const BottomMain = () => {
  const clients = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;

  return (
    <>
      {clients.isLoading ? (
        <ButtonLoading />
      ) : (
        !clients.isHidden &&
        (clients.projects?.length !== 0 ? (
          <>
            <Table />
            <div className="flex justify-between my-[2rem]">
              <Account />
              <Total />
            </div>
            <GeneratePDF />
          </>
        ) : (
          <NotFound title="0 Project" description='Please add project first!' />
        ))
      )}
    </>
  );
};

export default BottomMain;
