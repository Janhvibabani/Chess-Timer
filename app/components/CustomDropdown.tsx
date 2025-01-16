import React, { useState, useRef, useEffect } from 'react';
import { Columns2, StretchHorizontal, ChevronDown } from 'lucide-react';

interface CustomDropdownProps {
  layout: string;
  setLayout: (layout: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ layout, setLayout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (layout: string) => {
    setLayout(layout);
    setIsOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="dropdown-button text-black text-2xl text-center font-sans bg-[#FFFBE6] border-b-2 border-[#647C90] focus:outline-none px-4 py-1 cursor-pointer flex items-center z-10"
        onClick={toggleDropdown}
      >
        {layout === 'horizontal' ? 'Horizontal' : 'Vertical'}
        <ChevronDown size={20} className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-[#647C90] mt-1 rounded shadow-lg z-10">
          <div onClick={() => handleOptionClick('horizontal')} className="dropdown-item">
            <Columns2 size={20} className="mr-2" /> Horizontal
          </div>
          <div onClick={() => handleOptionClick('vertical')} className="dropdown-item">
            <StretchHorizontal size={20} className="mr-2" /> Vertical
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;