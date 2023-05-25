import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, editUser } from "./UserScreenApi";
import TextInput from "component/TextInput";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
const UserEditScreen = () => {
  let { id } = useParams();
  const job = ["Teacher", "Developer", "Other"];
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [jobSelected, setJobSelected] = useState("");

  useEffect(() => {
    getUserDetail();
  }, []);

  useEffect(() => {
    setFirstName(user.first_name);
    setLastname(user.last_name);
    setEmail(user.email);
  }, [user]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getUserDetail = () => {
    setLoading(true);
    getUser(id)
      .then((response) => {
        setLoading(false);
        setUser(response.data.data);
        setSelectedOption("male");
      })
      .catch((error) => {
        setLoading(false);
        window.alert("USER NOT FOUND");
      });
  };
  const navigate = useNavigate();

  const editUserData = () => {
    setLoading(true);
    editUser(id, { name: `${firstName} ${lastName}`, job: jobSelected })
      .then((response) => {
        setLoading(false);
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        window.alert("USER NOT FOUND");
      });
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          color: "black",
          textAlign: "left",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            justifyContent: "center",
          }}
        >
          {user.avatar && (
            <div
              style={{
                display: "flex",
                justifyContent: "center" /* Center horizontally */,
                alignItems: "center",
                margin: 20,
              }}
            >
              <Avatar
                alt='user avatar'
                src={user.avatar}
                sx={{ width: 160, height: 160 }}
              />
            </div>
          )}
          <TextInput
            label='First Name'
            value={firstName ?? ""}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <TextInput
            label='Last Name'
            value={lastName ?? ""}
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          />
          <TextInput
            label='Email'
            type='email'
            value={email ?? ""}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <div
            style={{
              margin: "15px",
            }}
          >
            <p>Select gender: </p>
            <label>
              <input
                type='radio'
                value='male'
                checked={selectedOption === "male"}
                onChange={handleOptionChange}
              />
              Male
            </label>

            <label>
              <input
                type='radio'
                value='female'
                checked={selectedOption === "female"}
                onChange={handleOptionChange}
              />
              Female
            </label>
          </div>
          <TextInput
            select
            label='Job Type'
            value={jobSelected}
            onChange={(event) => {
              setJobSelected(event.target.value);
            }}
          >
            {job.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextInput>
          <Button
            variant='contained'
            onClick={editUserData}
            style={{ margin: "10px" }}
          >
            UPDATE
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserEditScreen;
