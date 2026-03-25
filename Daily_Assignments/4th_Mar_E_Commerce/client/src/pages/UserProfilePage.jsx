import { Helmet } from "react-helmet-async";
import { useApp } from "../context/AppContext.jsx";

const UserProfilePage = () => {
  const { user } = useApp();

  return (
    <>
      <Helmet>
        <title>Profile | ShopSphere</title>
      </Helmet>
      <section className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h1 className="mb-4 text-2xl font-bold">User Profile</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {user?.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
        </div>
      </section>
    </>
  );
};

export default UserProfilePage;
