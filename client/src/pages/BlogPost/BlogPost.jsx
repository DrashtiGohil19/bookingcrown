import { Link, useParams } from 'react-router-dom';
import PublicPageShell from '../../common/PublicPageShell';
import Seo from '../../common/Seo';
import StructuredData from '../../common/StructuredData';
import blogPosts from '../../content/blogPosts';
import { SITE_NAME, SITE_URL } from '../../content/siteData';
import NotFound from '../NotFound/NotFound';

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedOn,
    dateModified: post.publishedOn,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo192.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <PublicPageShell
      hero={{
        eyebrow: post.category,
        title: post.title,
        description: post.description,
      }}
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Blog', to: '/blog' },
        { label: post.title },
      ]}
    >
      <Seo title={post.title} description={post.description} path={`/blog/${post.slug}`} type="article" />
      <StructuredData id={`blog-${post.slug}`} data={articleSchema} />

      <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm text-slate-500">
          {post.readTime} | Published on {post.publishedOn}
        </p>
        <img
          src={post.image}
          alt={post.title}
          className="mt-6 h-72 w-full rounded-[28px] object-cover md:h-[420px]"
        />
        <p className="mt-6 text-base leading-8 text-slate-700">{post.intro}</p>

        <div className="space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-['Crimson_Text'] text-3xl font-semibold text-slate-900">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <section className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="font-['Crimson_Text'] text-3xl font-semibold text-slate-900">Related reading</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {relatedPosts.map((item) => (
            <article key={item.slug} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-themeColor">
                {item.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                <Link to={`/blog/${item.slug}`} className="hover:text-themeColor">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}

export default BlogPost;
