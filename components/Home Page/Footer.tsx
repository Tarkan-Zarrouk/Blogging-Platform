import { Link } from "@heroui/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-950 text-purple-800 py-8 px-4 md:px-20">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h6 className="font-bold mb-4 md:mb-0">Nexus</h6>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link href="#" className="hover:underline">
              About Us
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
