import { useState } from 'react';
import initialImages from '../images.json';

export default function Gallery() {
  const [images, setImages] = useState(initialImages);

  const handleAllUnCheck = () => {
    setImages((prevState) => prevState?.map((item) => ({ ...item, isSelected: false })));
  };

  const handleSelect = (id) => {
    setImages((prevState) =>
      prevState?.map((item) => {
        return item?.id === id ? { ...item, isSelected: !item?.isSelected } : item;
      })
    );
  };

  const deleteHandler = () => {
    setImages((prevState) => prevState?.filter((item) => !item?.isSelected));
  };

  const numSelectedImage = images?.filter((item) => item?.isSelected)?.length;

  return (
    <div className="shadow bg-slate-50 rounded-lg">
      {numSelectedImage > 0 ? (
        <div className="px-10 py-2.5 flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="myCheckbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-xl cursor-pointer"
              checked={numSelectedImage}
              onChange={handleAllUnCheck}
            />
            <label htmlFor="myCheckbox" className="ml-2 text-lg font-semibold">
              {numSelectedImage} Files selected
            </label>
          </div>
          <div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={deleteHandler}>
              Delete Files
            </button>
          </div>
        </div>
      ) : (
        <div className="px-10 py-4 text-lg font-semibold">Gallery</div>
      )}
      <hr />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-10 py-4">
        {images?.map((item, index) => (
          <div
            key={item?.id}
            className={`relative group ${index === 0 ? 'row-span-2 col-span-2' : ''}`}
          >
            <img
              className="h-auto max-w-full rounded-lg shadow hover:shadow-lg"
              src={item?.url}
              alt="Ollyo"
            />
            <div className="absolute inset-0 bg-black rounded-lg opacity-0 group-hover:opacity-25 transition-opacity" />
            <input
              type="checkbox"
              className="absolute top-2 left-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-xl cursor-pointer"
              checked={Boolean(item?.isSelected)}
              onChange={() => handleSelect(item?.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
