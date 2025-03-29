export default function HowToSponsorSection() {
  return (
      <section
          className="relative w-full min-h-screen flex flex-col justify-center "
      >
          {/* Overlay to make text readable */}
          <div className="absolute inset-0 "></div>

          {/* Content */}
          <div className="relative z-10 text-center text-white max-w-6xl mx-auto">
              <h1 className="text-5xl text-left font-bold mb-6 tracking-wider">How To Sponsor</h1>
              <p className="text-2xl text-left leading-2 mb-4 tracking-widest">
                Please 
                <a
                  className="underline hover:font-bold m-2"
                  href={"/contact"}
                >
                  Contact Us
                </a>
                and we will respond as soon as possible
              </p>
              <hr className="border-white border-2 w-40 my-8" />
              <h3 className="text-3xl text-left font-bold mb-6 tracking-wider">
                Thank you for trusting and supporting LSN
              </h3>
          </div>
      </section>
  );
};
