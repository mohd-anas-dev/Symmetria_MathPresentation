import React from "react";
// import "../WebPageStyling/Flag.css"; // Optional CSS for flag styling

const Flag = React.forwardRef(({ color }, ref) => {
  return (
    <div ref={ref} className={`flag ${color}`}>
      {/* You can replace with an image if needed */}
    </div>
  );
});

export default Flag;
