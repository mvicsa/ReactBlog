import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonOutlinePrimary, ButtonPrimary } from "../Components/Buttons";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts";
import { useLoading } from "../Contexts/LoadingContext";
import { z } from "zod";
import { useAuth } from "../Contexts/AuthContext";
import api from "../utils/api";

const AddPost = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  });

  const { showLoading, hideLoading } = useLoading();

  const [ post, setPost ] = useState({ title: "", image: "", desc: "", createdBy: "" });
  const [ imageFile, setImageFile ] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const postSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    desc: z.string().min(10, "Description must be at least 10 characters"),
    image: z.string().url("Image must be a valid URL"),
  });

  const imgbbApiKey = import.meta.env.VITE_IMGBB_KEY;

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleAddPost = async () => {
    showLoading();
    try {
      let imageUrl = post.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
          const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);

          if (data.success) {
            imageUrl = data.data.url;
          } else {
            throw new Error("Image upload failed.");
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      }

      const addedPost = { ...post, image: imageUrl, createdBy: user.id };

      const validation = postSchema.safeParse(addedPost);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map(err => err.message).join("<br />");
        showErrorAlert("Required Fields!", errorMessages);
        return;
      }

      const { status } = await api.post("/posts", addedPost);

      if (status === 201) {
        showSuccessAlert("Post Added Successfully!");
        navigate("/");
      }
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      setImagePreview(null);
      hideLoading();
    }
  };

  return (
    <>
      <div className="grow bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Add Post</h2>
            <ButtonOutlinePrimary onClick={ () => navigate("/") }>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
              Go Back
            </ButtonOutlinePrimary>
          </div>
          <div className="flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 border-1 border-gray-100 dark:border-gray-700 w-full rounded-xl">
            <div>
              <label className="block dark:text-white mb-2">Title</label>
              <input type="text" onChange={ handleInputChange } name="title" value={ post.title } placeholder="Title" className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition dark:text-white placeholder:text-gray-500 py-2 px-3 w-full" />
            </div>
            <div>
              <label className="block dark:text-white mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  setImagePreview(file ? URL.createObjectURL(file) : null);
                }}
                className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition dark:text-white placeholder:text-gray-500 py-2 px-3 w-full bg-white dark:bg-gray-800"
              />
              {(imagePreview || post.image) && (
                <img
                  src={imagePreview || post.image}
                  alt="preview"
                  className="mt-2 rounded-xl max-h-52 w-full"
              />)}
            </div>
            <div>
              <label className="block dark:text-white mb-2">desc</label>
              <textarea onChange={ handleInputChange } name="desc" value={ post.desc } placeholder="Desc" rows="4" className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition dark:text-white placeholder:text-gray-500 py-2 px-3 w-full"></textarea>
            </div>
            <div>
              <ButtonPrimary onClick={ handleAddPost } className="w-full">Submit</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPost;
