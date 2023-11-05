import { createContext, useState } from 'react';
import initialImages from '../images.json';

export const GalleryContext = createContext({});

export default function GalleryProvider({ children }) {
  const [images, setImages] = useState(initialImages);

  return (
    <GalleryContext.Provider value={{ images, setImages }}>{children}</GalleryContext.Provider>
  );
}
