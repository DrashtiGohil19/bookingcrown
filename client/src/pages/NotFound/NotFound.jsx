import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Seo from '../../common/Seo';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-customeBg text-slate-900">
      <Seo
        title="Page Not Found"
        description="The page you requested could not be found on BookingCrown."
        path="/404"
        robots="noindex,nofollow"
      />
      <Header />
      <main className="flex min-h-[calc(100vh-160px)] items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeColor">404 error</p>
          <h1 className="mt-4 font-['Crimson_Text'] text-5xl font-semibold text-slate-900">
            This page is not available
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            The link may be outdated, the page may have moved, or the URL may have been entered incorrectly. Use the homepage or the blog to continue browsing useful content.
          </p>
          <Button type="primary" className="mt-8 h-11 rounded-xl bg-themeColor px-6" onClick={() => navigate('/')}>
            Go to homepage
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
