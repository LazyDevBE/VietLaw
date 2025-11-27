import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { lawService } from '../services/lawService'
import Navbar from '../components/Navbar'

function LawPage() {
  const [laws, setLaws] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadLaws()
  }, [])

  const loadLaws = async () => {
    setLoading(true)
    try {
      const data = await lawService.getAllLaws(keyword)
      setLaws(data)
    } catch (err) {
      console.error('Failed to load laws', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    loadLaws()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
            Tra cứu văn bản pháp luật
          </h1>
          <p className="text-gray-600 text-lg">Tra cứu và tìm hiểu các văn bản pháp luật một cách dễ dàng</p>
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12 max-w-3xl mx-auto">
          <div className="flex gap-3 bg-white rounded-2xl shadow-lg p-2">
            <div className="flex-1 flex items-center gap-3 px-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm văn bản pháp luật..."
                className="flex-1 py-3 focus:outline-none text-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
            >
              Tìm Kiếm
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : laws.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy kết quả</h3>
            <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laws.map((law) => (
              <Link
                key={law.id}
                to={`/law/${law.seoSlug}`}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{law.title}</h3>
                </div>
                
                <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">{law.content}</p>
                
                <div className="flex flex-wrap gap-2">
                  {law.tags?.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                  {law.tags?.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      +{law.tags.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LawPage
