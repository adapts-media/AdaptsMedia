interface TermsContentProps {
  contentHtml: string;
}

export default function TermsContent({ contentHtml }: TermsContentProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Terms Content Container */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div
          className="terms-conditions-body
            /* Paragraphs */
            [&_p]:text-slate-600 [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:text-[15px] sm:[&_p]:text-base
            
            /* Section Headings */
            [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#07476B] 
            [&_h2]:pt-10 [&_h2]:pb-3 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-slate-100
            [&_h2:first-of-type]:pt-0
            
            [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#07476B] 
            [&_h3]:pt-8 [&_h3]:pb-2.5 [&_h3]:mb-4 [&_h3]:border-b [&_h3]:border-slate-100
            [&_h3:first-of-type]:pt-0
            
            /* Subheadings */
            [&_h4]:text-lg sm:[&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-slate-800 
            [&_h4]:mt-6 [&_h4]:mb-3
            
            /* Lists */
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-6 [&_ul]:space-y-3
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-3 [&_ol]:mb-6
            [&_li]:text-slate-600 [&_li]:leading-relaxed [&_li]:text-[15px] sm:[&_li]:text-base
            [&_li>strong]:text-slate-900 [&_li>strong]:font-semibold
            
            /* Strong text */
            [&_strong]:text-slate-900 [&_strong]:font-semibold
            
            /* Links */
            [&_a]:text-[#1c64f2] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#07476B] [&_a]:transition-colors
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}
