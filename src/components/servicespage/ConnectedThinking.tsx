import PerformanceMarketing from '../layout/PerformanceMarketing'
import SocialContent from '../layout/SocialContent'
import WebDigitalExperience from '../layout/WebDigitalExperience'
import BrandingCreative from '../layout/BrandingCreative'
import PublicRelations from '../layout/PublicRelations'
import StrategyConsulting from '../layout/StrategyConsulting'
import AiIntelligence from '../layout/AiIntelligence'
import SearchEngineOptimization from '../layout/SearchEngineOptimization'

const ConnectedThinking = () => {
  return (
    <div className='min-h-screen bg-[#064ED3]'>
       {/* --- Shared Video Container for first two components --- */}
        <div className="relative w-full">
            {/* The Video Overlay: 
               Adjust h-[140%] to make it taller or shorter.
               Adjust top-[-10%] to move it further up into Performance Marketing.
            */}
            <video
                autoPlay
                loop
                muted
                playsInline
                suppressHydrationWarning
                poster="/default-og.jpg"
                style={{
                    maskImage: 'radial-gradient(circle, black 40%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 90%)',
                }}
                className="absolute inset-0 z-0 w-full h-[70%] object-cover mix-blend-multiply opacity-75 pointer-events-none"
            >
                <source src="/assets/video_bg3.mp4" type="video/mp4" />
            </video>

            {/* Components sit on top */}
            <div className="relative z-10">
                <PerformanceMarketing />
                <SocialContent />
            </div>
        </div>
        {/* --- Shared Video Container --- */}
        <div className="relative w-full">
            {/* The Video Overlay */}
            <video
                autoPlay
                loop
                muted
                playsInline
                suppressHydrationWarning
                poster="/default-og.jpg"
                style={{
                    maskImage: 'radial-gradient(circle, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 95%)',
                }}
                className="absolute inset-0 z-0 w-full h-[70%] object-cover mix-blend-multiply opacity-75 blur-xs pointer-events-none"
            >
                <source src="/assets/video_bg3.mp4" type="video/mp4" />
            </video>

            {/* The Components that sit over the video */}
            <div className="relative z-10">
                <WebDigitalExperience/>
                <BrandingCreative/>
            </div>
        </div>
        <PublicRelations/>
        <StrategyConsulting/>
        <AiIntelligence/>
        <SearchEngineOptimization/>
        
    </div>
  )
}

export default ConnectedThinking