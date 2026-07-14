const usersData = [
  {
    broker: "Zerodha (DU000004)",
    activePositions: 1,
    availableCapital: "₹ 1.54 Cr",
    totalDeployedStrategies: 3,
    activeStrategies: 1,
    status: "Active",
    currentPnL: "₹ 50.02 K",
    requiredCapital: "₹ 50.02 K",
  },
  {
    broker: "Angel One (MNBN1026)",
    activePositions: 2,
    availableCapital: "₹ 2.50 K",
    totalDeployedStrategies: 2,
    activeStrategies: 2,
    status: "Active",
    currentPnL: "₹ 60.02 K",
    requiredCapital: "₹ 60.02 K",
  },
  {
    broker: "Finvasia (FA189009)",
    activePositions: 0,
    availableCapital: "₹ 50.02 K",
    totalDeployedStrategies: 0,
    activeStrategies: 0,
    status: "Pending",
    currentPnL: "₹ 0.00",
    requiredCapital: "₹ 0.00",
  },
];

const columns = [
  { key: "broker", label: "Broker" },
  { key: "activePositions", label: "No. of  active positions" },
  { key: "availableCapital", label: "Available Capital" },
  { key: "totalDeployedStrategies", label: "Total Deployed Strategies" },
  { key: "activeStrategies", label: "Active Strategies" },
  { key: "status", label: "Status" },
  { key: "currentPnL", label: "Current P&L" },
  { key: "requiredCapital", label: "Required Capital" },
];

export default function UsersTable() {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="pb-3 pt-2 pr-4 text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 ${
                  idx % 2 === 1 ? "bg-[#F0F0FF]" : "bg-white"
                }`}
              >
                <td className="py-4 pr-4 text-sm text-gray-900 whitespace-nowrap">
                  {user.broker}
                </td>
                <td className="py-4 pr-4 text-sm text-gray-900">
                  {user.activePositions}
                </td>
                <td className="py-4 pr-4 text-sm text-gray-900 whitespace-nowrap">
                  {user.availableCapital}
                </td>
                <td className="py-4 pr-4 text-sm text-gray-900">
                  {user.totalDeployedStrategies}
                </td>
                <td className="py-4 pr-4 text-sm text-gray-900">
                  {user.activeStrategies}
                </td>
                <td className="py-4 pr-4 text-sm whitespace-nowrap">
                  <span
                    className={
                      user.status === "Active"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 pr-4 text-sm text-green-500 whitespace-nowrap">
                  {user.currentPnL}
                </td>
                <td className="py-4 pr-4 text-sm text-gray-900 whitespace-nowrap">
                  {user.requiredCapital}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
