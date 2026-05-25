import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { FaArrowRight, FaChartLine, FaClipboardCheck, FaShieldAlt } from 'react-icons/fa';
import { IoPeople } from 'react-icons/io5';
import { MdOutlineEventAvailable, MdOutlineTipsAndUpdates } from 'react-icons/md';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Contact from '../../common/Contact';
import Seo from '../../common/Seo';
import StructuredData from '../../common/StructuredData';
import blogPosts from '../../content/blogPosts';
import {
  ABOUT_WORKFLOW_IMAGE,
  HOME_HERO_IMAGE,
  homepageFaqs,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  testimonials,
} from '../../content/siteData';

const featureCards = [
  {
    icon: <MdOutlineEventAvailable />,
    title: 'Clear booking workflows',
    description:
      'Handle hourly and daily reservations with less manual coordination and fewer missed details across your team.',
  },
  {
    icon: <IoPeople />,
    title: 'Customer records that stay useful',
    description:
      'Keep names, phone numbers, booking history, and payment context together so follow-ups are easier.',
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Operational discipline',
    description:
      'Use structured booking data to reduce overlaps, support confirmations, and make day-to-day scheduling more predictable.',
  },
  {
    icon: <FaChartLine />,
    title: 'Better business decisions',
    description:
      'Review demand patterns, high-performing slots, and customer behavior to improve pricing and utilization.',
  },
];

const audienceCards = [
  'Box cricket and sports turf operators',
  'Cafe and restaurant teams managing reservations',
  'Event venues, farm stays, and private spaces',
  'Hotels and hospitality businesses handling scheduled bookings',
];

const coreContent = [
  'BookingCrown helps service businesses organize reservations, reduce manual work, and communicate more clearly with customers.',
  'A booking website should not be only a form or a dashboard login. Visitors need to understand what the service does, who it helps, how the process works, and what kind of business knowledge sits behind the platform.',
  'That is why BookingCrown combines booking software with educational content about pricing, cancellations, scheduling, and customer communication.',
  'When a business has clearer policies and a stronger booking flow, customer trust improves and operations become easier to manage.',
  'The platform is especially relevant for businesses that depend on scheduled slots, reservations, or venue availability.',
  'Every public section on this page is designed to provide context, explain the product clearly, and help a visitor decide whether BookingCrown fits their needs.',
  'We also maintain detailed legal pages, direct contact options, and practical blog content because a trustworthy business site should feel complete and useful before anyone signs up.',
];

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    }
  }, [location.hash]);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: SUPPORT_EMAIL,
    telephone: SUPPORT_PHONE,
    description:
      'BookingCrown is a booking management platform for service businesses that also publishes practical educational content about reservations, pricing, and customer communication.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'BookingCrown helps businesses manage bookings, explain their services clearly, and improve reservation workflows.',
  };

  return (
    <div className="min-h-screen bg-customeBg text-slate-900">
      <Seo
        title="Booking Management Platform for Service Businesses"
        description="BookingCrown helps businesses manage bookings, improve customer communication, and learn better reservation practices through original educational content."
        path="/"
      />
      <StructuredData id="organization" data={organizationSchema} />
      <StructuredData id="website" data={websiteSchema} />

      <Header />

      <main>
        <section id="home" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="rounded-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.28),_transparent_38%),linear-gradient(135deg,_#031717,_#0f766e_60%,_#14b8a6)] p-8 text-white shadow-2xl md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/75">
                Booking operations, simplified
              </p>
              <h1 className="mt-5 max-w-3xl font-['Crimson_Text'] text-5xl font-semibold leading-tight md:text-6xl">
                Build a booking website that feels trustworthy, clear, and ready for growth
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                BookingCrown helps service businesses manage reservations while also publishing the kind of practical content customers and search engines expect from a real business website.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5">
                  Start with your business profile
                </Link>
                <Link to="/blog" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Explore the blog
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {featureCards.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-themeLight p-4 text-2xl text-themeColor">
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeColor">About BookingCrown</p>
                <h2 className="mt-4 font-['Crimson_Text'] text-4xl font-semibold text-slate-900">
                  A booking platform should explain the business behind it
                </h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-slate-700">
                  {coreContent.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] bg-slate-50 p-6">
                <h3 className="text-2xl font-semibold text-slate-900">Who BookingCrown is designed for</h3>
                <div className="mt-5 grid gap-4">
                  {audienceCards.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="font-medium text-slate-800">{item}</p>
                    </div>
                  ))}
                </div>

              <div className="mt-6 rounded-2xl bg-themeDeep p-5 text-white">
                <img
                  src={HOME_HERO_IMAGE}
                  alt="BookingCrown dashboard and booking workflow preview"
                  className="mb-5 h-56 w-full rounded-2xl object-cover"
                />
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-xl text-teal-300" />
                  <p className="font-semibold">Trust-first public experience</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    The site includes direct contact information, detailed legal pages, helpful articles, strong page structure, and ad placements only where content depth supports them.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="services" className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeColor">What the platform supports</p>
              <h2 className="mt-4 font-['Crimson_Text'] text-4xl font-semibold text-slate-900">
                Booking tools supported by real operational guidance
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Businesses do not just need software screens. They need reliable workflows for pricing, confirmations, customer records, rescheduling, and day-to-day planning. BookingCrown is built around those practical needs.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((item) => (
                <article key={item.title} className="rounded-[28px] bg-white p-6 shadow-sm">
                  <div className="inline-flex rounded-2xl bg-themeLight p-4 text-2xl text-themeColor">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeColor">Why content matters</p>
              <h2 className="mt-4 font-['Crimson_Text'] text-4xl font-semibold text-slate-900">
                A booking page should answer questions before asking for a form submission
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-700">
                <p>
                  Thin pages create confusion for visitors. A page that only shows a login box, a reservation widget, or a short paragraph does not do enough to explain the service or help the visitor make a decision.
                </p>
                <p>
                  BookingCrown publishes educational content because customers need context. They want to understand how scheduling works, what affects pricing, how cancellations should be handled, and what makes a booking workflow reliable. That context improves trust and leads to better quality inquiries.
                </p>
                <p>
                  The same principle applies to site quality. A stronger website demonstrates topic depth, visible business information, and useful editorial coverage around its transactional features.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] bg-themeDeep p-8 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <MdOutlineTipsAndUpdates className="text-3xl text-teal-300" />
                <h2 className="font-['Crimson_Text'] text-3xl font-semibold">What visitors should find here</h2>
              </div>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-white/80">
                <li>Detailed explanations of what BookingCrown does and who it serves</li>
                <li>Public legal pages that are easy to read and clearly linked</li>
                <li>Trust signals such as direct contact information and testimonials</li>
                <li>Original blog content focused on real booking and reservation problems</li>
                <li>Mobile-friendly layouts that do not place ads on empty or loading screens</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeColor">Latest articles</p>
                <h2 className="mt-4 font-['Crimson_Text'] text-4xl font-semibold text-slate-900">
                  Original guides for booking-driven businesses
                </h2>
              </div>
              <Link to="/blog" className="hidden items-center gap-2 text-sm font-semibold text-themeColor hover:text-themeDark md:inline-flex">
                View all articles <FaArrowRight />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <article key={post.slug} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-52 w-full rounded-2xl object-cover"
                  />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-themeColor">{post.category}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                    <Link to={`/blog/${post.slug}`} className="hover:text-themeColor">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-slate-500">{post.readTime}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{post.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm">
            <img
              src={ABOUT_WORKFLOW_IMAGE}
              alt="Booking team reviewing reservations and customer communication"
              className="mb-8 h-64 w-full rounded-[28px] object-cover"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeColor">Trust signals</p>
            <h2 className="mt-4 font-['Crimson_Text'] text-4xl font-semibold text-slate-900">
              What customers say about a clearer booking workflow
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <blockquote key={item.name} className="rounded-[26px] bg-slate-50 p-6">
                  <p className="text-base leading-8 text-slate-700">"{item.quote}"</p>
                  <footer className="mt-5">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="font-['Crimson_Text'] text-4xl font-semibold text-slate-900">Frequently asked questions</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {homepageFaqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeColor">Contact the team</p>
              <h2 className="mt-4 font-['Crimson_Text'] text-4xl font-semibold text-slate-900">
                Ask about your booking workflow, setup, or account needs
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                If you manage a reservation-driven business and want a clearer system, reach out through the contact form below. The page includes direct contact details because a complete business website should make real support easy to find.
              </p>
            </div>

            <div className="mt-8">
              <Contact />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
