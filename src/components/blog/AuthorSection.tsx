import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";

interface AuthorSectionProps {
  author: {
    name: string;
    slug: string;
    description: string;
    avatar: string;
    role: string;
    linkedin: string;
    email: string;
    expertise?: string[];
  };
}

const AuthorSection = ({ author }: AuthorSectionProps) => {
  if (!author) return null;

  const authorName = author.name;
  const authorDesc = author.description;
  const authorAvatar = author.avatar;
  const authorRole = author.role;
  const email = author.email.startsWith("mailto:") ? author.email : `mailto:${author.email}`;
  const linkedin = author.linkedin;

  return (
    <section className="w-full bg-gradient-to-r from-[#083c8a] to-[#1565c0] py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Avatar */}
        <div className="flex-shrink-0 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl">
          <Image
            src={authorAvatar}
            alt={authorName}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow text-center md:text-left text-white">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{authorName}</h3>
              <p className="text-blue-100 text-base md:text-lg">{authorRole}</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href={email} className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#083c8a] transition-all group">
                <FaEnvelope className="w-5 h-5 text-white group-hover:text-[#083c8a]" />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#083c8a] transition-all group">
                <FaLinkedinIn className="w-5 h-5 text-white group-hover:text-[#083c8a]" />
              </a>
            </div>
          </div>

          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
            {authorDesc}
          </p>

          {author.expertise && author.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {author.expertise.map((exp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm"
                >
                  {exp}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto">
            <Link 
              href={`/author/${author.slug}`}
              className="inline-block border-2 border-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-white hover:text-[#083c8a] transition-all"
            >
              View All Posts by {authorName}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
