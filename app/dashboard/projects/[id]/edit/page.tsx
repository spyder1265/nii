"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  ytLink: string;
  platform: string;
  skillsDeliverables: string[];
  images: string[];
}

const EditProjectPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    ytLink: "",
    platform: "",
    skillsDeliverables: "",
    images: [] as string[],
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects?id=${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch project data");
        }
        const { success, data, error } = await res.json();

        if (!success) {
          throw new Error(error || "Failed to fetch project data");
        }

        setFormData({
          name: data.name || "",
          description: data.description || "",
          date: data.date || "",
          ytLink: data.ytLink || "",
          platform: data.platform || "",
          skillsDeliverables: Array.isArray(data.skillsDeliverables)
            ? data.skillsDeliverables.join(", ")
            : "",
          images: data.images || [],
        });
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch project"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...files]);

      // Create preview URLs for the new images
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const removeExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]); // Clean up the URL
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert new images to base64
      const imagePromises = newImages.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const base64Images = await Promise.all(imagePromises);

      const res = await fetch(`/api/projects`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
          ...formData,
          skillsDeliverables: formData.skillsDeliverables
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          newImages: base64Images,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update project");
      }

      router.push(`/dashboard/projects/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating project:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
      </main>
    );
  }

  return (
    <main className='container mx-auto p-5'>
      <div className='mb-6 flex justify-between items-center'>
        <Link
          href={`/dashboard/projects/${params.id}`}
          className='text-blue-400 hover:underline'
        >
          &larr;&nbsp;Back to Project
        </Link>
        <h1 className='text-2xl font-bold'>Edit {formData.name}</h1>
        <div className='w-[100px]'></div> {/* Spacer for centering */}
      </div>

      {error && (
        <div className='mb-4 p-4 bg-red-500 text-white rounded'>{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 max-w-3xl mx-auto'
      >
        <label>
          <span className='block text-sm font-medium'>Project Name</span>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded bg-gray-700'
            required
          />
        </label>

        <label>
          <span className='block text-sm font-medium'>Description</span>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded bg-gray-700'
            rows={4}
            required
          />
        </label>

        <label>
          <span className='block text-sm font-medium'>Date</span>
          <input
            type='text'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded bg-gray-700'
            required
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
            required
          />
        </label>

        <label>
          <span className='block text-sm font-medium'>Platform</span>
          <input
            type='text'
            name='platform'
            value={formData.platform}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded bg-gray-700'
            required
          />
        </label>

        <label>
          <span className='block text-sm font-medium'>
            Skills & Deliverables{" "}
            <span className='text-sm text-gray-400 italic'>
              (comma-separated)
            </span>
          </span>
          <textarea
            name='skillsDeliverables'
            value={formData.skillsDeliverables}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded bg-gray-700'
            rows={3}
            required
          />
        </label>

        <div>
          <span className='block text-sm font-medium mb-2'>Current Images</span>
          <div className='grid grid-cols-3 gap-4'>
            {formData.images.map((url, index) => (
              <div
                key={index}
                className='relative border-2 border-[#2d323c] rounded-xl overflow-hidden aspect-video group'
              >
                <Image
                  src={url}
                  alt={`Project image ${index + 1}`}
                  fill
                  className='object-cover'
                />
                <button
                  type='button'
                  onClick={() => removeExistingImage(index)}
                  className='flex absolute top-2 right-2 bg-red-500 items-center justify-center text-white h-5 w-5 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className='block text-sm font-medium mb-2'>Add New Images</span>
          <input
            type='file'
            onChange={handleImageChange}
            multiple
            accept='image/*'
            className='mt-1'
          />
          {previewUrls.length > 0 && (
            <div className='mt-4 grid grid-cols-3 gap-4'>
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  className='relative border-2 border-[#2d323c] rounded-xl overflow-hidden aspect-video group'
                >
                  <Image
                    src={url}
                    alt={`New image ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                  <button
                    type='button'
                    onClick={() => removeNewImage(index)}
                    className='flex absolute top-2 right-2 bg-red-500 items-center justify-center text-white h-5 w-5 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='flex justify-end gap-4 mt-6'>
          <Link
            href={`/dashboard/projects/${params.id}`}
            className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-700 transition-colors'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProjectPage;
