import React, { FC, useEffect, useState } from "react";
import use_database_store from "../../store/database/use_database_store";
import {
  DropResult,
  EuiButton,
  EuiButtonIcon,
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
  const { database, set_goals, remove_goal } = use_database_store();
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

  const delete_goal = (id: string) => {
    remove_goal(id);
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
      >
        {(provided) => (
          <EuiPanel>
            <EuiFlexGroup responsive={false}>
              {/* <EuiFlexItem grow={false} style={{ alignSelf: "center" }}>
                <EuiPanel
                  color="transparent"
                  paddingSize="s"
                  {...provided.dragHandleProps}
                  aria-label="Drag Handle"
                >
                  <EuiIcon type="grab" />
                </EuiPanel>
              </EuiFlexItem> */}

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
