export function createContext(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d")!;
}

export function getMouseCoordsOnCanvas(canvas: HTMLCanvasElement, clientX: number, clientY: number): [number, number] {
  const canvasRect = canvas.getBoundingClientRect();
  clientX = Math.round(clientX);
  clientY = Math.round(clientY);
  return [
    clientX - Math.round(canvasRect.left),
    clientY - Math.round(canvasRect.top)
  ];
}
