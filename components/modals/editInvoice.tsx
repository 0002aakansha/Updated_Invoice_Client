import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function EditInvoice({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (flag: boolean) => void;
}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {};

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register("projects")} className="border" />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={() => onClose(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
