import { redirect } from "next/navigation";

export default function DashboardIndexPage() {
  // Redirect /dashboard to /dashboard/orders as default page
  redirect("/dashboard/orders");
}