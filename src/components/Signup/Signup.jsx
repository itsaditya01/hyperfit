import { React, useEffect } from "react";
let nextCnt = 0;

const Signup = () => {
  const FormComponent = () => {
    if (nextCnt === 0) {
      return (
        <div
          style={{
            color: "white",
            fontSize: "100px",
            width: "max-content",
            height: "max-content",
          }}
        >
          <p>Hello world</p>
          <button
            onClick={() => {
              nextCnt = nextCnt + 1;
            }}
          >
            Next
          </button>
          ;
        </div>
      );
    } else if (nextCnt === 1) {
      return <div style={{ color: "white", fontSize: "100px" }}>Bye world</div>;
    }
  };
  useEffect(() => {
    return <FormComponent />;
  }, [nextCnt]);
  return (
    <div className="Signup-main" style={{ background: "black" }}>
      {/* <FormComponent nextCnt={nextCnt} /> */}
    </div>
  );
};

export default Signup;
