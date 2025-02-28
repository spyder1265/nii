import Link from "next/link";
import { Folder, PlusCircle, BarChart, Settings, User } from "lucide-react";

export default function Dashboard() {
  return (
    <div className='min-h-screen md:p-6'>
      <h1 className='text-3xl font-bold mb-8 text-gray-100'>Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <DashboardCard
          title='Projects'
          description='Manage and view your projects'
          href='/dashboard/projects'
          icon={<Folder size={40} />}
        />
        <DashboardCard
          title='Add Project'
          description='Create a new project entry'
          href='/dashboard/add-project'
          icon={<PlusCircle size={40} />}
        />
        <DashboardCard
          title='Analytics'
          description='View project insights and performance'
          href='/dashboard/analytics'
          icon={<BarChart size={40} />}
        />
        <DashboardCard
          title='Settings'
          description='Configure your account preferences'
          href='/dashboard/settings'
          icon={<Settings size={40} />}
        />
        <DashboardCard
          title='Profile'
          description='Update your personal information'
          href='/dashboard/profile'
          icon={<User size={40} />}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

function DashboardCard({ title, description, href, icon }: DashboardCardProps) {
  return (
    <Link href={href} passHref>
      <div className='bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col gap-4'>
        <div className='text-primary'>{icon}</div>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <p className='text-gray-300'>{description}</p>
      </div>
    </Link>
  );
}
