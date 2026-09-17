const HeroVideo = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/*
        This video is ~11MB — the single largest asset on the homepage.
        preload="auto" is intentional (it's an immediate autoplay/loop
        hero, so we want it buffering right away rather than stalling
        mid-playback), but the file itself is a strong candidate for
        re-encoding at a lower bitrate/resolution — a looping background
        video behind text rarely needs full quality. Left as a flag
        rather than done here: no video tooling available in this
        environment, and compressing it is a visual call worth a look
        before landing, not a silent edit.
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        suppressHydrationWarning
        className="hero-video absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/AdaptsMedia_Banner_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default HeroVideo;