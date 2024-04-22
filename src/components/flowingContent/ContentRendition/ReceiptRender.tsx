import { BackButton } from "../Buttons.tsx";
import { useNavigate } from "react-router-dom";

export function ReceiptRender() {
  const navigate = useNavigate();

  function handleBackClick() {
    navigate("/payment");
    window.scrollTo(0, 0);
  }

  return <Receipt handleBackClick={handleBackClick} />;
}

function Receipt({ handleBackClick }: { handleBackClick: () => void }) {
  return (
    <div>
      receipt :b
      <BackButton onClick={handleBackClick} />
    </div>
  );
}

export default ReceiptRender;
