"use client";
import router from "next/router";
import { useState } from "react";

export default function AddProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [] as string[],
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
      const files = Array.from(e.target.files); // Convert FileList to Array
      const readers = files.map((file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string); // Convert file to Base64
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((images) => {
        setFormData({ ...formData, images });
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Project Data:", formData);
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      alert("Project added successfully!");
    } else {
      alert(`Error: ${data.error}`);
    }
    router.push("/dashboard/projects");
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
            <span className='block text-sm font-medium'>Images</span>
            <input
              type='file'
              name='images'
              accept='image/*'
              multiple
              onChange={handleImageChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
            />
          </label>

          <label>
            <span className='block text-sm font-medium'>
              Skills and Deliverables
            </span>
            <textarea
              name='skillsDeliverables'
              value={formData.skillsDeliverables}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded bg-gray-700'
              rows={3}
              placeholder='E.g., React, Node.js, API design, UI/UX'
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
