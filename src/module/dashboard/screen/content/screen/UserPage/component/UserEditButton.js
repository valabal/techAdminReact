import "../UserScreen.css";
import { useNavigate } from "react-router-dom";
export const UserEditButton = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const onUserEdit = () => {
    navigate(`/dashboard/userEditScreen/${user.id ?? 0}`);
  };
  return (
    <div className='bg-yellow-500 text-black font-bold mb-2 rounded p-1 h-8 flex flex-col justify-center'>
      <button onClick={onUserEdit}>Edit</button>
    </div>
  );
};
