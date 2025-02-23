import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";

const Navigation: React.FC = () => {
  return (
    <Navbar
      position="sticky"
      shouldHideOnScroll
      className="border-b-4 justify-evenly w-full"
    >
      <NavbarBrand>
        <Button
          variant="light"
          className="flex justify-center hover:-translate-y-1"
        >
          <p className="font-bold capitalize text-lg bg-gradient-to-r from-gray-800 to-gray-100 bg-clip-text text-transparent">
            NEXUS
          </p>
        </Button>
      </NavbarBrand>
      <NavbarMenuToggle className="flex xl:hidden" />
      <NavbarContent className="hidden xl:flex flex-grow justify-center gap-10 text-gray-800">
        <NavbarItem>
          <p className="font-medium text-lg duration-300 ease-in-out hover:-translate-y-1 hover:text-foreground-500 transition-all">
            Home
          </p>
        </NavbarItem>
        <NavbarItem>
          <p className="font-medium text-lg duration-300 ease-in-out hover:-translate-y-1 hover:text-foreground-500 transition-all">
            About
          </p>
        </NavbarItem>
        <NavbarItem>
          <p className="font-medium text-lg duration-300 ease-in-out hover:-translate-y-1 hover:text-foreground-500 transition-all">
            Contact
          </p>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="md:hidden">
        <NavbarMenuItem>
          <p className="font-medium text-lg duration-300 ease-in-out hover:-translate-y-1 hover:text-foreground-500 transition-all">
            Home
          </p>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <p className="font-medium text-lg duration-300 ease-in-out hover:-translate-y-1 hover:text-foreground-500 transition-all">
            About
          </p>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <p className="font-medium text-lg duration-300 ease-in-out hover:-translate-y-1 hover:text-foreground-500 transition-all">
            Contact
          </p>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="shadow"
            color="primary"
            size="md"
            className="flex justify-center font-extrabold text-gray-100 text-md hover:-translate-y-1"
          >
            Sign Up
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="faded"
            color="secondary"
            className="flex justify-center font-extrabold text-gray-800 text-md hover:-translate-y-1"
          >
            Login
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
      <div className="hidden xl:flex gap-4">
        <NavbarItem>
          <Button
            variant="shadow"
            color="primary"
            size="md"
            className="flex justify-center font-extrabold text-gray-100 text-md hover:-translate-y-1"
          >
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="faded"
            color="secondary"
            className="flex justify-center font-extrabold text-gray-800 text-md hover:-translate-y-1"
          >
            Login
          </Button>
        </NavbarItem>
      </div>
    </Navbar>
  );
};

export default Navigation;
