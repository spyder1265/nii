"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  description: string;
  images: string[];
  date: string;
  platform: string;
  ytLink: string;
  skillsDeliverables: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AddProject() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    images: [],
    date: "",
    platform: "",
    ytLink: "",
    skillsDeliverables: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    const invalidFiles = files.filter(
      (file) =>
        !ALLOWED_FILE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE
    );

    if (invalidFiles.length) {
      toast.error("Some files are invalid. Please check file types and sizes.");
      return;
    }

    try {
      setIsLoading(true);
      const uploadedImageURLs = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "nii_unsigned");
          formData.append("cloud_name", "dggc80unb");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/dggc80unb/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Image upload failed: ${errorText}`);
          }

          const data = await response.json();
          return data.secure_url;
        })
      );

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImageURLs],
      }));
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        skillsDeliverables: formData.skillsDeliverables
          .split(",")
          .map((skill) => skill.trim()),
      };

      console.log("Sending payload:", payload);

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.log("Failed to parse response:", responseText);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to add project");
      }

      toast.success("Project added successfully!");
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='flex justify-center lg:p-10'>
      <div className='w-full lg:max-w-2xl'>
        <h1 className='text-2xl font-bold mb-5'>Add New Project</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <label>
            <span className='block text-sm font-medium'>Project Name</span>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
          </label>

          <label>
            <span className='block text-sm font-medium'>Description</span>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
              rows={5}
            />
          </label>

          <label>
            <span className='block text-sm font-medium'>Date Completed</span>
            <input
              type='month'
              name='date'
              value={formData.date}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
          </label>

          <label>
            <span className='block text-sm font-medium'>Platform Used</span>
            <input
              type='text'
              name='platform'
              value={formData.platform}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
          </label>

          <label>
            <span className='block text-sm font-medium'>YouTube Link</span>
            <input
              type='text'
              name='ytLink'
              value={formData.ytLink}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
          </label>

          <label>
            <span className='block text-sm font-medium'>
              Skills & Deliverables{" "}
              <span className='text-sm text-gray-400 mt-1 italic'>
                (comma-separated)
              </span>
            </span>
            <input
              type='text'
              name='skillsDeliverables'
              value={formData.skillsDeliverables}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
          </label>

          <label>
            <span className='block text-sm font-medium'>Project Images</span>
            <input
              type='file'
              accept={ALLOWED_FILE_TYPES.join(",")}
              multiple
              onChange={handleImageChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
            <p className='text-sm text-gray-400 mt-1 italic'>
              Max size: 5MB. Allowed types: JPG, PNG, WebP
            </p>
          </label>

          <div className='flex flex-wrap gap-4'>
            {formData.images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index + 1}`}
                className='w-32 h-32 object-cover rounded border'
              />
            ))}
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isLoading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </main>
  );
}
