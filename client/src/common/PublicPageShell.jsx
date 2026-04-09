import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import PageHero from './PageHero';

function PublicPageShell({ hero, breadcrumbs, children }) {
  return (
    <div className="min-h-screen bg-customeBg text-slate-900">
      <Header />
      <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {hero ? <PageHero {...hero} /> : null}
          <div className="mx-auto mt-8 max-w-5xl">
            {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PublicPageShell;
