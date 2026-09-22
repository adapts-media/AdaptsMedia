import Image from "next/image";
import Link from "next/link";

const ContactCTA = () => {
  return (
    <section className="relative group overflow-hidden py-20 w-full flex flex-col items-center justify-center bg-[#c42a27]">
      {/* 1. Background Image */}
      <Image
        src="/images/Awards_Bg.png"
        fill
        alt="Decorative Element"
        className="absolute z-0 pointer-events-none object-cover"
      />

      {/* 2. Video Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        suppressHydrationWarning
        poster="/images/Awards_Bg.png"
        style={{
          // This creates a smooth fade-out towards the edges
          maskImage: 'radial-gradient(circle, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 95%)',
        }}
        className="absolute z-10 top-1/2 -translate-y-1/2 right-0 w-[45%] h-[90%] object-cover opacity-50 mix-blend-multiply pointer-events-none"
      >
        <source src="/assets/video_bg5.mp4" type="video/mp4" />
      </video>



      <div className="relative z-10 group max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 items-start justify-start">
        <div className="flex flex-col gap-4 max-w-4xl">



          {/* Main Content */}
          <h2 className="text-3xl md:text-7xl font-heading font-normal text-white leading-[1.3] tracking-tight">
            Ready to start your next project or still exploring ideas?{' '}

            {/* INLINE BUTTON REPLACEMENT -> LINK TO CONTACT US */}
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center md:px-6 lg:px-6 py-2 md:skew-x-[-12deg] overflow-hidden transition-all bg-transparent group align-middle duration-500 cursor-pointer"
            >
              <span className="flex items-center gap-3 text-3xl md:text-7xl font-heading font-thin italic border-b md:skew-x-[12deg] border-white/70 text-white group-hover:text-[#c42a27] transition-colors duration-500">
                Let's connect
                {/* REPLACED SEARCH WITH ARROW */}
                <svg
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  className="w-6 h-6 md:w-12 md:h-12 rotate-45 group-hover:rotate-90 transition-all duration-500 ease-out"
                >
                  <g stroke="currentColor" fill="none" strokeWidth="0">
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>

              {/* The "fill" animation background */}
              <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10" />
            </Link>
          </h2>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;