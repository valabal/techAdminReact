import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, editUser } from "../UserScreenApi";
import { useNavigate } from "react-router-dom";
import { UserManagementForm } from "../component/UserManagementForm";

const UserEditScreen = (props) => {
  const { editUserAction } = props;
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    setLoading(true);
    getUser(id)
      .then((response) => {
        setLoading(false);
        setUser(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        window.alert("USER NOT FOUND");
        setTimeout(() => {
          navigate(-1);
        }, 500);
      });
  };
  const navigate = useNavigate();

  const editUserData = (userData) => {
    setLoading(true);
    editUser(id, {
      name: `${userData.first_name} ${userData.last_name}`,
      job: userData.job_selected,
    })
      .then((response) => {
        setLoading(false);
        const userCopy = user;
        userCopy.first_name = userData.first_name;
        userCopy.last_name = userData.last_name;
        userCopy.email = userData.email;
        editUserAction(userCopy);
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        window.alert("USER NOT FOUND");
        setTimeout(() => {
          navigate(-1);
        }, 500);
      });
  };

  return (
    <>
      <h1 className='text-2xl font-bold py-4'>USER MANAGEMENT EDIT FORM</h1>
      <UserManagementForm
        user={user ?? {}}
        onUpdateUserData={editUserData}
        buttonLabel='UPDATE'
      />
    </>
  );
};

export default UserEditScreen;
