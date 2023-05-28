import { Link } from "react-router-dom";

function Item({ item, type }) {
  const displayName = item.name || item.title;

  return (
    <div className="mb-4 p-4 bg-gray-900 rounded-lg shadow-md">
      <Link to={`/${type.id}/${item.id}`} className="text-blue-500 hover:underline text-xl font-medium">{displayName}</Link>
      <p className="text-gray-400 mt-2">{type.name}</p>
    </div>
  );
}

export default Item;