import "../UserScreen.css";
import { useNavigate } from "react-router-dom";
export const UserEditButton = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const onUserEdit = () => {
    navigate(`/dashboard/userEditScreen/${user.id ?? 0}`);
  };
  return <button onClick={onUserEdit}>Edit</button>;
};
