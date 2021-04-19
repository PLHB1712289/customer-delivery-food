import React from "react";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

const Loading = () => {
  var style = {
    display: "-webkit-flex",
    display: "flex",
    WebkitFlex: "0 1 auto",
    flex: "0 1 auto",
    WebkitFlexDirection: "column",
    flexDirection: "column",
    WebkitFlexGrow: 1,
    flexGrow: 1,
    WebkitFlexShrink: 0,
    flexShrink: 0,
    WebkitFlexBasis: "25%",
    flexBasis: "25%",
    maxWidth: "25%",
    height: "200px",
    WebkitAlignItems: "center",
    alignItems: "center",
    WebkitJustifyContent: "center",
    justifyContent: "center",
  };

  const isdisplay = useSelector((state) => state.loading);

  return (
    <>
      {isdisplay === true ? (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            boxSizing: "border-box",
            display: "-webkit-flex",
            display: "flex",
            WebkitFlex: "0 1 auto",
            flex: "0 1 auto",
            WebkitFlexDirection: "row",
            flexDirection: "row",
            WebkitFlexWrap: "wrap",
            flexWrap: "wrap",
            zIndex: 10000,
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div style={style}>
            <ReactLoading
              type="spinningBubbles"
              color="#cf2127"
              eight={"30%"}
              width={"30%"}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Loading;
// export default Loading;
