'use client'
import { DndContext, closestCenter} from "@dnd-kit/core";
import { useSensor,useSensors,TouchSensor,MouseSensor} from "@dnd-kit/core";
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import Userdata from './Userdata';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const Draganddrop = () => {

  const sensors=useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  )

  const userdata = [
    {
      id: 1,
      name: 'Dev',
      email: 'abc@gmail.com',
    },
    {
      id: 2,
      name: 'Mehul',
      email: 'abc2@gmail.com',
    },
    {
      id: 3,
      name: 'Brijesh',
      email: 'abc3@gmail.com',
    },
  ];

  const [data, setData] = useState(userdata);

  const handleDragend = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto justify-center">
      <div className="flex flex-col gap-3 items-center w-full">
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragend}
        >
          <SortableContext items={data}>
            {data.map((userdata) => (
              <Userdata data={userdata} key={userdata.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Draganddrop;