import './_nongula.scss';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorRoute } from './routes/errorroute/ErrorRoute.tsx';
import { DashboardRoute } from './routes/dashboardroute/DashboardRoute.tsx';
import { ModifyRoute } from './routes/modifyroute/ModifyRoute.tsx';

// Create a QueryClient instance
const queryClient = new QueryClient();

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path={'*'} element={<ErrorRoute />} />
                <Route path={'/'} element={<DashboardRoute />} />
                <Route path={'/modify/:date'} element={<ModifyRoute />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);
