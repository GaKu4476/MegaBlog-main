import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, RTE } from "../../components";
import service from "../../appwrite/conf";

const PostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // ✅ GUARD to avoid rendering before userData is ready
  if (!userData) return null;

  const submit = async (data) => {
    setLoading(true);
    document.body.style.cursor = "wait";

    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        setLoading(false);
        document.body.style.cursor = "default";
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.userData?.$id,
        });

        if (dbPost) {
          setLoading(false);
          document.body.style.cursor = "default";
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const [image, setImage] = useState("");

  useEffect(() => {
    if (post) {
      service.getFilePreview(post.featuredImage).then((image) => {
        setImage(image);
      });
      setValue("title", post.title, { shouldValidate: true });
      setValue("content", post.content, { shouldValidate: true });
      setValue("status", post.status, { shouldValidate: true });
    }
  }, [post]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6">
      <div className="md:w-2/3 w-full px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          readOnly
          className="mb-4 bg-gray-100 text-gray-500 focus:ring-0 cursor-not-allowed"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="md:w-1/3 w-full px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={image}
              alt={post.title}
              className="rounded-xl shadow-md object-cover w-full max-h-48"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 ${
            loading
              ? "bg-black/50 cursor-not-allowed"
              : post
              ? "bg-green-500 hover:bg-green-600"
              : "bg-black hover:bg-black/80"
          }`}
          disabled={loading}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
