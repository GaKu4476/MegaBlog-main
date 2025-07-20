import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Link } from "react-router-dom";

const PostCard = ({ $id, $updatedAt, title, featuredImage }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    service.getFilePreview(featuredImage).then((image) => {
      setImage(image);
    });
  }, []);

  return (
    <article className="w-[300px] h-[420px] rounded-xl border dark:border-gray-700 shadow-lg overflow-hidden transition-transform hover:scale-[1.02] bg-white dark:bg-zinc-900 flex flex-col">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 leading-snug">
            {title}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Last updated: {new Date($updatedAt).toLocaleString()}
          </p>
        </div>
        <Link
          to={`/post/${$id}`}
          className="inline-block text-sm font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 px-4 py-2 rounded-md transition"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
