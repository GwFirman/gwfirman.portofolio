const navItems = [
  { label: "Who am I?", href: "#" },
  { label: "Work", href: "#" },
  { label: "Guest Book", href: "#" },
  { label: "Connect", href: "#" },
];

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 shadow-sm border border-gray-200/50 mx-4">
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm sm:text-base text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
