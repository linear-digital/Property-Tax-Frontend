import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";

function generateBarcodeBase64(text: string) {
  const canvas = createCanvas(200, 100);
  JsBarcode(canvas, text, {
    format: "CODE128",
    displayValue: true,
    width: 1,
    height: 50,
  });
  return canvas.toDataURL("image/png");
}

export default generateBarcodeBase64;