import AllItem from '../components/gallery/AllItem';
import Header from '../components/gallery/Header';
import GalleryProvider from '../contexts/GalleryContext';

export default function Gallery() {
  return (
    <GalleryProvider>
      <div className="shadow bg-slate-50 rounded-lg">
        <Header />
        <hr />
        <AllItem />
      </div>
    </GalleryProvider>
  );
}
