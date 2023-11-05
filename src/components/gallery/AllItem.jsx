import { DndContext, KeyboardSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { SmartPointerSensor } from '../../helpers/SmartPointerSensor';
import useGalleryContext from '../../hooks/useGallerycontext';
import AddImage from './AddImage';
import Item from './Item';

export default function AllItem() {
  const { images, setImages } = useGalleryContext();
  const sensors = useSensors(
    useSensor(SmartPointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over) {
      if (active?.id !== over?.id) {
        setImages((items) => {
          const oldIndex = items?.findIndex((item) => item?.id === active.id);
          const newIndex = items?.findIndex((item) => item?.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-10 py-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images} strategy={rectSortingStrategy}>
          {images?.map((item, index) => (
            <Item item={item} index={index} key={item?.id} />
          ))}
        </SortableContext>
      </DndContext>
      <AddImage />
    </div>
  );
}
