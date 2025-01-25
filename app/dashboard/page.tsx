export default async function Dashboard() {
  return (
    <div className='min-h-fit'>
      <h1 className='text-3xl font-bold mb-8 text-gray-100'>Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <DashboardCard
          title='Projects'
          description='Manage and view your projects'
          href='/dashboard/projects'
          icon='📁'
        />
        <DashboardCard
          title='Add Project'
          description='Create a new project entry'
          href='/dashboard/projects/add-project'
          icon='➕'
        />
        <DashboardCard
          title='Analytics'
          description='View project insights and performance'
          href='/dashboard/analytics'
          icon='📊'
        />
        <DashboardCard
          title='Settings'
          description='Configure your account preferences'
          href='/dashboard/settings'
          icon='⚙️'
        />
        <DashboardCard
          title='Profile'
          description='Update your personal information'
          href='/dashboard/profile'
          icon='👤'
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

function DashboardCard({ title, description, href, icon }: DashboardCardProps) {
  return (
    <a
      href={href}
      className='bg-white shadow-md rounded-lg p-6 
       hover:shadow-xl transition-all duration-300 
       transform hover:-translate-y-2 
       flex flex-col items-start'
    >
      <div className='text-4xl mb-4'>{icon}</div>
      <h2 className='text-xl font-semibold mb-2 text-gray-800'>{title}</h2>
      <p className='text-gray-500'>{description}</p>
    </a>
  );
}
