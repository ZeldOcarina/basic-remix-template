import { Link } from "@remix-run/react";
import { Home, Book, Crown, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Courses",
    url: "/crm/courses",
    icon: Book,
  },
  {
    title: "Tributes",
    url: "#",
    icon: Crown,
  },
  {
    title: "Blog",
    url: "#",
    icon: Book,
  },
  {
    title: "Users",
    url: "https://dashboard.clerk.com/apps/app_2pOn2vkgsDfTFSoIBEmbzXzzH4J/instances/ins_2pOn3716uPw0ah9m4CWkfR2cEI7/users",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.url.startsWith("http") ? (
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
