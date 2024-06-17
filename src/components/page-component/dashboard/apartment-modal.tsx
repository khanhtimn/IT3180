import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartmentList: { apartmentNo: number; residents: { id: string; name: string; }[] }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, apartmentList }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin căn hộ</DialogTitle>
          <DialogDescription>Danh sách cư dân trong căn hộ</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {apartmentList.map((apartment) => (
            <div key={apartment.apartmentNo} className="mb-4">
              <h4 className="font-bold">Căn hộ số: {apartment.apartmentNo}</h4>
              <ul className="list-disc list-inside">
                {apartment.residents.map((resident) => (
                  <li key={resident.id}>{resident.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
