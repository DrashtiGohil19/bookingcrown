function PageHero({ eyebrow, title, description }) {
  return (
    <section className="rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.22),_transparent_45%),linear-gradient(135deg,_#052c2c,_#0f766e_55%,_#14b8a6)] px-6 py-12 text-white shadow-xl md:px-10 md:py-16">
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-4xl font-['Crimson_Text'] text-4xl font-semibold leading-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/88 md:text-lg">
        {description}
      </p>
    </section>
  );
}

export default PageHero;
