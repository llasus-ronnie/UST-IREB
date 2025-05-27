import React, { useState, useRef } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import flowchart from "../../../../public/images/home/section-4-processflowchart.png";

function ImageZoomComponent() {
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomRef = useRef();

  const handleWheel = (event) => {
    if (zoomRef.current) {
      event.preventDefault();
      if (event.deltaY < 0) {
        zoomRef.current.zoomIn();
      } else {
        zoomRef.current.zoomOut();
      }
    }
  };

  return (
    <div className="zoom-container" onWheel={handleWheel}>
      <Zoom
        ref={zoomRef}
        zoomMargin={20}
        overlayBgColorEnd="rgba(0, 0, 0, 1)"
        onZoomChange={(zoom) => setIsZoomed(zoom)}
      >
        <Image
          src={flowchart}
          alt="Flowchart"
          width={800}
          height={600}
          className="flowchart-image"
        />
      </Zoom>

      {isZoomed && (
        <div className="zoom-instructions">
          <p>Drag to pan and scroll to zoom further</p>
        </div>
      )}
    </div>
  );
}

export default ImageZoomComponent;
