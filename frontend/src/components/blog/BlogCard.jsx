import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogCard({ article }) {
  const formattedDate = new Date(article.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
      {article.image_url && (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        {article.category && (
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-3">
            {article.category}
          </span>
        )}
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
          <Link to={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Baca
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
