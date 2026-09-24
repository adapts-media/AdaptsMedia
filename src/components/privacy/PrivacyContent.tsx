interface PrivacyContentProps {
  contentHtml: string;
}

export default function PrivacyContent({ contentHtml }: PrivacyContentProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Policy Content Container */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div
          className="privacy-policy-body
            /* Paragraphs */
            [&_p]:text-slate-600 [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:text-[15px] sm:[&_p]:text-base
            
            /* Section Headings (H2) */
            [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#07476B] 
            [&_h2]:pt-10 [&_h2]:pb-3 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-slate-100
            [&_h2:first-of-type]:pt-0
            
            /* Subheadings (H3) */
            [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 
            [&_h3]:mt-8 [&_h3]:mb-4
            
            /* Lists */
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-6 [&_ul]:space-y-3
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-3 [&_ol]:mb-6
            [&_li]:text-slate-600 [&_li]:leading-relaxed [&_li]:text-[15px] sm:[&_li]:text-base
            [&_li>strong]:text-slate-900 [&_li>strong]:font-semibold
            
            /* Strong text */
            [&_strong]:text-slate-900 [&_strong]:font-semibold
            
            /* Links */
            [&_a]:text-[#1c64f2] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#07476B] [&_a]:transition-colors
            
            /* Tables */
            [&_.wp-block-table]:overflow-x-auto [&_.wp-block-table]:my-8 [&_.wp-block-table]:rounded-2xl [&_.wp-block-table]:border [&_.wp-block-table]:border-slate-200 [&_.wp-block-table]:shadow-2xs
            [&_table]:w-full [&_table]:border-collapse [&_table]:text-left
            [&_tr:first-child>td]:bg-slate-50 [&_tr:first-child>td]:text-slate-900 [&_tr:first-child>td]:font-bold [&_tr:first-child>td]:border-b-2 [&_tr:first-child>td]:border-slate-200
            [&_td]:p-4 [&_td]:border-b [&_td]:border-slate-100 [&_td]:text-slate-600 [&_td]:text-sm sm:[&_td]:text-[15px]
            [&_tr:last-child>td]:border-b-0
            [&_tr:not(:first-child):hover>td]:bg-slate-50/60
            
            /* Office Cards Styling */
            [&_.privacy-office-card]:bg-slate-50/70 [&_.privacy-office-card]:hover:bg-white [&_.privacy-office-card]:transition-all
            [&_.privacy-office-card_p]:mb-3 [&_.privacy-office-card_p]:leading-relaxed [&_.privacy-office-card_p]:text-[13px] sm:[&_.privacy-office-card_p]:text-sm
            [&_.privacy-office-card_a]:no-underline hover:[&_.privacy-office-card_a]:underline
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}
