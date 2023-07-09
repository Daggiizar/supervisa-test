import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface CheckOutProps {
  idEmployee: string;
  status: string;
  onCheckIn: () => void;
}

export default function CheckOut({ idEmployee, status, onCheckIn }: CheckOutProps) {
  const [statusBtn, setStatusBtn] = useState(false);

  useEffect(() => {
    status == "TRABAJANDO" ? setStatusBtn(true) : setStatusBtn(false);
  }, [status]);

  const handleClick = async () => {
    const id = idEmployee;
    const API_URL = "http://localhost:3000/api/checkin/";

    try {
      const response = await fetch(API_URL + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      } else {
        const data = await response.json();
        toast.success(data.message, {
          position: "top-right",
        });
        onCheckIn();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div>
      <button disabled={statusBtn} onClick={handleClick}>Ingresar</button>
    </div>
  );
}
