import { Wallet, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 
                    bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Wallet className="text-cyan-400" size={20} />
        CryptoDash
      </div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r 
                           from-violet-500 to-cyan-400 text-sm font-medium 
                           hover:opacity-90 transition">
          Connect Wallet
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 
                     rounded-lg border border-white/10 
                     text-sm text-gray-300 hover:text-white 
                     hover:border-red-400 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}
