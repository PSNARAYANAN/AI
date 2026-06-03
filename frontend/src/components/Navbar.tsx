import { Link, useLocation } from 'react-router-dom';
import { Camera, Search, Dumbbell, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-neutral-800 p-4 flex justify-around items-center z-50">
      <Link
        to="/"
        className={isActive('/') ? 'text-primary' : 'text-secondary hover:text-white'}
      >
        <Home size={24} />
      </Link>
      <Link
        to="/exercises"
        className={isActive('/exercises') ? 'text-primary' : 'text-secondary hover:text-white'}
      >
        <Dumbbell size={24} />
      </Link>
      <Link
        to="/scan-food"
        className={isActive('/scan-food') ? 'text-primary' : 'text-secondary hover:text-white'}
      >
        <Camera size={24} />
      </Link>
      <Link
        to="/scan-label"
        className={isActive('/scan-label') ? 'text-primary' : 'text-secondary hover:text-white'}
      >
        <Search size={24} />
      </Link>
    </nav>
  );
};

export default Navbar;
