import { Link } from "react-router-dom";

const PostCard = ({post}) => {
  return (
    <div
      key={post._id}
      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
      <p className="text-gray-600 mt-2 text-sm line-clamp-3">{post.content}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags.map((tag, index) => (
          <span key={index} className="text-blue-600 text-sm">
            #{tag}
          </span>
        ))}
      </div>
      <Link className="inline-block mt-4 bg-teal-500 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-teal-600 transition">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;  