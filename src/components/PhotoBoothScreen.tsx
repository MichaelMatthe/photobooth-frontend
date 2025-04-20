import { useState } from "react";
import { capturePhoto, printPhoto, Photo, BASE_URL } from "../api/photos";
import { CameraIcon, PrinterIcon, PhotoIcon } from "@heroicons/react/24/solid";

interface Props {
  openGallery: () => void;
}

export default function PhotoBoothScreen({ openGallery }: Props) {
  const [latestPhoto, setLatestPhoto] = useState<Photo | null>(null);

  const handleCapture = async () => {
    try {
      const photo = await capturePhoto();
      setLatestPhoto(photo);
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const handlePrint = async () => {
    if (!latestPhoto) return;
    await printPhoto(latestPhoto.id);
  };

  return (
    <div className="">
      <div className="sticky top-0 z-10 bg-gray-900 text-white py-4">
        <h1 className="text-6xl font-bold text-center">Photobooth</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-900 text-white">

        {latestPhoto && (
          <div
              key={latestPhoto.id}
              className="bg-gray-900 rounded shadow-md overflow-hidden flex flex-col items-center w-full max-w-[900px] max-h-[700px] mx-auto"
            >
              <img
                src={`${BASE_URL}/${latestPhoto.filename}`}
                alt={`Photo ${latestPhoto.id}`}
                className="w-full h-full object-contain"
              />
              <button
              onClick={() => handlePrint()}
              className="btn btn-print w-full inline-flex items-center justify-center gap-2"
            >
              <PrinterIcon className="w-5 h-5" /> Print
            </button>
            </div>
        )}

        <button onClick={handleCapture} className="btn btn-primary w-full max-w-md inline-flex items-center justify-center gap-2">
          <CameraIcon className={"w-5 h-5"}/>Take Photo
        </button>
        <button onClick={openGallery} className="btn btn-primary w-full max-w-md inline-flex items-center justify-center gap-2">
          <PhotoIcon className="w-5 h-5" /> View Gallery
        </button>
      </div>
    </div>
  );
}
