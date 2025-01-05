"use client";
import { projects } from "@/app/data";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface IEditPage {
  params: {
    name: string;
  };
}

const EditPage: React.FC<IEditPage> = ({ params }) => {
  const router = useRouter();
  const name = decodeURI(params.name);

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    date: string;
    ytLink: string;
  }>({
    name: "",
    description: "",
    date: "",
    ytLink: "",
  });

  useEffect(() => {
    const project = projects
      .flatMap((category) => category.projects)
      .find((project) => project.name.toLowerCase() === name.toLowerCase());

    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        date: project.date,
        ytLink: project.ytLink,
      });
    } else {
      console.error("Project not found");
    }
  }, [name]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Project Data:", formData);
    // Handle the logic to update the project in the backend or state here
    router.push("/dashboard/projects"); // Navigate back to the projects list
  };

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-5'>Edit Project</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <label>
          <span className='block text-sm font-medium'>Project Name</span>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
          />
        </label>

        <label>
          <span className='block text-sm font-medium'>Description</span>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
            rows={5}
          />
        </label>

        <label>
          <span className='block text-sm font-medium'>Date</span>
          <input
            type='text'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
          />
        </label>

        <label>
          <span className='block text-sm font-medium'>YouTube Link</span>
          <input
            type='text'
            name='ytLink'
            value={formData.ytLink}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
          />
        </label>

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Save Changes
        </button>
      </form>
    </main>
  );
};

export default EditPage;
