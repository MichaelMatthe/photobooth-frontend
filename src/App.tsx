import { useState } from "react";

interface Image {
  id: number;
  filename: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/images");
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data: Image[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Photobooth Images</h1>
      <button onClick={fetchImages}>Load Images</button>

      {loading && <p>Loading...</p>}

      <ul>
        {images.map((img) => (

          <li key={img.filename}>
              <a
              href={`http://127.0.0.1:8000/image/${img.filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {img.filename}
            </a>
            <br />
            <img
              src={`http://127.0.0.1:8000/image/${img.filename}`}
              alt={img.filename}
              style={{ maxWidth: '300px', marginTop: '10px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
