import { useState, useEffect, useRef } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsContentVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as unknown as Node).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return {
    isOpen,
    isContentVisible,
    toggleDropdown,
    dropdownRef,
    setIsContentVisible, // Exponha isso se precisar de controle externo
  };
};

export default useDropdown;
