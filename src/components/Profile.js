import { useAuth } from "../utils/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h1 className="text-2xl font-bold mb-3">Profile</h1>
      <div>
        <strong>Name:</strong> {user?.displayName}
      </div>
      <div>
        <strong>Email:</strong> {user?.email}
      </div>
    </div>
  );
}
