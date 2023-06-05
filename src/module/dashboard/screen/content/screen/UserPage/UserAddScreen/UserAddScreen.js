import { useState } from "react";
import { createUser } from "../UserScreenApi";
import { useNavigate } from "react-router-dom";
import { UserManagementForm } from "../component/UserManagementForm";

const UserAddScreen = (props) => {
  const { addUserAction } = props;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addUserData = (userData) => {
    setLoading(true);
    const param = {
      name: `${userData.first_name} ${userData.last_name}`,
      job: userData.job_selected,
    };
    console.log("ADD USER", param);
    createUser(param)
      .then((response) => {
        console.log("USER CREATED");
        console.log(response);
        setLoading(false);
        const user = {
          id: response.data.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
        };
        addUserAction(user);
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        window.alert("USER FAILED TO CREATE");
      });
  };

  return (
    <clas>
      <h1 className='text-2xl font-bold py-4'>USER MANAGEMENT CREATE FORM</h1>
      <UserManagementForm onUpdateUserData={addUserData} buttonLabel='CREATE' />
    </clas>
  );
};

export default UserAddScreen;
