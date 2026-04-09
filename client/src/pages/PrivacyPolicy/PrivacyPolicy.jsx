import PublicPageShell from '../../common/PublicPageShell';
import Seo from '../../common/Seo';
import { LAST_UPDATED, SUPPORT_EMAIL, SUPPORT_PHONE } from '../../content/siteData';

const sections = [
  {
    heading: 'Introduction',
    paragraphs: [
      'BookingCrown respects the privacy of visitors, prospective customers, and registered users. This Privacy Policy explains what information we collect, why we collect it, how we use it, and what choices users have when interacting with the site and platform.',
      'We believe privacy information should be readable, specific, and connected to the way the service actually works. That means explaining not only what data is collected in forms, but also how account activity, support inquiries, and booking-related information may be handled over time.',
    ],
  },
  {
    heading: 'Information we collect',
    paragraphs: [
      'When a visitor signs up, contacts the team, or uses booking-related functionality, BookingCrown may collect personal and business information such as name, email address, phone number, business name, address, and booking details. We may also collect account-related information such as authentication data, user role information, and communication history when someone contacts support.',
      'Like most websites, we may also receive technical information automatically through browser requests and analytics tools, including IP address, browser type, referring pages, approximate device information, and general interaction data used to understand site performance and user experience.',
    ],
  },
  {
    heading: 'How we use information',
    paragraphs: [
      'Information is used to operate and improve BookingCrown. That includes creating or managing accounts, supporting booking workflows, responding to inquiries, sending confirmations, improving service quality, analyzing performance, and protecting the platform against misuse or unauthorized access.',
      'We may also use information to communicate important updates, policy changes, onboarding guidance, or account support messages. We do not collect information solely to create empty profiles or irrelevant marketing lists. The purpose of collection is tied to running the platform responsibly and supporting legitimate business communication.',
    ],
  },
  {
    heading: 'Cookies, analytics, and advertising',
    paragraphs: [
      'BookingCrown may use cookies or similar technologies to maintain sessions, understand how visitors use the site, improve usability, and support analytics or advertising features. Cookies can help remember browser settings and help us understand which pages are useful to visitors.',
      'If Google AdSense or related Google services are active on eligible content-rich pages, Google may use cookies to serve ads based on prior visits to this site or other websites. Users can learn more about personalized advertising controls through Google ad settings and related industry opt-out tools.',
    ],
  },
  {
    heading: 'How we share information',
    paragraphs: [
      'BookingCrown does not sell personal information in the ordinary course of business. Information may be shared with service providers or infrastructure partners only where needed to operate the website, deliver email, host the platform, or secure the service. Access is limited to what is reasonably necessary.',
      'Information may also be disclosed where required by law, to protect rights or safety, to investigate abuse, or as part of a lawful business process involving platform administration. We aim to keep such disclosure limited and appropriate to the context.',
    ],
  },
  {
    heading: 'Data retention and security',
    paragraphs: [
      'We retain information only as long as it is reasonably needed for the purposes described in this policy, including account management, operational records, legal obligations, and support history. Retention periods may vary depending on the nature of the information and the reason it was collected.',
      'We use reasonable technical and organizational measures to protect the data we handle. However, no website or transmission method can guarantee absolute security. Users should also protect their own credentials and contact us if they believe their account or data has been compromised.',
    ],
  },
  {
    heading: 'User choices and rights',
    paragraphs: [
      'Depending on jurisdiction, users may have rights to request access to their personal information, ask for correction of inaccurate records, request deletion where appropriate, or object to certain uses of data. We will review such requests in good faith and respond as required by applicable law and operational constraints.',
      'If you would like to ask about your information or submit a privacy-related request, contact BookingCrown directly using the details below.',
    ],
  },
];

function PrivacyPolicy() {
  return (
    <PublicPageShell
      hero={{
        eyebrow: 'Legal',
        title: 'Privacy Policy',
        description:
          'This policy explains how BookingCrown collects, uses, stores, and protects personal and business information when visitors use the website or contact the team.',
      }}
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Privacy policy' },
      ]}
    >
      <Seo
        title="Privacy Policy"
        description="Read the BookingCrown privacy policy covering data collection, account information, cookies, advertising, retention, and contact options."
        path="/privacy-policy"
      />

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-6 space-y-8">
          {sections.map((section) => (
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

        <section className="mt-8 rounded-3xl bg-themeLight p-5">
          <h2 className="text-xl font-semibold text-slate-900">Contact for privacy questions</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Email {SUPPORT_EMAIL} or call {SUPPORT_PHONE} if you have a privacy-related request or a question about how your information is handled.
          </p>
        </section>
      </div>
    </PublicPageShell>
  );
}

export default PrivacyPolicy;
