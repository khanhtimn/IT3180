import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  residentList: { id: string; name: string; phoneNumber: string; apartmentNo: number; vehicle: string }[];
}

const ResidentModal: React.FC<ModalProps> = ({ isOpen, onClose, residentList }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const startIndex = currentPage * itemsPerPage;
  const selectedResidents = residentList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(residentList.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin cư dân</DialogTitle>
          <DialogDescription>Danh sách các cư dân trong hệ thống</DialogDescription>
        </DialogHeader>
        <Accordion type="multiple">
          {selectedResidents.map((resident) => (
            <AccordionItem key={resident.id} value={resident.id}>
              <AccordionTrigger>{resident.name}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside">
                  <li>Số điện thoại: {resident.phoneNumber}</li>
                  <li>Số căn hộ: {resident.apartmentNo}</li>
                  <li>Phương tiện: {resident.vehicle}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex justify-end items-center pt-6 space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleFirstPage}
            disabled={currentPage === 0}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span>
            {currentPage + 1}/{totalPages}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleLastPage}
            disabled={currentPage === totalPages - 1}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResidentModal;
