import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, editUser } from "../UserScreenApi";
import { useNavigate } from "react-router-dom";
import { UserManagementForm } from "../component/UserManagementForm";
import ErrorAlert from "component/errorAlert";

const UserEditScreen = (props) => {
  const { editUserAction } = props;
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [errorEditDialogMsg, setErrorEditDialogMsg] = useState("");
  const [displayEditError, setDisplayEditError] = useState(false);

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
        setErrorEditDialogMsg("USER NOT FOUND");
        setDisplayEditError(true);
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
        setErrorEditDialogMsg("USER NOT FOUND");
        setDisplayEditError(true);
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
      <ErrorAlert
        open={displayEditError}
        errorMessage={errorEditDialogMsg}
        handleClose={() => {
          setDisplayEditError(false);
          navigate(-1);
        }}
      />
    </>
  );
};

export default UserEditScreen;
