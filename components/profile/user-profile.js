import toast, { Toaster } from "react-hot-toast";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  const change = async (oldAndnew) => {
    try {
      toast("sending ...");
      const res = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: oldAndnew,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("you password changed !!");
    } catch (err) {
      toast.error("somthing went wrong !!");
    }
  };

  return (
    <>
      <Toaster />
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm changePasswordHandler={change} />
      </section>
    </>
  );
}

export default UserProfile;
