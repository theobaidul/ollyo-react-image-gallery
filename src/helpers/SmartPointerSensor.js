import { PointerSensor } from '@dnd-kit/core';

/**
 * An extended "PointerSensor" that prevent input element from dragging
 */
export class SmartPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown',
      handler: ({ nativeEvent: event }) => {
        if (!event.isPrimary || event.button !== 0 || isInteractiveElement(event.target)) {
          return false;
        }

        return true;
      },
    },
  ];
}

function isInteractiveElement(element) {
  const interactiveElements = ['input'];

  if (element?.tagName && interactiveElements.includes(element.tagName.toLowerCase())) {
    return true;
  }

  return false;
}
