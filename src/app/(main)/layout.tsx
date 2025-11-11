import Sidebar from '@/components/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}