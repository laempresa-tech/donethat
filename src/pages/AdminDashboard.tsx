import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Sparkles, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface Submission {
  _id: string;
  email: string;
  userType: 'user' | 'expert';
  createdAt: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState<'all' | 'user' | 'expert'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);

  const ITEMS_PER_PAGE = 10;

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('limit', '1000'); // Fetch all for client-side pagination
      if (filter !== 'all') params.append('userType', filter);

      const response = await fetch(`/api/get-submissions?${params.toString()}`, {
        headers: {
          'X-API-Key': apiKey,
        },
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        setError('Invalid API key. Please re-authenticate.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setAllSubmissions(data.data);
      setCurrentPage(1); // Reset to first page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  };

  const handleFilterChange = (newFilter: 'all' | 'user' | 'expert') => {
    setFilter(newFilter);
    setAllSubmissions([]); // Clear existing submissions
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [filter, isAuthenticated]);

  // Calculate paginated submissions
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setSubmissions(allSubmissions.slice(startIndex, endIndex));
  }, [currentPage, allSubmissions]);

  const totalPages = Math.ceil(allSubmissions.length / ITEMS_PER_PAGE);
  const showPagination = allSubmissions.length > ITEMS_PER_PAGE;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const exportToCSV = () => {
    const headers = ['Email', 'User Type', 'Created At'];
    const rows = allSubmissions.map(s => [
      s.email,
      s.userType === 'user' ? 'Aspiring Entrepreneur' : 'Business Owner',
      new Date(s.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donethat-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f6f7fb] to-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-[0_26px_80px_rgba(11,16,32,0.14)] p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-[920] tracking-[-0.03em] bg-gradient-to-r from-[#4B8FD8] to-[#ffb199] bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[rgba(11,16,32,0.64)] mb-6">
            Enter your API key to access the dashboard
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key"
              className="w-full px-5 py-3 rounded-2xl border-2 border-[rgba(11,16,32,0.12)] focus:border-[#4B8FD8] focus:outline-none mb-4"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#4B8FD8] to-[#ffb199] text-white font-[920] hover:shadow-[0_16px_36px_rgba(75,143,216,0.3)] transition-all"
            >
              Login
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7fb] to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-[rgba(11,16,32,0.08)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="p-2 hover:bg-[rgba(75,143,216,0.1)] rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#4B8FD8]" />
            </button>
            <h1 className="text-2xl font-[920] tracking-[-0.03em] bg-gradient-to-r from-[#4B8FD8] to-[#ffb199] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#4B8FD8] text-white rounded-xl hover:bg-[#3d7ab8] transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(11,16,32,0.08)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[rgba(75,143,216,0.1)] rounded-xl">
                <Users className="w-5 h-5 text-[#4B8FD8]" />
              </div>
              <span className="text-[rgba(11,16,32,0.64)] text-sm">Total Submissions</span>
            </div>
            <div className="text-3xl font-[920] text-[#0b1020]">
              {allSubmissions.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(11,16,32,0.08)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[rgba(75,143,216,0.1)] rounded-xl">
                <Users className="w-5 h-5 text-[#4B8FD8]" />
              </div>
              <span className="text-[rgba(11,16,32,0.64)] text-sm">Aspiring Entrepreneurs</span>
            </div>
            <div className="text-3xl font-[920] text-[#0b1020]">
              {allSubmissions.filter(s => s.userType === 'user').length}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(11,16,32,0.08)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[rgba(255,177,153,0.2)] rounded-xl">
                <Sparkles className="w-5 h-5 text-[#ffb199]" />
              </div>
              <span className="text-[rgba(11,16,32,0.64)] text-sm">Business Owners</span>
            </div>
            <div className="text-3xl font-[920] text-[#0b1020]">
              {allSubmissions.filter(s => s.userType === 'expert').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-5 h-5 text-[rgba(11,16,32,0.64)]" />
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-xl font-extrabold text-sm transition-all ${
              filter === 'all'
                ? 'bg-[#4B8FD8] text-white'
                : 'bg-white text-[rgba(11,16,32,0.64)] hover:bg-[rgba(75,143,216,0.1)]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange('user')}
            className={`px-4 py-2 rounded-xl font-extrabold text-sm transition-all ${
              filter === 'user'
                ? 'bg-[#4B8FD8] text-white'
                : 'bg-white text-[rgba(11,16,32,0.64)] hover:bg-[rgba(75,143,216,0.1)]'
            }`}
          >
            Aspiring Entrepreneurs
          </button>
          <button
            onClick={() => handleFilterChange('expert')}
            className={`px-4 py-2 rounded-xl font-extrabold text-sm transition-all ${
              filter === 'expert'
                ? 'bg-[#4B8FD8] text-white'
                : 'bg-white text-[rgba(11,16,32,0.64)] hover:bg-[rgba(75,143,216,0.1)]'
            }`}
          >
            Business Owners
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(11,16,32,0.08)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[rgba(75,143,216,0.05)] border-b border-[rgba(11,16,32,0.08)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-extrabold text-[#0b1020]">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-extrabold text-[#0b1020]">User Type</th>
                  <th className="px-6 py-4 text-left text-sm font-extrabold text-[#0b1020]">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(11,16,32,0.08)]">
                {loading && submissions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-[rgba(11,16,32,0.52)]">
                      Loading...
                    </td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-[rgba(11,16,32,0.52)]">
                      No submissions yet
                    </td>
                  </tr>
                ) : (
                  submissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-[rgba(75,143,216,0.02)] transition-colors">
                      <td className="px-6 py-4 text-sm text-[#0b1020]">{submission.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold ${
                            submission.userType === 'user'
                              ? 'bg-[rgba(75,143,216,0.1)] text-[#4B8FD8]'
                              : 'bg-[rgba(255,177,153,0.2)] text-[#ffb199]'
                          }`}
                        >
                          {submission.userType === 'user' ? (
                            <>
                              <Users className="w-3 h-3" />
                              Aspiring Entrepreneur
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              Business Owner
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[rgba(11,16,32,0.64)]">
                        {new Date(submission.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {showPagination && (
            <div className="px-6 py-4 border-t border-[rgba(11,16,32,0.08)]">
              <div className="flex items-center justify-between">
                {/* Page info */}
                <div className="text-sm text-[rgba(11,16,32,0.64)]">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, allSubmissions.length)} of {allSubmissions.length} entries
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  {/* Previous button */}
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-[rgba(11,16,32,0.12)] hover:bg-[rgba(75,143,216,0.1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#4B8FD8]" />
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-[rgba(11,16,32,0.64)]">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page as number)}
                          className={`min-w-[40px] px-3 py-2 rounded-lg font-extrabold text-sm transition-all ${
                            currentPage === page
                              ? 'bg-[#4B8FD8] text-white'
                              : 'border border-[rgba(11,16,32,0.12)] text-[rgba(11,16,32,0.64)] hover:bg-[rgba(75,143,216,0.1)]'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-[rgba(11,16,32,0.12)] hover:bg-[rgba(75,143,216,0.1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[#4B8FD8]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
