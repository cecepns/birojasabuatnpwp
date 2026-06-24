import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { fetchArticleBySlug } from '@/services/contentService';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchArticleBySlug(slug);
        setArticle(res.data);
        document.title = `${res.data.title} | Biro Jasa Buat NPWP`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-32 pb-16 text-center container-main">
        <p className="text-red-500 mb-4">{error || 'Artikel tidak ditemukan'}</p>
        <Link to="/blog" className="text-brand-600 font-semibold hover:underline">
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="pt-24 md:pt-28 pb-16">
      <div className="container-main max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Blog
        </Link>

        {article.category && (
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-4">
            {article.category}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Calendar className="w-4 h-4" />
          {formattedDate}
          {article.author && <span>&middot; {article.author}</span>}
        </div>

        {article.image_url && (
          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9] bg-slate-100">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-brand-600 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}
