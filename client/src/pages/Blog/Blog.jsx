import { Link } from 'react-router-dom';
import PublicPageShell from '../../common/PublicPageShell';
import Seo from '../../common/Seo';
import StructuredData from '../../common/StructuredData';
import blogPosts from '../../content/blogPosts';
import { SITE_URL, SITE_NAME } from '../../content/siteData';

function Blog() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    description:
      'Original guides from BookingCrown about booking operations, pricing, reservations, and customer experience.',
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedOn,
      description: post.description,
    })),
  };

  return (
    <PublicPageShell
      hero={{
        eyebrow: 'Resource Center',
        title: 'Booking advice for real service businesses',
        description:
          'This library explains how booking operations, pricing, customer communication, and trust-building work in practice. Every article is written to help business owners make clearer decisions.',
      }}
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Blog' },
      ]}
    >
      <Seo
        title="Booking Guides and Blog"
        description="Read practical BookingCrown articles about reservations, pricing, booking systems, customer communication, and operational planning."
        path="/blog"
      />
      <StructuredData id="blog-index" data={blogSchema} />

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="h-56 w-full rounded-2xl object-cover"
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-themeColor">
              {post.category}
            </p>
            <h2 className="mt-4 font-['Crimson_Text'] text-3xl font-semibold text-slate-900">
              <Link to={`/blog/${post.slug}`} className="hover:text-themeColor">
                {post.title}
              </Link>
            </h2>
              <p className="mt-3 text-sm text-slate-500">
                {post.readTime} | Published on {post.publishedOn}
              </p>
            <p className="mt-4 text-base leading-7 text-slate-600">{post.description}</p>
            <p className="mt-4 text-base leading-7 text-slate-600">{post.intro}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="mt-6 inline-flex rounded-full bg-themeColor px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
            >
              Read article
            </Link>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}

export default Blog;
