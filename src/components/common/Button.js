import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  primary = false, 
  className = '', 
  type = 'button' 
}) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium focus:outline-none transition-colors";
  const primaryClasses = "bg-[#2ABBB6] text-white hover:bg-[#1faca7]";
  const secondaryClasses = "bg-white text-[#2ABBB6] border border-[#2ABBB6] hover:bg-gray-50";
  
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`;
  
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
