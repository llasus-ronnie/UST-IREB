import React, { useState, useRef } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';
import flowchart from '../../../../public/images/home/section-4-processflowchart.png';

function ImageZoomComponent() {
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomRef = useRef();

  // Handle mouse wheel zoom
  const handleWheel = (event) => {
    if (zoomRef.current) {
      // If zoomed in, prevent the page from scrolling and zoom the image
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
        zoomMargin={20} // Adds some spacing to zoomed image
        overlayBgColorEnd="rgba(0, 0, 0, 1)" // Dark background when zoomed
        onZoomChange={(zoom) => setIsZoomed(zoom)} // Track zoom state
      >
        <Image
          src={flowchart}
          alt="Flowchart"
          width={800}
          height={600}
          className="flowchart-image"
        />
      </Zoom>

      {/* Custom zoom control when zoomed */}
      {isZoomed && (
        <div className="zoom-instructions">
          <p>Drag to pan and scroll to zoom further</p>
        </div>
      )}
    </div>
  );
}

export default ImageZoomComponent;