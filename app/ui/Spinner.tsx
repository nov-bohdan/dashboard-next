import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-gray-700 opacity-75 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-gray-700 opacity-75 animate-ping delay-200"></div>
      </div>
    </div>
  );
};

export default Spinner;
