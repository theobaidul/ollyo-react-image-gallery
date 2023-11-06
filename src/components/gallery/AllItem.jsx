import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  // PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useRef, useState } from 'react';
import useGalleryContext from '../../hooks/useGallerycontext';
import AddImage from './AddImage';
import Item from './Item';

export default function AllItem() {
  const { images, setImages } = useGalleryContext();
  const [activeId, setActiveId] = useState(null);

  const dndRef = useRef(null);

  const sensors = useSensors(
    // useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const { active } = event;

    setActiveId(images.find((item) => item.id === active.id));
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items?.findIndex((item) => item?.id === active?.id);
        const newIndex = items?.findIndex((item) => item?.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  function handleDragCancel() {
    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-10 py-4">
          {images?.map((item, index) => (
            <Item item={item} index={index} key={item?.id} />
          ))}
          <DragOverlay
            adjustScale={true}
            modifiers={[restrictToWindowEdges]}
            zIndex={10}
            className="cursor-grabbing overflow-hidden rounded-lg bg-white shadow"
          >
            {!!activeId && (
              <img
                className="absolute inset-0 w-full h-full rounded-lg border-4 border-white preview object-cover"
                src={activeId?.url}
                alt={activeId?.id}
              />
            )}
          </DragOverlay>
          <AddImage dndRef={dndRef} />
        </div>
      </SortableContext>
    </DndContext>
  );
}
