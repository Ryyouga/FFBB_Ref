import React from 'react';
import { UserCog } from 'lucide-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RefereeSearch } from './components/RefereeSearch';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center space-x-4">
              <UserCog className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Recherche d'Arbitres FFBB
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RefereeSearch />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;