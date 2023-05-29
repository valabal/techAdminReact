import React from "react";
import "./activityLoader.css";

const ActivityLoader = (props) => {
  const { size } = props;
  console.log(size);
  return (
    <div className='midle' data-testid='activity-loader'>
      <div
        className='loader'
        style={{ width: size ?? "30px", height: size ?? "30px" }}
      ></div>
    </div>
  );
};

export default ActivityLoader;
