import { Book } from "lucide-react";
import "./LearningView.scss";

function LearningView() {
  return (
    <div className="learning-view-center">
      <Book size="6rem" strokeWidth={1.2} color="#a689f7" />
      <div className="learning-coming-soon">Próximamente</div>
    </div>
  );
}

export default LearningView;