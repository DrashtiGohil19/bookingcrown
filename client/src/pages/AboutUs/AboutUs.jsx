import { Link } from 'react-router-dom';
import PublicPageShell from '../../common/PublicPageShell';
import Seo from '../../common/Seo';
import { ABOUT_WORKFLOW_IMAGE, testimonials } from '../../content/siteData';

const storySections = [
  {
    heading: 'What BookingCrown is trying to solve',
    paragraphs: [
      'Many small service businesses still run bookings through scattered phone calls, handwritten notes, spreadsheets, and chat messages. That may feel manageable at first, but the system becomes fragile as the business grows. Missed confirmations, double bookings, unclear pricing, and weak follow-up all start to affect customer trust.',
      'BookingCrown was built around a simple idea: booking operations should be easier to manage and easier to explain. A business owner should be able to track reservations, collect the right customer details, confirm schedules clearly, and keep core booking information in one place.',
      'Just as importantly, the public-facing website should not feel empty. Visitors need to understand the service, the business model, and the support process before they decide to sign up or make contact.',
    ],
  },
  {
    heading: 'Why the public content matters',
    paragraphs: [
      'A complete business website does more than present forms and dashboards. It also educates visitors. BookingCrown publishes detailed public pages and practical articles because trust is built through clarity. Customers want to know how a platform works, which businesses it supports, and what kind of thinking sits behind the product.',
      'This content-first approach also improves the quality of conversations. People who contact BookingCrown after reading the site usually have a clearer understanding of their own booking workflow and the problems they want to solve.',
      'That leads to better onboarding discussions, stronger expectations, and a site that is more useful to search engines, users, and policy reviewers alike.',
    ],
  },
  {
    heading: 'How we think about product quality',
    paragraphs: [
      'BookingCrown focuses on practical quality rather than flashy promises. The goal is not just to collect leads or show interface screenshots. The goal is to help businesses run cleaner operations. That means improving customer records, keeping scheduling rules consistent, making follow-up easier, and supporting better decisions with clearer data.',
      'The same mindset shapes the public website. Pages should be readable, useful on mobile, and filled with original content instead of placeholder text. Legal pages should be easy to find. Contact information should be visible. Educational articles should answer real questions a service business owner would actually ask.',
      'Those details matter because they help a small business website feel complete, trustworthy, and ready for long-term growth.',
    ],
  },
  {
    heading: 'Who we serve best',
    paragraphs: [
      'BookingCrown is especially well suited to businesses that work with limited inventory, time-based reservations, and repeat customer communication. That includes sports venues, cafes, restaurants, event spaces, farm stays, hospitality operators, and other service businesses that rely on scheduled access.',
      'These businesses often need the same fundamentals: a better way to record bookings, reduce manual coordination, collect contact details, and communicate clearly with customers before and after the reservation.',
      'Our educational content reflects those same needs, which is why our blog focuses on reservations, pricing, cancellation policies, booking forms, and day-to-day operational clarity.',
    ],
  },
];

function AboutUs() {
  return (
    <PublicPageShell
      hero={{
        eyebrow: 'About BookingCrown',
        title: 'A clearer booking workflow starts with a clearer website',
        description:
          'BookingCrown helps service businesses manage reservations while building the kind of complete, trust-first web presence customers actually want to use.',
      }}
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'About us' },
      ]}
    >
      <Seo
        title="About Us"
        description="Learn how BookingCrown approaches booking operations, content quality, trust signals, and practical support for service businesses."
        path="/about-us"
      />

      <div className="space-y-8">
        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <img
            src={ABOUT_WORKFLOW_IMAGE}
            alt="Booking workflow planning for service businesses"
            className="mb-8 h-72 w-full rounded-[28px] object-cover"
          />
          <div className="space-y-8">
            {storySections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-['Crimson_Text'] text-3xl font-semibold text-slate-900">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-['Crimson_Text'] text-3xl font-semibold text-slate-900">What customers value</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="rounded-3xl bg-slate-50 p-5">
                <p className="text-base leading-7 text-slate-700">"{item.quote}"</p>
                <footer className="mt-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] bg-[#0d2323] p-6 text-white shadow-xl md:p-8">
          <h2 className="font-['Crimson_Text'] text-3xl font-semibold">Continue exploring</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
            The strongest signal of expertise is useful content. Visit the blog to read practical articles about reservations, pricing, no-shows, and the difference between a thin booking page and a trustworthy booking website.
          </p>
          <Link to="/blog" className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900">
            Read the blog
          </Link>
        </section>
      </div>
    </PublicPageShell>
  );
}

export default AboutUs;
