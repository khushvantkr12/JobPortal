import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <Link to="/">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
