import addImageSVG from '../../assets/images/add-image.svg';
import blankImageSVG from '../../assets/images/blank-image.png';

export default function AddImage({ dndRef }) {
  return (
    <div
      ref={dndRef}
      className={`relative border-2 border-dashed border-gray-400 rounded-md flex flex-col justify-center items-center w-full h-auto cursor-pointer overflow-hidden`}
    >
      <img className="w-full max-w-full h-auto" src={blankImageSVG} alt="Ollyo" />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center text-center py-2.5 w-full h-full">
        <img src={addImageSVG} alt="Ollyo" width={32} />
        <p className="m-0 mt-[5px] text-xs md:text-lg">Add Images</p>
      </div>
    </div>
  );
}
