import React from "react";
import { Circles } from "react-loader-spinner";

const Loader1 = () => {
  return (
    <div className="d-flex flex-column text-center justify-content-center align-items-center p-4">
      <Circles
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader1;
