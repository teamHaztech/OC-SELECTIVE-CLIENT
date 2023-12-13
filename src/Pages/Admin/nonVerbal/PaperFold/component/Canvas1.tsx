import React, { useEffect, useRef } from "react";

const Canvas1 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Your drawing code goes here
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set the fill style to red
        ctx.fillStyle = "red";

        // Draw the first square
        ctx.fillRect(10, 10, 100, 100);

        // Set the fill style to blue
        ctx.fillStyle = "blue";

        // Draw the second square
        ctx.fillRect(150, 10, 100, 100);

        // Set the fill style to green
        ctx.fillStyle = "green";

        // Draw the third square
        ctx.fillRect(10, 150, 100, 100);

        // Update the canvas
        // canvas?.render();
        // Set the stroke style to black
        ctx.strokeStyle = "black";
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={800} height={400}>
      Your browser does not support the HTML5 canvas element.
    </canvas>
  );
};

export default Canvas1;
