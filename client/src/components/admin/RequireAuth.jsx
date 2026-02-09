import { Navigate } from "react-router-dom";
import { isAuthed } from "../../hooks/useAuth";

export default function RequireAuth({ children }) {
  if (!isAuthed()) return <Navigate to="/admin/login" replace />;
  return children;
}
