import "../UserScreen.css";
import { UserDeleteButton } from "./UserDeleteButton.js";
import { UserEditButton } from "./UserEditButton.js";

export const UserCell = (props) => {
  const { user } = props;
  return (
    <div class='card col-md-3'>
      <div class='contact-box center-version'>
        <a href='#profile.html'>
          <img class='img-circle' src={user.avatar} />
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
