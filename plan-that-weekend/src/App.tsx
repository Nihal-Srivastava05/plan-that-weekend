import { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/Sidebar";
import { LongWeekends } from "./pages/LongWeekends";
import { ToastProvider } from "./hooks/useToast";
import { HolidaysProvider } from "./hooks/useHolidays";
import { ToastContainer } from "./components/ui/Toast";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ToastProvider>
      <HolidaysProvider>
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <main className="flex-1 overflow-y-auto">
              <LongWeekends />
            </main>
          </div>
          <ToastContainer />
        </div>
      </HolidaysProvider>
    </ToastProvider>
  );
}

export default App;
