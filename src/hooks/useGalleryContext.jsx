import { useContext } from 'react';
import { GalleryContext } from '../contexts/GalleryContext';

export default function useGalleryContext() {
  return useContext(GalleryContext);
}
