import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

function Intro() {
  const mergedRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    // Name typing (ONE TIME ONLY)
    const typedName = new Typed(nameRef.current, {
      strings: ['<span class="name">M.Ibrahim</span>'],
      typeSpeed: 100,
      backSpeed: 10,
      loop: false,
      showCursor: false,
    });

    // Smooth typing for skill text
    const typedMerged = new Typed(mergedRef.current, {
      strings: [
        `Full Stack Developer`,
        `Expertise in Front End `,
        `React / Next.js Developer`,
        `MongoDB, Node.js, Express`,
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      smartBackspace: true,
    });

    return () => {
      typedName.destroy();
      typedMerged.destroy();
    };
  }, []);

  return (
    <>
      <section id="intro">
        <div className="home-container flex flex-col md:flex-row items-center justify-between p-10">

          {/* Left Text */}
          <div className="home-text" data-aos="fade-down-right">
            <h1 className="text-3xl font-bold">
              Hi There! <span className="wave">👋</span>
            </h1>

            <h2 className="text-4xl font-bold mt-2">
              I'M <span className="text-black rounded-xl p-1" ref={nameRef}></span>
            </h2>

            {/* FIXED HEIGHT TO STOP PAGE JUMPING */}
            <span
              ref={mergedRef}
              className="text-xl font-semibold mt-4 inline-block"
              style={{ minHeight: "30px", display: "inline-block" }}
            ></span>
          </div>

          {/* Right Image */}
          <div className="home-image mt-[130px] md:mt-0" data-aos="fade-down-left">
            <img 
              src="https://res.cloudinary.com/df92wfbox/image/upload/v1765256008/myImages/skeyt9gkg1x54mrtk351.png" 
              alt="My_image" 
              className="rounded-full shadow-lg border-5 border-blue-500" 
            />
          </div>
        </div>

        <br /><br /><br />
      </section>
    </>
  );
}

export default Intro;
