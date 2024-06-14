// components/common/pop-up-modal.tsx

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartmentList: { apartmentNo: number; residents: { id: string; name: string; }[] }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, apartmentList }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Occupied Apartments
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
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

                <div className="mt-4">
                  <Button onClick={onClose}>Close</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
