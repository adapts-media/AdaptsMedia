const HeroVideo = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-video absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/AdaptsMedia_Banner_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default HeroVideo;