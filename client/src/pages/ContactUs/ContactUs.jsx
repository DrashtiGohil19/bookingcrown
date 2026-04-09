import PublicPageShell from '../../common/PublicPageShell';
import Seo from '../../common/Seo';
import Contact from '../../common/Contact';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../../content/siteData';

const faqItems = [
  {
    question: 'How quickly does BookingCrown reply?',
    answer:
      'Most inquiries are reviewed within one business day. More detailed product or onboarding questions may take a little longer, but each message is answered by a real person.',
  },
  {
    question: 'What information should I include in my message?',
    answer:
      'The most helpful inquiries explain the type of business you run, how you currently manage bookings, and which problem is creating the most friction for your team or customers.',
  },
  {
    question: 'Can I ask about onboarding before signing up?',
    answer:
      'Yes. The contact page is intended for both existing users and businesses that are still evaluating whether BookingCrown is the right fit.',
  },
  {
    question: 'Do I need to use the form?',
    answer:
      'No. You can also contact the team directly by email or phone. The form simply helps keep requests structured and easier to route.',
  },
];

function ContactUs() {
  return (
    <PublicPageShell
      hero={{
        eyebrow: 'Contact',
        title: 'Talk to BookingCrown about your booking workflow',
        description:
          'Use this page for support questions, product inquiries, onboarding discussions, or operational challenges related to reservations and scheduling.',
      }}
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Contact us' },
      ]}
    >
      <Seo
        title="Contact Us"
        description="Contact BookingCrown for support, onboarding questions, product inquiries, or booking workflow guidance."
        path="/contact-us"
      />

      <div className="space-y-8">
        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-4 text-base leading-8 text-slate-700">
            <p>
              A trustworthy business website should make it easy to contact the team behind it. This page is designed to do exactly that. Whether you already use BookingCrown or you are evaluating the platform for the first time, you should be able to ask direct questions without searching through a thin landing page or hidden support flow.
            </p>
            <p>
              The most useful inquiries usually describe the business type, the booking process you use today, and the practical problem you want to improve. That might be overlapping reservations, weak follow-up, confusing pricing, or difficulty tracking customer details in one place. The more clearly you describe the workflow, the more relevant our response can be.
            </p>
            <p>
              If you prefer direct contact instead of a form, you can also email {SUPPORT_EMAIL} or call {SUPPORT_PHONE} during business hours. We keep this information public because real support access is part of a complete and credible website experience.
            </p>
          </div>
        </section>

        <Contact />

        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-['Crimson_Text'] text-3xl font-semibold text-slate-900">Frequently asked questions</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}

export default ContactUs;
