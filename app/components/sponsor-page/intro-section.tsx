export default function ProblemSection() {
  return (
      <section
          className="relative w-full min-h-screen flex flex-col justify-center "
      >
          {/* Overlay to make text readable */}
          <div className="absolute inset-0 "></div>

          {/* Content */}
          <div className="relative z-10 text-center text-white max-w-6xl mx-auto">
              <h1 className="text-5xl text-left font-bold mb-6 tracking-wider">Our Sponsors</h1>
              <p className="text-2xl text-left leading-2 mb-4 tracking-widest">
                Empowering Student Connections Across the UK
              </p>
              <hr className="border-white border-2 w-40 my-8" />
              <h3 className="text-3xl text-left font-bold mb-6 tracking-wider">
                A Heartfelt Thank You
              </h3>
              <p className="text-2xl text-left font-light mb-8 mt-8 text-gray-300">
                We extend our heartfelt gratitude to our sponsors who play a vital role in supporting LSN.
             </p>
              <p className="text-2xl text-left font-light mb-8 mt-8 text-gray-300">
                Their commitment to enhancing the student experience empowers us to connect students across the UK with a vibrant array of activities and societies.
              </p>
          </div>
          <div className="relative flex flex-col w-full justify-center items-center">
            <p className="text-md md:text-xl text-gray-300 pb-2">
                Scroll down for more
            </p>
            {/* hero icons chevron-double-down*/}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>
          </div>
      </section>
  );
};
