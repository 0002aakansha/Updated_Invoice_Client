import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { removeCookie } from "@/utils/cookies";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { DeleteClient } from "../store/client";
import toast from "react-hot-toast";
import { DeleteProject } from "../store/project";

export default function AlertDialogExample({
  isOpen,
  filter,
  onClose,
  _id,
  cid,
}: {
  isOpen: boolean;
  filter: string;
  onClose: (value: boolean) => void;
  _id: string;
  cid?: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = () => {
    removeCookie();
    router.push("/");
  };

  const clientDelete = async () => {
    const { error } = await dispatch(DeleteClient(_id));

    if (error?.message === "Rejected") throw new Error(error);
    onClose(false);
    toast.success("Client Deleted!");
  };

  const projectDelete = async () => {
    const { error } = await dispatch(DeleteProject({ cid, pid: _id }));

    if (error?.message === "Rejected") throw new Error(error);
    onClose(false);
    toast.success("Project Deleted!");
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={() => onClose(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent className="mt-4">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {filter === "logout"
              ? "Logout"
              : filter === "clientDelete"
                ? "Delete Client"
                : "Delete Project"}
          </AlertDialogHeader>

          <AlertDialogBody>
            {`Are you sure? You can't undo this action afterwards.`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={() => onClose(false)}>Cancel</Button>
            <Button
              className=" bg-red-700 text-stone-100 hover:bg-red-600"
              onClick={
                filter === "logout"
                  ? logoutHandler
                  : filter === "clientDelete"
                    ? clientDelete
                    : projectDelete
              }
              ml={3}
            >
              {filter === "logout" ? 'Logout' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
