import { useState, type Dispatch, type SetStateAction } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box,
  ListSubheader,
} from "@mui/material";
import { GripVertical, Trash, PlusCircle } from "lucide-react";
import { createActivity, deleteActivity } from "../../api/apointments";
import { useAuth } from "../../contexts/AuthContext";

// Tipo de actividad con id, texto y list_index
export interface Activity {
  id: number;
  name: string;
  is_done: boolean;
  list_index: number;
  to_do: boolean;
}

interface SortableListItemProps {
  item: Activity;
  checked: number[];
  handleToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function SortableListItem({
  item,
  //   checked,
  handleToggle,
  onDelete,
}: SortableListItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(item.id)}
        >
          <Trash style={{ height: "1rem", width: "1rem" }} />
        </IconButton>
      }
    >
      <IconButton
        edge="start"
        aria-label="drag"
        {...attributes}
        {...listeners}
        style={{ cursor: "grab", padding: "0.5rem" }}
      >
        <GripVertical size={16} />
      </IconButton>

      <ListItemButton onClick={() => handleToggle(item.id)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.to_do}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </ListItem>
  );
}

interface ActivitiesListProps {
  initialItems: Activity[];
  setInitialActivities: Dispatch<SetStateAction<Activity[]>>;
  isCreatingAppointment: boolean;
  formData: FormData;
}

export default function ActivitiesList({
  initialItems,
  setInitialActivities,
  isCreatingAppointment,
  formData,
}: ActivitiesListProps) {
  const { user } = useAuth();
  const [checked, setChecked] = useState<number[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [nextId, setNextId] = useState(
    Math.max(...initialItems.map((i) => i.id), 0) + 1
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const sortedItems = [...initialItems].sort(
    (a, b) => a.list_index - b.list_index
  );

  const handleToggle = (id: number) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    const updated = initialItems.map((item) =>
      item.id === id ? { ...item, to_do: !item.to_do } : item
    );
    setInitialActivities(updated);
  };

  const handleDelete = async (
    e: React.FormEvent<HTMLFormElement>,
    idToRemove: number
  ) => {
    e.preventDefault();

    try {
      const response = await deleteActivity(user!.token, idToRemove);

      if (response && response.status === 204) {
        const filtered = initialItems.filter((item) => item.id !== idToRemove);
        const reordered = filtered.map((item, index) => ({
          ...item,
          list_index: index,
        }));
        setInitialActivities(reordered);
        setChecked((prev) => prev.filter((id) => id !== idToRemove));
      } else {
        console.error("No se pudo eliminar la actividad del backend");
      }
    } catch (err) {
      console.log("Error eliminando la actividad", err);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortedItems.findIndex((item) => item.id === active.id);
      const newIndex = sortedItems.findIndex((item) => item.id === over.id);
      const reordered = arrayMove(sortedItems, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          list_index: index,
        })
      );
      setInitialActivities(reordered);
    }
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    const name = newLabel.trim();
    if (!name) return;

    if (isCreatingAppointment && !formData.procedure.id) {
      alert("Por favor, selecciona un procedimiento primero.");
      return;
    }

    const activityPayload = {
      name,
      description: "Aquí va la descripción de la actividad",
      procedure: formData.procedure.id,
      is_done: false,
      list_index: 100,
    };

    try {
      const response = await createActivity(e, user!.token, activityPayload);

      if (response && response.status === 201) {
        const newItem: Activity = {
          id: response.data.id,
          name: response.data.name,
          is_done: response.data.is_done,
          list_index: initialItems.length,
          to_do: false,
        };

        setInitialActivities([...initialItems, newItem]);
        setNextId((id) => id + 1);
        setNewLabel("");
      } else {
        console.log("Error creando la actividad");
      }
    } catch (err) {
      console.error("Error al crear la actividad:", err);
    }
  };

  return (
    <div className="form-group">
      <List
        sx={{ width: "100%" }}
        subheader={
          <ListSubheader component="div" id="activity-list-subheader">
            <Box
              display="flex"
              justifyContent="start"
              alignItems="center"
              gap={5}
            >
              <Box width="2rem"></Box>
              <Box flexGrow={1}>Actividad</Box>
            </Box>
          </ListSubheader>
        }
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedItems.map((item) => (
              <SortableListItem
                key={item.id}
                item={item}
                checked={checked}
                handleToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      </List>
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          name="Nueva actividad"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          variant="standard"
        />
        <IconButton
          color="primary"
          aria-label="Agregar"
          onClick={handleAddItem} // Llamar la función para agregar la actividad
        >
          <PlusCircle />
        </IconButton>
      </Box>
    </div>
  );
}
