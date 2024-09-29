import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import { useOutlet } from "react-router-dom";

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

export function DashboardLayout() {
  const outlet = useOutlet();
  return (
    <div className="grid w-full pl-[53px]">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        <main className="flex w-full h-full p-4">{outlet}</main>
      </div>
    </div>
  );
}
