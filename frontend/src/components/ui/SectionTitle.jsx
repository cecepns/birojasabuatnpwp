export default function SectionTitle({ badge, title, subtitle, align = 'center' }) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClass}`}>
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
