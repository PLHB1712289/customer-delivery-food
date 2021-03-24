import React from "react";
import useStyles from "./styles";
import { ClipLoader } from "halogenium";
import { useSelector } from "react-redux";

const Loading = () => {
  var color = "#4DAF7C";

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

  const { isdisplay } = useSelector((state) => state.loading);

  return (
    <>
      {isdisplay && (
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
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={style}>
            <ClipLoader color={color} size="50px" margin="4px" />
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
// export default Loading;
