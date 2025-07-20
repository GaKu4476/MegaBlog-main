import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData?.userData);
  const isAuthor = post?.userId && userData?.$id
    ? String(post.userId) === String(userData.$id)
    : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const [image, setImage] = useState("");
  useEffect(() => {
    if (post) {
      service.getFilePreview(post.featuredImage).then((image) => {
        setImage(image);
      });
    }
  }, [post]);

  return post ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col md:flex-row gap-6 p-4 rounded-xl border shadow-sm bg-white text-black dark:bg-gray-900 dark:text-gray-100 relative">
          <div className="w-full md:w-[500px] h-[300px] md:h-[400px] flex-shrink-0">
            <img
              src={image}
              alt={post.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col justify-between flex-grow">
            <div className="p-2 md:p-4">
              <div className="flex items-center flex-wrap gap-2 mb-3">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {post.title}
                </h1>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    post.status === "active"
                      ? "bg-green-200 dark:bg-green-700 text-black dark:text-white"
                      : "bg-red-200 dark:bg-red-700 text-black dark:text-white"
                  }`}
                >
                  {post.status}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <p>Created on: {new Date(post.$createdAt).toLocaleString()}</p>
                <p>Last updated: {new Date(post.$updatedAt).toLocaleString()}</p>
              </div>

              <div className="prose max-w-none text-gray-900 dark:text-gray-200 md:mt-6">
                {parse(post.content)}
              </div>
            </div>

            {isAuthor && (
              <div className="mt-4 flex gap-2 md:absolute md:right-4 md:top-4 px-2 md:px-0">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  onClick={deletePost}
                  className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <Container>
      <h1 className="font-bold text-2xl text-center my-16">
        <Loader />
      </h1>
    </Container>
  );
}
