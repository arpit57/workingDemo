// import React from "react";
// import DownloadIcon from "@mui/icons-material/Download";
// import { IconButton } from "@mui/material";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// function FloorBoard() {
//   const downloadImg = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch("/floorboard.jpg");
//       const blob = await response.blob();

//       const url = window.URL.createObjectURL(blob);
//       let aTag = document.createElement("a");
//       aTag.href = url;
//       aTag.download = `Floor Plan.jpg`;
//       aTag.click();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading image:", error);
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}
//       >
//         <h3>Floor Board</h3>
//         <IconButton onClick={downloadImg}>
//           <DownloadIcon />
//         </IconButton>
//       </div>

//       <TransformWrapper
//         defaulScale={1}
//         defaultPositionX={0}
//         defaultPositionY={0}
//       >
//         <TransformComponent>
//           <img
//             src={require("../assets/images/floorboard.jpg")}
//             alt="floor-plan"
//             width="100%"
//           />
//         </TransformComponent>
//       </TransformWrapper>
//     </div>
//   );
// }

// export default FloorBoard;

import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton, Tooltip } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

function App() {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Tooltip title="Zoom in">
          <IconButton onClick={() => zoomIn()}>
            <ZoomInIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Zoom out">
          <IconButton onClick={() => zoomOut()}>
            <ZoomOutIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reset">
          <IconButton onClick={() => resetTransform()}>
            <RestartAltIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const downloadImg = async (imageUrl, fileName) => {
    try {
      const response = await fetch("/floorboard.jpg");
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      let aTag = document.createElement("a");
      aTag.href = url;
      aTag.download = `Floor Plan.jpg`;
      aTag.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}
      >
        <h3>Floor Board</h3>
        <IconButton onClick={downloadImg}>
          <DownloadIcon />
        </IconButton>
      </div>
      <TransformWrapper>
        <TransformComponent>
          <img
            src={require("../assets/images/floorboard.jpg")}
            alt="test"
            width="100%"
          />
        </TransformComponent>

        <Controls />
      </TransformWrapper>
    </>
  );
}

export default App;
