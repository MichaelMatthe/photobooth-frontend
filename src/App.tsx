import { useState } from "react";
import PhotoBoothScreen from "./components/PhotoBoothScreen";
import GalleryScreen from "./components/GalleryScreen";

function App() {
  const [view, setView] = useState<"home" | "gallery">("home");

  return view === "home" ? (
    <PhotoBoothScreen openGallery={() => setView("gallery")} />
  ) : (
    <GalleryScreen goBack={() => setView("home")} />
  );
}


export default App;
