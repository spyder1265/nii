"use client";
import Link from "next/link";

export default function Dashboard() {
  const blogPosts = [
    {
      title: "Understanding React",
      description: "An overview of React concepts",
      link: "/blog/understanding-react",
    },
    {
      title: "CSS Flexbox",
      description: "Mastering the CSS Flexbox layout",
      link: "/blog/css-flexbox",
    },
    {
      title: "Next.js for Beginners",
      description: "Getting started with Next.js",
      link: "/blog/nextjs-beginners",
    },
  ];
  return (
    <main>
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold'>Overview</h2>
        <div className='mt-4 grid grid-cols-2 gap-4'>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-white'>Projects Completed</h3>
            <p className='text-white text-4xl'>15</p>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-white'>Skills Mastered</h3>
            <p className='text-white text-4xl'>8</p>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-white'>Client Testimonials</h3>
            <p className='text-white text-4xl'>10+</p>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-white'>Blog Posts</h3>
            <p className='text-white text-4xl'>5</p>
          </div>
        </div>
      </section>
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold'>Latest Blog Posts</h2>
        <div className='mt-4 space-y-4'>
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className='bg-gray-800 p-4 rounded-lg hover:bg-gray-700'
            >
              <h3 className='text-xl text-white'>{post.title}</h3>
              <p className='text-gray-400'>{post.description}</p>
              <Link
                href={post.link}
                className='text-blue-400 hover:underline mt-2 block'
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
