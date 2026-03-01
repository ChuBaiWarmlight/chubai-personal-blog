export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* 左侧：Logo和导航 */}
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
            博客
          </div>
          
          {/* 导航链接 */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
            >
              仪表盘
            </a>
            <a
              href="/posts"
              className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
            >
              文章管理
            </a>
            <a
              href="/media"
              className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
            >
              媒体库
            </a>
            <a
              href="/comments"
              className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
            >
              评论管理
            </a>
            <a
              href="/settings"
              className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
            >
              系统设置
            </a>
          </nav>
        </div>
      </div>

      {/* 右侧：用户菜单 */}
      <div className="flex items-center space-x-4">
        {/* 搜索框 */}
        <div className="hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索..."
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m-2 5a7 7 0 11-14 0 7 7 0 0 7 7 0a11 11 0 0 11 11-11 11 11z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 用户菜单 */}
        <div className="flex items-center space-x-3">
          {/* 通知 */}
          <button className="relative text-gray-500 hover:text-blue-600 p-2 rounded-lg transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2 2 0 002 17v-6a2 2 0 002-2H6a2 2 0 002-2V9a2 2 0 002-2l6-6a2 2 0 002 2l-1.405 1.405A2 2 0 011.595 7.595V17a2 2 0 0012-12z" />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* 用户头像 */}
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 p-2 rounded-lg transition-colors duration-200">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              陈
            </div>
          </button>

          {/* 登出 */}
          <button className="text-gray-500 hover:text-red-600 p-2 rounded-lg transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4 4m4-4h12a2 2 0 002 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012-2v6a2 2 0 012-2h12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
