import React, { FC } from "react";
import use_database_store from "../../store/database/use_database_store";
import {
  DropResult,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiPanel,
  ResponderProvided,
  euiDragDropReorder,
} from "@elastic/eui";
import Countdown_display from "./Countdown_display";

const Countdown_list: FC = () => {
  const { database, set_goals } = use_database_store();
  const { countdown_goals } = database;

  const onDragEnd: (
    result: DropResult,
    provided: ResponderProvided
  ) => void = ({ source, destination }) => {
    if (source && destination) {
      const items = euiDragDropReorder(
        countdown_goals,
        source.index,
        destination.index
      );
      set_goals(items);
    }
  };

  const drag_items = countdown_goals.map((countdown_goal, index) => {
    const { id } = countdown_goal;
    return (
      <EuiDraggable
        spacing="m"
        key={id}
        index={index}
        draggableId={id}
        customDragHandle={true}
        hasInteractiveChildren={true}
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {(provided) => (
          <EuiPanel paddingSize="xs">
            <Countdown_display
              goal={countdown_goal}
              dnd_provided={provided.dragHandleProps}
            />
          </EuiPanel>
        )}
      </EuiDraggable>
    );
  });

  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable
        droppableId="CUSTOM_HANDLE_DROPPABLE_AREA"
        spacing="none"
        grow={true}
      >
        {drag_items}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};

export default Countdown_list;
