

const DashboardLoader = () => {
    return (
        <div className="min-h-screen flex bg-gray-100 animate-pulse">

      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg p-6 space-y-6">
        
        {/* Logo */}
        <div className="h-8 w-2/3 bg-gray-300 rounded"></div>

        {/* Menu Items */}
        <div className="space-y-4 mt-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-4 w-full bg-gray-200 rounded"
            ></div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 space-y-8">

          {/* Page Title */}
          <div className="h-8 w-1/3 bg-gray-300 rounded"></div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white shadow-md rounded-xl p-6 space-y-4"
              >
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-8 w-2/3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          
          {/* Chart Section */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
            <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-64 w-full bg-gray-200 rounded-lg"></div>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <div className="h-6 w-1/4 bg-gray-300 rounded"></div>

            {[1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="flex justify-between items-center"
              >
                <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
    );
};

export default DashboardLoader;
