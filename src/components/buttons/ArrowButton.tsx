import Link from "next/link";

interface ArrowButtonProps {
  title: string;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
  onClick?: () => void;
  variant?: 'light' | 'blue';
  href?: string;
}

const ArrowButton = ({ title, width = 'auto', onClick, variant = 'light', href }: ArrowButtonProps) => {
  // Responsive width mapping
  const widthMap = {
    sm: "w-32 md:w-40",
    md: "w-52 md:w-56",
    lg: "w-64 md:w-72",
    xl: "w-80 md:w-96",
    full: "w-full",
    auto: "w-auto"
  };

  const isBlue = variant === 'blue';
  
  const borderClass = isBlue ? 'border-[#064ed3]/60 bg-transparent' : 'border-white/50 bg-white/5 hover:bg-white/5';
  const textClass = isBlue ? 'text-[#064ed3] group-hover:text-white' : 'text-white';
  const beforeBgClass = isBlue ? 'before:bg-[#064ed3]' : 'before:bg-white';
  const iconBorderClass = isBlue ? 'border-[#064ed3]/60 text-[#064ed3]' : 'border-white/40 text-white';
  const iconHoverClass = isBlue ? 'group-hover:border-white/40 group-hover:text-white group-hover:bg-transparent' : 'group-hover:border-none group-hover:bg-white group-hover:text-black';

  const classes = `
    ${widthMap[width]}
    group cursor-pointer relative z-10 flex items-center justify-center gap-3 overflow-hidden rounded-full border ${borderClass}
    px-5 py-2.5 md:px-6 md:py-3 
    font-['DM_Sans'] text-[16px] md:text-[18px] font-normal tracking-[0.02em] ${textClass} transition-all duration-700 
    whitespace-nowrap no-underline
    before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full ${beforeBgClass} before:transition-all before:duration-700 
    before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700
  `;

  const content = (
    <>
      <span className="relative z-10 font-thin">{title}</span>
      <svg
        className={`w-5 h-5 md:w-6 md:h-6 rotate-45 rounded-full border ${iconBorderClass} p-1 md:p-1.5 duration-300 ease-linear group-hover:rotate-90 ${iconHoverClass} relative z-10`}
        viewBox="0 0 16 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          fill="currentColor"
        ></path>
      </svg>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
};

export default ArrowButton;