import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import BlogCard from '@/components/blog/BlogCard';
import BlogSkeleton from '@/components/blog/BlogSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchArticles } from '@/services/contentService';

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const loadArticles = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchArticles({
        page,
        limit: 9,
        search: debouncedSearch,
        sort: 'published_at',
        order: 'desc',
      });
      setArticles(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    loadArticles(1);
  }, [loadArticles]);

  const handlePageChange = (page) => {
    loadArticles(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

  return (
    <div className="pt-24 pb-16">
      <div className="container-main pt-6 md:pt-8">
        <SectionTitle
          badge="Blog & Artikel"
          title="Tips & Informasi Seputar NPWP"
          subtitle="Artikel bermanfaat tentang perpajakan, legalitas usaha, dan panduan pengurusan dokumen resmi."
        />

        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-2">{error}</p>
            <button
              type="button"
              onClick={() => loadArticles(1)}
              className="text-sm text-brand-600 font-semibold hover:underline"
            >
              Coba lagi
            </button>
          </div>
        )}

        {!error && loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        )}

        {!error && !loading && articles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Belum ada artikel ditemukan.</p>
          </div>
        )}

        {!error && !loading && articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  type="button"
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                >
                  Previous
                </button>
                {pages.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePageChange(p)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      p === pagination.page
                        ? 'bg-brand-600 text-white'
                        : 'border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
