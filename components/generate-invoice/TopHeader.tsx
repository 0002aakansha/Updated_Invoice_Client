import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { userStateType } from "@/types/types";
import ButtonLoading from "../spinners/buttonLoading";

const TopHeader = () => {
  const { user, isLoading } = useSelector<AppState>(
    (state) => state.user
  ) as userStateType;

  return (
    <div className="sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 my-4 ">
      <div>
        {
          user?.name?.toLowerCase().startsWith('gammaedge') ? <img src="/images/logo.png" alt="" className="" /> : <img src="/images/cubexoLogo.png" alt="" className="w-1/2" />
        }
      </div>
      {isLoading ? (
        <ButtonLoading />
      ) : (
        <div className="px-8 xs:mt-5 xs:pl-0 xs:pr-0 xs:text-xs md:text-base">
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
