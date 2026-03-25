const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <p>© {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
