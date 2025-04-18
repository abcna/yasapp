import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCheckbox,
  IonLabel,
  IonList,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonModal,
  IonTextarea,
} from "@ionic/react";
import { add, document, colorPalette, arrowUp , text} from "ionicons/icons";
import useTaskStore from "./taskState.ts";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const { activeTasks, addTask, completeTask } = useTaskStore();
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const categories = [
    "جسمی",
    "ذهنی - آموزشی",
    "روحی",
    "رابطه ای",
    "تفریح",
    "متفرقه",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        category: category || "other",
        color: color || "#FFB8E0",
        description: description || "",
        completed: false,
      };
      addTask(newTask);
      // Reset form
      setTaskName("");
      setCategory("other");
      setColor("#FFB8E0");
      setDescription("");
    }
  };

  // Function to determine if text should be white based on background color
  const getTextColor = (backgroundColor: string) => {
    const hex = backgroundColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128 ? "white" : "black";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {activeTasks.map((task) => {
            const textColor = getTextColor(task.color);
            return (
              <IonCard key={task.id} style={{ backgroundColor: task.color }}>
                <IonCardHeader>
                  <div className="task-card">
                    <div className="task-content">
                      <IonCardTitle style={{ color: textColor }}>
                        {task.name}
                      </IonCardTitle>
                      <IonCardSubtitle style={{ color: textColor }}>
                        {task.category}
                      </IonCardSubtitle>
                    </div>
                    <IonCheckbox
                      checked={task.completed}
                      onIonChange={() => completeTask(task.id)}
                      className="task-checkbox"
                    />
                  </div>
                </IonCardHeader>
                <IonCardContent
                  className="task-description"
                  style={{ color: textColor }}
                >
                  {task.description}
                </IonCardContent>
              </IonCard>
            );
          })}
        </IonList>

        <div className="task-input-container">
          <form onSubmit={handleSubmit} className="task-form">
            <IonButton type="submit" className="submit-button">
              <IonIcon icon={arrowUp}></IonIcon>
            </IonButton>
            <IonItem className="task-input-item">
              <IonInput
                value={taskName}
                onIonChange={(e) => setTaskName(e.detail.value!)}
                placeholder=" امروز چیکارا داریم؟؟"
                className="task-input"
                required
              />
            </IonItem>
          </form>
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add} style={{color: "white"}}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={() => setIsCategoryModalOpen(true)}>
              <IonIcon icon={document} style={{color: "white"}}></IonIcon>
            </IonFabButton>
            <IonFabButton onClick={() => setIsColorModalOpen(true)}>
              <IonIcon icon={colorPalette} style={{color: "white"}}></IonIcon>
            </IonFabButton>
            <IonFabButton onClick={() => setIsDescriptionModalOpen(true)}>
              <IonIcon icon={text} style={{color: "white"}}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

        {/* Category Modal */}
        <IonModal
          isOpen={isCategoryModalOpen}
          onDidDismiss={() => setIsCategoryModalOpen(false)}
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
          handleBehavior="cycle"
        >
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel>دسته‌بندی</IonLabel>
              <IonSelect
                value={category}
                onIonChange={(e) => setCategory(e.detail.value)}
                placeholder="انتخاب دسته‌بندی"
              >
                {categories.map((cat) => (
                  <IonSelectOption key={cat} value={cat}>
                    {cat}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonContent>
        </IonModal>

        {/* Color Modal */}
        <IonModal
          isOpen={isColorModalOpen}
          onDidDismiss={() => setIsColorModalOpen(false)}
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
          handleBehavior="cycle"
        >
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel>Color</IonLabel>
              <IonInput
                type="color"
                value={color}
                onIonChange={(e) => setColor(e.detail.value!)}
                style={{ width: "50px", height: "30px" }}
              />
            </IonItem>
            <div
              className="color-preview"
              style={{ backgroundColor: color }}
            ></div>
          </IonContent>
        </IonModal>

        {/* Description Modal */}
        <IonModal
          isOpen={isDescriptionModalOpen}
          onDidDismiss={() => setIsDescriptionModalOpen(false)}
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
          handleBehavior="cycle"
        >
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonTextarea
                value={description}
                placeholder="جزئیات اینجا بنویس..."
                autoGrow={true}
                rows={4}
                className="ion-text-right"
                style={{ direction: 'rtl' }}
                onIonChange={(e) => setDescription(e.detail.value!)}
              />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
