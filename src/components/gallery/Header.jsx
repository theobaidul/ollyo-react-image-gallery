import useGalleryContext from '../../hooks/useGallerycontext';

export default function Header() {
  const { images, setImages } = useGalleryContext();

  const handleAllUnCheck = () => {
    setImages((prevState) => prevState?.map((item) => ({ ...item, isSelected: false })));
  };

  const deleteHandler = () => {
    setImages((prevState) => prevState?.filter((item) => !item?.isSelected));
  };

  const numSelectedImage = images?.filter((item) => item?.isSelected)?.length;

  return (
    <>
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
            <button
              className="px-4  py-1 font-semibold border border-red-600 text-red-600 hover:text-white hover:bg-red-600 rounded-lg duration-300"
              onClick={deleteHandler}
            >
              Delete Files
            </button>
          </div>
        </div>
      ) : (
        <div className="px-10 py-4 text-lg font-semibold">Gallery</div>
      )}
    </>
  );
}
