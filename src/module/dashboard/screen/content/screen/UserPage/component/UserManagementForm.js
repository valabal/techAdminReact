import { useEffect, useState } from "react";
import TextInput from "component/TextInput";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ErrorAlert from "component/errorAlert";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export const UserManagementForm = (props) => {
  const { user, onUpdateUserData, buttonLabel } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [jobSelected, setJobSelected] = useState("");
  const job = ["Teacher", "Developer", "Other"];
  const [dob, setDOB] = useState(null);
  const [time, setTime] = useState(null);
  const [validation, setValidation] = useState({});
  const [errorDialogMsg, setErrorDialogMsg] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [avatarImageData, setAvatarImageData] = useState();

  const VALIDATION_KEY = {
    firstName: "FIRST_NAME",
    lastName: "LAST_NAME",
    email: "EMAIL",
    job: "JOB",
    dob: "DOB",
    time: "TIME",
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastname(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function checkEmailValid() {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  function validate() {
    let isValid = true;
    let validDic = {};

    if (!firstName) {
      isValid = false;
      validDic[VALIDATION_KEY.firstName] = "This field is required";
    }
    if (!lastName) {
      isValid = false;
      validDic[VALIDATION_KEY.lastName] = "This field is required";
    }
    if (!email) {
      isValid = false;
      validDic[VALIDATION_KEY.email] = "This field is required";
    } else {
      if (!checkEmailValid()) {
        isValid = false;
        validDic[VALIDATION_KEY.email] = "Email is not correct";
      }
    }
    if (!jobSelected) {
      isValid = false;
      validDic[VALIDATION_KEY.job] = "This field is required";
    }
    if (dob === null) {
      isValid = false;
      validDic[VALIDATION_KEY.dob] = "This field is required";
    }
    if (time === null) {
      isValid = false;
      validDic[VALIDATION_KEY.time] = "This field is required";
    }
    setValidation(validDic);
    return isValid;
  }

  const onFormButtonClicked = () => {
    if (!validate()) {
      setErrorDialogMsg("PLEASE INPUT ALL THE REQUIRED FIELD");
      setDisplayError(true);
      return;
    }
    onUpdateUserData({
      first_name: firstName,
      last_name: lastName,
      email,
      job_selected: jobSelected,
    });
  };

  const handleFileChange = (event) => {
    const { target } = event;
    const { files } = target;

    if (files && files[0]) {
      var reader = new FileReader();

      reader.onloadstart = () => {};

      reader.onload = (event) => {
        const data = event.target.result;
        setAvatarImageData(data);
      };

      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <form className='flex flex-col text-black text-left h-full bg-white items-center'>
        <div className='flex flex-col justify-center w-4/5'>
          {user?.avatar && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 20,
              }}
            >
              <div class='relative'>
                <Avatar
                  alt='avatar'
                  src={avatarImageData ?? user?.avatar}
                  sx={{ width: 160, height: 160 }}
                  style={{ borderWidth: 5 }}
                />
                <div className='bg-green-800 rounded-full p-2 absolute right-1 bottom-0'>
                  <PhotoCameraIcon sx={{ color: "white", fontSize: 25 }} />
                </div>
                <input
                  className='w-full h-full absolute top-0 left-0 overflow-hidden opacity-0 cursor-pointer'
                  id='avatar'
                  type='file'
                  accept='image/jpeg, image/png'
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}
          <div className='flex flex-row space-x-3'>
            <div className='flex-1 flex flex-col items-stretch'>
              <TextInput
                label='First Name'
                value={firstName ?? ""}
                onChange={(event) => {
                  if (event.target.value) {
                    setValidation({
                      ...validation,
                      ...{ [VALIDATION_KEY.firstName]: "" },
                    });
                  }
                  setFirstName(event.target.value);
                }}
                error={validation[VALIDATION_KEY.firstName] ?? ""}
                helperText={validation[VALIDATION_KEY.firstName] ?? ""}
              />
            </div>
            <div className='flex-1 flex flex-col items-stretch'>
              <TextInput
                label='Last Name'
                value={lastName ?? ""}
                onChange={(event) => {
                  if (event.target.value) {
                    setValidation({
                      ...validation,
                      ...{ [VALIDATION_KEY.lastName]: "" },
                    });
                  }
                  setLastname(event.target.value);
                }}
                error={validation[VALIDATION_KEY.lastName] ?? ""}
                helperText={validation[VALIDATION_KEY.lastName] ?? ""}
              />
            </div>
          </div>
          <TextInput
            label='Email'
            type='email'
            value={email ?? ""}
            onChange={(event) => {
              if (event.target.value) {
                let errorMsg = "";
                if (!checkEmailValid()) {
                  errorMsg = "Email is not correct";
                }
                setValidation({
                  ...validation,
                  ...{ [VALIDATION_KEY.email]: errorMsg },
                });
              }
              setEmail(event.target.value);
            }}
            error={validation[VALIDATION_KEY.email] ?? ""}
            helperText={validation[VALIDATION_KEY.email] ?? ""}
          />
          <div
            style={{
              margin: "15px",
            }}
          >
            <p className='mb-2'>Select gender: </p>
            <label className='mr-3'>
              <input
                type='radio'
                className='mr-3'
                value='male'
                checked={selectedOption === "male"}
                onChange={handleOptionChange}
              />
              Male
            </label>

            <label className='mr-3'>
              <input
                className='mr-3'
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
              if (event.target.value) {
                setValidation({
                  ...validation,
                  ...{ [VALIDATION_KEY.job]: "" },
                });
              }
              setJobSelected(event.target.value);
            }}
            error={validation[VALIDATION_KEY.job] ?? ""}
            helperText={validation[VALIDATION_KEY.job] ?? ""}
          >
            {job.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextInput>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale='en-gb'
          >
            <div className='my-5 flex flex-col m-[10px]'>
              <DatePicker
                label='Date Of Birth'
                value={dob}
                onChange={(newValue) => {
                  if (newValue.isBefore(dayjs())) {
                    const dobError = {
                      [VALIDATION_KEY.dob]: "",
                    };
                    setValidation({ ...validation, ...dobError });
                  } else {
                    const dobError = {
                      [VALIDATION_KEY.dob]: "This Field is Invalid",
                    };
                    setValidation({ ...validation, ...dobError });
                  }
                  setDOB(newValue);
                }}
                disableFuture
                onError={(newError) => {
                  const dobError = {
                    [VALIDATION_KEY.dob]: "This Field is Invalid",
                  };
                  setValidation({ ...validation, ...dobError });
                }}
                slotProps={{
                  textField: {
                    error: validation[VALIDATION_KEY.dob] ?? "",
                    helperText: validation[VALIDATION_KEY.dob] ?? "",
                  },
                }}
              />
            </div>
            <div className='mb-5 flex flex-col m-[10px]'>
              <TimePicker
                label='Start Time'
                value={time}
                onChange={(newValue) => {
                  if (newValue) {
                    const error = {
                      [VALIDATION_KEY.time]: "",
                    };
                    setValidation({ ...validation, ...error });
                  }
                  setTime(newValue);
                }}
                slotProps={{
                  textField: {
                    error: validation[VALIDATION_KEY.time] ?? "",
                    helperText: validation[VALIDATION_KEY.time] ?? "",
                  },
                }}
              />
            </div>
          </LocalizationProvider>
          <TextInput
            label='Put your Description (optional)'
            multiline
            rows={4}
            variant='outlined'
          />
          <div className='mt-5 mx-[10px] flex flex-col items-strech'>
            <Button
              variant='contained'
              onClick={onFormButtonClicked}
              className='m-[10px] h-[60px] bg-blue-800 text-white font-bold'
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </form>
      <ErrorAlert
        open={displayError}
        errorMessage={errorDialogMsg}
        handleClose={() => {
          setDisplayError(false);
        }}
      />
    </>
  );
};
