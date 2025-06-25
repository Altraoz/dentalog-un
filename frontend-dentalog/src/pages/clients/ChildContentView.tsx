import { Smile } from "lucide-react";
import "./ChildContentView.scss";

function ChildContentView() {
  return (
    <div className="child-content-view-center">
      <Smile size="6rem" strokeWidth={1.2} color="#a689f7" />
      <div className="child-content-coming-soon">Próximamente</div>
    </div>
  );
}

export default ChildContentView;
