import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { userStateType } from "@/types/types";
import ButtonLoading from "../spinners/buttonLoading";

const TopHeader = () => {
  const { user, isLoading } = useSelector<AppState>(
    (state) => state.user
  ) as userStateType;

  return (
    <div className="grid grid-cols-[50%_50%] my-4">
      <div>
        <img src="/images/logo.png" alt="" className="" />
      </div>
      {isLoading ? (
        <ButtonLoading />
      ) : (
        <div className="px-8">
          <h1 className="uppercase font-semibold">{user?.name}</h1>
          <h5 className="font-semibold">
            GSTIN: <span className="uppercase">{user?.gstin}</span>
          </h5>
          <h5 className="font-semibold">
            PAN: <span>{user?.pan}</span>
          </h5>
          <p className="font-semibold">{`${user?.address.street}, ${user?.address.city} ${user?.address.pin}, ${user?.address.state}, ${user?.address.country}`}</p>
          <p className="font-semibold">
            <span className="underline text-blue-500">{user?.email}</span>
            <span> | </span>
            <span>+91-{user?.contact}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TopHeader;
