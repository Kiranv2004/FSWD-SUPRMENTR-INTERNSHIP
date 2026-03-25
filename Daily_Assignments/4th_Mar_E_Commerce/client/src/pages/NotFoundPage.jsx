import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 | ShopSphere</title>
      </Helmet>
      <section className="text-center">
        <h1 className="mb-2 text-4xl font-bold">404</h1>
        <p className="mb-4 text-slate-500 dark:text-slate-300">Page not found.</p>
        <Link to="/" className="rounded bg-brand-600 px-4 py-2 text-white">
          Back to Home
        </Link>
      </section>
    </>
  );
};

export default NotFoundPage;
