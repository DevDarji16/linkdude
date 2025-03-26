import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

const Userdata = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full">
      <div className="flex bg-blue-200 rounded-lg justify-between items-center px-3 py-2">
        <div>
          <div>{props.data.name}</div>
          <div>{props.data.email}</div>
        </div>
        <div {...attributes} {...listeners} className="cursor-pointer">
          <PiDotsSixVerticalBold />
        </div>
      </div>
    </div>
  );
};

export default Userdata;