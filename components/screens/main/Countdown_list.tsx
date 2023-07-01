import React, { FC, useEffect, useState } from "react";
import use_database_store from "../../store/database/use_database_store";
import {
  DropResult,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  ResponderProvided,
  euiDragDropReorder,
} from "@elastic/eui";
import Countdown_display from "./Countdown_display";

const Countdown_list: FC = () => {
  const { database } = use_database_store();
  const { countdown_goals } = database;
  const [list, set_list] = useState(countdown_goals);

  useEffect(() => {
    set_list(countdown_goals)
  }, [countdown_goals])

  const onDragEnd: (
    result: DropResult,
    provided: ResponderProvided
  ) => void = ({ source, destination }) => {
    if (source && destination) {
      const items = euiDragDropReorder(list, source.index, destination.index);
      set_list(items);
    }
  };

  const drag_items = list.map((countdown_goal, idx) => {
    const { id } = countdown_goal;
    return (
      <EuiDraggable
        spacing="m"
        key={id}
        index={idx}
        draggableId={id}
        customDragHandle={true}
        hasInteractiveChildren={true}
      >
        {(provided) => (
          <EuiPanel>
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiPanel
                  color="transparent"
                  paddingSize="s"
                  {...provided.dragHandleProps}
                  aria-label="Drag Handle"
                >
                  <EuiIcon type="grab" />
                </EuiPanel>
              </EuiFlexItem>

              <EuiFlexItem>
                <Countdown_display goal={countdown_goal} />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        )}
      </EuiDraggable>
    );
  });

  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable
        droppableId="CUSTOM_HANDLE_DROPPABLE_AREA"
        spacing="m"
        withPanel
      >
        {drag_items}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};

export default Countdown_list;
