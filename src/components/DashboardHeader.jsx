export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <button className="rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors">
        Contact Us
      </button>
    </div>
  );
}
