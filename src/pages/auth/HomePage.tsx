import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  console.log("user", user, isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "buyer") {
        navigate("/buyer");
      }
      if (user?.role === "seller") {
        navigate("/seller");
      }
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, user]);

  return (
    <div className="h-full w-full">
      <Loader />
    </div>
  );
};

export default HomePage;
