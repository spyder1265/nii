"use client";

import { log } from "console";
import router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [] as String[],
    date: "",
    platform: "",
    ytLink: "",
    skillsDeliverables: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const base64Promises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(base64Promises)
        .then((base64Images) => {
          setFormData({ ...formData, images: base64Images });
        })
        .catch(() => toast.error("Error reading image files"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skillsDeliverables: formData.skillsDeliverables
            .split(",")
            .map((skill) => skill.trim()), // Convert to array
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Project added successfully!");
        setFormData({
          name: "",
          description: "",
          images: [],
          date: "",
          platform: "",
          ytLink: "",
          skillsDeliverables: "",
        }); // Clear the form
        router.push("/dashboard/projects");
      } else {
        console.log(data.error);
        throw new Error(data.error || "An error occurred");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add project");
      console.log(err.message);
    }
  };

  return (
    <main className='flex justify-center p-10'>
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
              Skills & Deliverables (comma-separated)
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
              accept='image/*'
              multiple
              onChange={handleImageChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
          </label>

          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
          >
            Add Project
          </button>
        </form>
      </div>
    </main>
  );
}
