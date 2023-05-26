import "../UserScreen.css";
import { UserDeleteButton } from "./UserDeleteButton.js";
import { UserEditButton } from "./UserEditButton.js";
import Avatar from "@mui/material/Avatar";

export const UserCell = (props) => {
  const { user } = props;

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 80,
        height: 80,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div class='card col-md-3'>
      <div class='contact-box center-version'>
        <a href='#profile.html'>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {user.avatar ? (
              <Avatar
                alt='profile-avt'
                src={user.avatar}
                sx={{ width: 80, height: 80 }}
              />
            ) : (
              <Avatar
                {...stringAvatar(`${user.first_name} ${user.last_name}`)}
              />
            )}
          </div>
          <h3 class='m-b-xs'>
            <strong>
              {user.first_name} {user.last_name}
            </strong>
          </h3>
          <div class='font-bold'>{user.email}</div>
        </a>
        <div class='contact-box-footer'>
          <div class='m-t-xs btn-group'>
            <UserEditButton {...props} />
            <UserDeleteButton {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};
