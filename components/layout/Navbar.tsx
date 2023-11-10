import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import AlertDialogExample from "../alerts/AlertDialog";
import { getCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { faPlus, faSync } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const uEmail = useSelector<AppState>(
    (state) => state.user.user.email
  ) as string;
  const [isOpen, onClose] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getCookie() ? setAuth(true) : setAuth(false);
  }, []);

  const getDynamicText = () => {
    const currentRoute = router.asPath as keyof typeof textMap;
    const textMap = {
      "/dashboard": {
        text: (
          <div className="flex items-center uppercase">
            <h1>Home</h1>
            <span className="mx-2 text-sm text-stone-600">
              <FontAwesomeIcon icon={faGreaterThan} />
            </span>
            <p
              className="text-stone-500 font-light text-sm tracking-wide hover:text-stone-400 transition-colors delay-[.1s] ease-in"
            >
              Dashboard
            </p>
          </div>
        ),
        marginRight: "39.5rem",
      },
      "/addClient": {
        text: (
          <div className="flex items-center uppercase">
            <h1>Home</h1>
            <span className="mx-2 text-sm text-stone-600">
              <FontAwesomeIcon icon={faGreaterThan} />
            </span>
            <p
              className="text-stone-500 font-light text-sm tracking-wide hover:text-stone-400 transition-colors delay-[.1s] ease-in"
            >
              Add Client
            </p>
          </div>
        ),
        marginRight: "39.5rem",
      },
      "/addProject": {
        text: (
          <div className="flex items-center uppercase">
            <h1>Home</h1>
            <span className="mx-2 text-sm text-stone-600">
              <FontAwesomeIcon icon={faGreaterThan} />
            </span>
            <p
              className="text-stone-500 font-light text-sm tracking-wide hover:text-stone-400 transition-colors delay-[.1s] ease-in"
            >
              Add Project
            </p>
          </div>
        ),
        marginRight: "39.5rem",
      },
      "/generateInvoice": {
        text: (
          <div className="flex items-center uppercase">
            <h1>Home</h1>
            <span className="mx-2 text-sm text-stone-600">
              <FontAwesomeIcon icon={faGreaterThan} />
            </span>
            <p
              className="text-stone-500 font-light text-sm tracking-wide hover:text-stone-400 transition-colors delay-[.1s] ease-in"
            >
              Generate Invoice
            </p>
          </div>
        ),
        marginRight: "39.5rem",
      },
      "/history": {
        text: (
          <div className="flex items-center uppercase">
            <h1>Home</h1>
            <span className="mx-2 text-sm text-stone-600">
              <FontAwesomeIcon icon={faGreaterThan} />
            </span>
            <p
              className="text-stone-500 font-light text-sm tracking-wide hover:text-stone-400 transition-colors delay-[.1s] ease-in"
            >
              History
            </p>
          </div>
        ),
        marginRight: "39.5rem",
      },
    };

    return textMap[currentRoute] || { text: "", marginRight: "" };
  };

  return (
    <>
      <header className="w-full bg-white">
        <nav className="p-4">
          {auth ? (
            <ul className="flex justify-between items-center">
              <li className="font-semibold text-md text-[#5a51be]">
                {getDynamicText().text}
              </li>
              <div className="flex">
                <li className="font-semibold mx-3 text-md underline text-slate-700">
                  {uEmail}
                </li>
                <li
                  className="font-bolder mx-3 text-lg cursor-pointer"
                  title="Logout"
                >
                  <Image
                    src="/images/logout.png"
                    alt=""
                    width={100}
                    height={100}
                    className="w-6"
                    onClick={() => onClose(true)}
                  />
                </li>
              </div>
            </ul>
          ) : (
            <ul className="flex justify-end items-center mx-4">
              <li
                className="font-semibold text-lg px-4 py-1 cursor-pointer rounded-sm bg-[#5a51be] text-stone-100 bg"
                onClick={() => router.push("/")}
              >
                Login
              </li>
            </ul>
          )}
        </nav>
      </header>
      {
        <AlertDialogExample
          _id=""
          isOpen={isOpen}
          onClose={onClose}
          filter="logout"
        />
      }
    </>
  );
};

export default Navbar;
