import PublicPageShell from '../../common/PublicPageShell';
import Seo from '../../common/Seo';
import { LAST_UPDATED, SUPPORT_EMAIL, SUPPORT_PHONE } from '../../content/siteData';

const sections = [
  {
    heading: 'Acceptance of terms',
    paragraphs: [
      'By accessing or using BookingCrown, you agree to these Terms and Conditions. These terms apply to visitors, prospective customers, account holders, and other users of the website or platform. If you do not agree with the terms, you should not use the service.',
      'These terms exist to describe how the platform may be used, what responsibilities users have, and what limits apply to the service. They should be read alongside our Privacy Policy and any product-specific communication or operational instructions shared directly with registered users.',
    ],
  },
  {
    heading: 'Nature of the service',
    paragraphs: [
      'BookingCrown provides booking management functionality and related informational content intended to help service businesses organize reservations, manage customer details, and improve operational clarity. The website also includes educational articles and public content designed to explain booking-related concepts and service expectations.',
      'Features, workflows, onboarding requirements, and access controls may change over time as the platform evolves. Public descriptions are intended to be accurate, but operational details may vary based on user role, business type, or current service availability.',
    ],
  },
  {
    heading: 'User responsibilities',
    paragraphs: [
      'Users are responsible for providing accurate information when creating accounts, contacting the team, or using booking-related features. Account holders must protect login credentials and are responsible for activity that occurs under their account unless and until they report unauthorized access.',
      'Users must not misuse the platform, interfere with service stability, attempt unauthorized access, submit harmful content, harvest data improperly, or use the site in a way that violates applicable law or the rights of others.',
    ],
  },
  {
    heading: 'Content, accuracy, and operational decisions',
    paragraphs: [
      'BookingCrown publishes educational content to support better decision-making, but users remain responsible for their own commercial, legal, operational, and policy decisions. Articles, examples, and recommendations are general in nature and may not fit every business model or regulatory environment.',
      'We aim to provide useful and accurate information, but we do not guarantee that public content will cover every scenario or remain suitable for all users without further review.',
    ],
  },
  {
    heading: 'Accounts, approvals, and access',
    paragraphs: [
      'Some parts of the BookingCrown platform require account access, and some access may depend on user role, account status, or business approval. We reserve the right to suspend, restrict, or terminate access where we believe a user has violated these terms, created operational risk, or used the platform improperly.',
      'We may also modify, limit, or discontinue features where necessary for maintenance, service quality, compliance, or business operations. Where possible, we aim to communicate material changes clearly.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'Unless otherwise stated, the content, structure, branding, and software elements of BookingCrown are owned by or licensed to BookingCrown and are protected by applicable intellectual property laws. Users may not copy, republish, distribute, or exploit site content or platform code beyond what is permitted by law or expressly authorized.',
      'Limited personal or business reference use of publicly available information is acceptable, but that does not transfer ownership or create a right to reproduce the service as a competing product or duplicated website.',
    ],
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'To the fullest extent permitted by law, BookingCrown is not liable for indirect, incidental, special, consequential, or business interruption damages arising from use of the website or platform. This includes losses tied to missed bookings, data issues, operational misunderstandings, or reliance on general informational content.',
      'Nothing in these terms is intended to exclude liability where exclusion is not legally permitted. In all cases, users remain responsible for reviewing their own business workflows and using the platform appropriately.',
    ],
  },
];

function TermsAndConditions() {
  return (
    <PublicPageShell
      hero={{
        eyebrow: 'Legal',
        title: 'Terms and Conditions',
        description:
          'These terms describe how BookingCrown may be used, what users are responsible for, and how the service is presented to visitors and account holders.',
      }}
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Terms and conditions' },
      ]}
    >
      <Seo
        title="Terms and Conditions"
        description="Read the BookingCrown terms and conditions covering use of the site, account responsibilities, content limitations, and service expectations."
        path="/terms-and-conditions"
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
          <h2 className="text-xl font-semibold text-slate-900">Questions about these terms</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Contact BookingCrown at {SUPPORT_EMAIL} or {SUPPORT_PHONE} if you need clarification about these terms before using the platform.
          </p>
        </section>
      </div>
    </PublicPageShell>
  );
}

export default TermsAndConditions;
