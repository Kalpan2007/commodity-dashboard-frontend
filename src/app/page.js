import Navbar from "@/components/Navbar";
import DashboardHeader from "@/components/DashboardHeader";
import CommodityChart from "@/components/CommodityChart";
import Description from "@/components/Description";
import UsersTable from "@/components/UsersTable";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader />
        <CommodityChart />
        <Description />
        <UsersTable />
      </main>
    </>
  );
}
