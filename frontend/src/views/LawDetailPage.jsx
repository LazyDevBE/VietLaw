import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { lawService } from '../services/lawService'
import Navbar from '../components/Navbar'

function LawDetailPage() {
  const { slug } = useParams()
  const [law, setLaw] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLaw()
  }, [slug])

  const loadLaw = async () => {
    try {
      const data = await lawService.getLawBySlug(slug)
      setLaw(data)
    } catch (err) {
      console.error('Failed to load law', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!law) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không Tìm Thấy Văn Bản</h2>
          <p className="text-gray-600">Văn bản pháp luật này không tồn tại hoặc đã bị xóa</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <a href="/law" className="hover:text-blue-600">Cơ Sở Dữ Liệu</a>
            <span>/</span>
            <span className="text-gray-800">{law.title}</span>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-800">{law.title}</h1>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {law.tags?.map((tag, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {law.content}
              </div>
            </div>

            {/* Categories */}
            {law.categories && law.categories.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Danh Mục:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {law.categories.map((cat, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-gray-200 pt-8 mt-8 flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Chia Sẻ
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Lưu
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Văn Bản Liên Quan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2">Luật Dân Sự 2015</h3>
                <p className="text-gray-600 text-sm">Quy định về các quan hệ dân sự...</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2">Bộ Luật Lao Động</h3>
                <p className="text-gray-600 text-sm">Quy định về quyền và nghĩa vụ...</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default LawDetailPage
