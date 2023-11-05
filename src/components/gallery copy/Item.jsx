import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useGalleryContext from '../../hooks/useGallerycontext';

export default function Item({ item, index, id }) {
  const { setImages } = useGalleryContext();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSelect = (id) => {
    setImages((prevState) =>
      prevState?.map((item) => {
        return item?.id === id ? { ...item, isSelected: !item?.isSelected } : item;
      })
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group rounded-lg ${index === 0 ? 'row-span-2 col-span-2' : ''} ${
        item?.isSelected ? 'bg-slate-100' : ''
      }`}
    >
      <img
        className={`h-auto max-w-full rounded-lg shadow hover:shadow-lg ${
          item?.isSelected ? 'opacity-40' : ''
        }`}
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
  );
}
