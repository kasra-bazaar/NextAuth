import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  const change = async (oldAndnew) => {
    console.log(oldAndnew)
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: oldAndnew,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm changePasswordHandler={change} />
    </section>
  );
}

export default UserProfile;
