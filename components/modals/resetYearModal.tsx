

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

function ResetYearModal({ isOpen, onClose }: { isOpen: boolean; onClose: (value: boolean) => void }) {
  const [selectedYear, setSelectedYear] = useState<Date | null>();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  //const minDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
  const minDate = `${currentYear}-${currentMonth.toString()}`;

  useEffect(()=>{
  if(isOpen){
    setSelectedYear(null)
  }
  },[isOpen])

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Year</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <input
                type="month"
                value={selectedYear ? selectedYear.toISOString().slice(0, 7) : `${currentYear}-${currentMonth}`} 
                min={minDate}
                onChange={(e: any) => {
                  const selectedDate = new Date(e.target.value);
                  if (selectedDate >= new Date(minDate)) {
                    setSelectedYear(selectedDate);
                  }
                }}
                className="border-2 mt-2 px-4 py-2 w-full rounded-sm outline-none"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3}>
                Reset Year
              </Button>
              <Button onClick={() => onClose(false)}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResetYearModal;
