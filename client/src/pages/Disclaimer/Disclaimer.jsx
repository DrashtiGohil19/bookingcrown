import PublicPageShell from '../../common/PublicPageShell';
import Seo from '../../common/Seo';
import { LAST_UPDATED, SUPPORT_EMAIL, SUPPORT_PHONE } from '../../content/siteData';

const sections = [
  {
    heading: 'General information',
    paragraphs: [
      'The information published on BookingCrown is provided for general informational and business-planning purposes. We work to keep our site useful, accurate, and current, but we do not guarantee that every article, policy summary, operational tip, or feature description will be complete, current, or suitable for every business model.',
      'Visitors should use their own judgment before making operational, legal, tax, or commercial decisions based on the information provided on this website. Our educational content is intended to help service businesses think more clearly about booking operations, customer communication, scheduling, and pricing, but it should not replace professional advice tailored to a specific situation.',
    ],
  },
  {
    heading: 'Product and service descriptions',
    paragraphs: [
      'We make reasonable efforts to describe BookingCrown features, workflows, and support options accurately. However, software capabilities, onboarding procedures, availability, and pricing structures may change over time as the product evolves.',
      'If you are evaluating BookingCrown for your business, we recommend contacting us directly before making a final decision so you can confirm the latest implementation details, support process, and suitability for your operating model.',
    ],
  },
  {
    heading: 'No professional advice',
    paragraphs: [
      'Nothing on this website should be interpreted as legal advice, financial advice, compliance advice, or guaranteed business guidance. Articles, FAQs, and educational pages reflect general recommendations and observations intended to support better decision-making.',
      'Businesses remain responsible for their own contracts, refund policies, customer communication, data handling, tax obligations, local regulations, and commercial decisions. When professional review is needed, users should speak with a qualified advisor.',
    ],
  },
  {
    heading: 'Third-party links and references',
    paragraphs: [
      'BookingCrown may reference third-party services, tools, or external resources where relevant. These references are provided for convenience and context. We do not control third-party websites and are not responsible for their content, privacy practices, availability, or business conduct.',
      'A reference to another service, provider, or website does not automatically mean endorsement. Users should evaluate any third-party resource independently.',
    ],
  },
  {
    heading: 'Limitation of responsibility',
    paragraphs: [
      'We are not liable for business losses, missed bookings, customer disputes, indirect damages, or commercial outcomes that result from reliance on informational content published on this website. Operational results depend on how each business uses its tools, communicates with customers, prices its services, and manages internal processes.',
      'Our goal is to publish helpful and honest content, but each business remains responsible for implementation and review in its own environment.',
    ],
  },
];

function Disclaimer() {
  return (
    <PublicPageShell
      hero={{
        eyebrow: 'Legal',
        title: 'Disclaimer',
        description:
          'This page explains the scope of the information published on BookingCrown and clarifies what visitors should expect from our educational and product content.',
      }}
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Disclaimer' },
      ]}
    >
      <Seo
        title="Disclaimer"
        description="Read the BookingCrown disclaimer for important information about educational content, software descriptions, third-party references, and business responsibility."
        path="/disclaimer"
      />

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>
        <div className="mt-6 space-y-8">
          {sections.map((section) => (
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

        <section className="mt-8 rounded-3xl bg-themeLight p-5">
          <h2 className="text-xl font-semibold text-slate-900">Questions about this page?</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Contact BookingCrown at {SUPPORT_EMAIL} or {SUPPORT_PHONE} if you need clarification about this disclaimer or how website information should be interpreted.
          </p>
        </section>
      </div>
    </PublicPageShell>
  );
}

export default Disclaimer;
