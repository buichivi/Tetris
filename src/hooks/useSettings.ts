import { useState } from 'react';

const useSettings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return { isOpen, toggleOpen };
};

export default useSettings;
