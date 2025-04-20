import { useEffect, useState, useRef } from "react";
import { getPhotos, printPhoto, Photo } from "../api/photos";
import { BASE_URL } from "../api/photos";
import { HomeIcon, PrinterIcon } from "@heroicons/react/24/solid";

const PHOTOS_PER_PAGE = 20;

export default function GalleryScreen({ goBack }: { goBack: () => void }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load photos when page changes
  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoading(true);
      try {
        const offset = page * PHOTOS_PER_PAGE;
        const newPhotos = await getPhotos(offset, PHOTOS_PER_PAGE);
        setPhotos((prev) => [...prev, ...newPhotos]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, [page]);

  // Trigger next page on scroll
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-900 text-white" onScroll={handleScroll} ref={containerRef}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gray-900 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <button
          onClick={goBack}
          className="btn btn-primary inline-flex items-center justify-center gap-2"
        >
          <HomeIcon className="w-5 h-5" /> Back
        </button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-gray-900 rounded shadow-md overflow-hidden flex flex-col items-center w-full"
          >
            <img
              src={`${BASE_URL}/${photo.filename}`}
              alt={`Photo ${photo.id}`}
              className="w-full object-contain max-h-96"
            />
            <button
              onClick={() => printPhoto(photo.id)}
              className="btn btn-print w-full inline-flex items-center justify-center gap-2"
            >
              <PrinterIcon className="w-5 h-5" /> Print
            </button>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center py-4 text-gray-400 text-sm">Loading more photos…</div>
      )}
    </div>
  );
}
