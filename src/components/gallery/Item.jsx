import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useGalleryContext from '../../hooks/useGallerycontext';

export default function Item({ item, index }) {
  const { setImages } = useGalleryContext();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item?.id,
    transition: {
      duration: 300,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({
        ...args,
        wasDragging: true,
      }),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    transformOrigin: '0 0',
    // touchAction: 'none',
  };

  const handleSelect = () => {
    setImages((prevState) =>
      prevState?.map((currectItem) => {
        return currectItem?.id === item?.id
          ? { ...currectItem, isSelected: !currectItem?.isSelected }
          : currectItem;
      })
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group rounded-lg shadow hover:shadow-lg overflow-hidden ${
        index === 0 ? 'row-span-2 col-span-2' : ''
      } ${item?.isSelected ? 'bg-slate-100' : ''}`}
    >
      <img
        className={`w-full max-w-full h-auto rounded-lg ${item?.isSelected ? 'opacity-30' : ''}`}
        src={item?.url}
        alt="Ollyo"
      />
      <div className="absolute inset-0 bg-black rounded-lg opacity-0 group-hover:opacity-25 transition-opacity" />
      <div
        className={
          item?.isSelected
            ? `absolute h-full w-full left-0 top-0 bottom-0 right-0 transition-all`
            : `absolute h-full accent-bg-white w-full left-0 top-0 bottom-0 right-0 opacity-0 transition-all hover:opacity-50`
        }
      >
        <input
          checked={Boolean(item?.isSelected)}
          onChange={handleSelect}
          className="absolute top-3 left-3 sm:top-5 sm:left-5 md:w-5 md:h-5 accent-blue-600 rounded-md"
          type="checkbox"
          name="checkbox"
          id="checkbox"
        />
      </div>
    </div>
  );
}
