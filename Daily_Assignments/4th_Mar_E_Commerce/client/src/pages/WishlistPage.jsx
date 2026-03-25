import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard.jsx";
import { useApp } from "../context/AppContext.jsx";

const WishlistPage = () => {
  const { wishlist } = useApp();

  return (
    <>
      <Helmet>
        <title>Wishlist | ShopSphere</title>
      </Helmet>
      <h1 className="mb-4 text-2xl font-bold">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default WishlistPage;
