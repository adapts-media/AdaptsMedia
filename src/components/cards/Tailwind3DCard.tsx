import Image from "next/image";

const BookmarkIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const Tailwind3DCard = ({
  title,
  image,
  logo,
  tags,
  label = "Blog Post"
}: {
  title: string;
  image: string;
  logo?: string;
  tags?: string[];
  label?: string;
}) => {
  return (
    <div className="w-full">
      <div className="
        group relative aspect-[9/14] w-full overflow-hidden rounded-2xl 
        bg-zinc-900 border border-white/10 
        transition-all duration-500 ease-out
        hover:border-white/30 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]
      ">

        {/* Image Layer */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover opacity-100 transition-opacity duration-700"
          />
        </div>

        {/* Overlay Shine */}
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent"
        />

        {/* Content Layer with gradient overlay for contrast */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        >
          {/* Logo */}
          {logo && (
            <div className="mb-4 relative w-36 h-12 select-none pointer-events-none">
              <Image
                src={logo}
                alt="Brand Logo"
                fill
                className="w-full h-full object-contain object-left drop-shadow-md"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-heading font-light leading-tight text-white mb-6">
            {title}
          </h3>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 border border-white/30 text-white/90 rounded-full px-3 py-[4px] text-[11px] bg-white/5 font-sans"
                >
                  <BookmarkIcon />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Border Highlight */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-30" />
      </div>
    </div>
  );
};

export default Tailwind3DCard;