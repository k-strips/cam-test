import * as React from "react";
import Webcam from "react-webcam";
import { IconLoaderQuarter, IconScan } from "@tabler/icons-react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { AspectRatio } from "./components/ui/aspect-ratio";
import { Button } from "./components/ui/button";
import { extractText } from "./utils/ocr";

const videoConstraints = {
  width: 1920,
  height: 1080,
  // facingMode: "user",

  facingMode: { exact: "environment" },
};

function App() {
  const [text, setText] = React.useState<string | null>(null);
  const [isLoading, setisLoading] = React.useState<boolean>(false);
  const webcamRef = React.useRef<Webcam>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleCapture = React.useCallback(async () => {
    setisLoading(true);
    const image = webcamRef.current?.getScreenshot();
    console.log(image);
    const te = await extractText(image!);
    setText(te!);
    setisLoading(false);
    console.log(te);
  }, []);

  // React.useEffect(() => {
  //   let animationFrameId: number;
  //   const loop = () => {
  //     handleCapture();
  //     animationFrameId = requestAnimationFrame(loop);
  //   };

  //   loop();
  //   return () => cancelAnimationFrame(animationFrameId);
  // }, [handleCapture]);

  return (
    <>
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="capitalize text-gray-900 font-bold">
            card capture demo
          </CardTitle>
          <CardDescription>Capture card pan number</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={1.5} className="relative rounded-lg">
            <Webcam
              screenshotFormat="image/jpeg"
              audio={false}
              ref={webcamRef}
              videoConstraints={videoConstraints}
              width={videoConstraints.width}
              height={videoConstraints.height}
              className="absolute w-full h-full rounded-lg"
            />
            <canvas
              ref={canvasRef}
              width={videoConstraints.width}
              height={videoConstraints.height}
              className="absolute w-full h-full"
            />
            <div className="absolute w-full h-full flex items-center justify-center">
              {isLoading ? (
                <IconLoaderQuarter className="w-16 h-16 animate-spin" />
              ) : (
                <p className="font-bold text-white">{text}</p>
              )}
            </div>
          </AspectRatio>
          <div className="relative w-full h-full -mt-16 md:-mt-20">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              onClick={handleCapture}
            >
              <IconScan className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
