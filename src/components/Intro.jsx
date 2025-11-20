import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

function Intro() {
  const mergedRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    // Name typing
    const typedName = new Typed(nameRef.current, {
      strings: ['<span class="name">M.Ibrahim</span>'],
      typeSpeed: 70,
      backSpeed: 40,
      loop: true,
    });

    // Merged text typing (1 + 2 combined)
    const typedMerged = new Typed(mergedRef.current, {
      strings: [
        `Full Stack Web and App Developer`,
        `<span class="name">Expertise in</span> Front End Development`,
      ],
      typeSpeed: 70,
      backSpeed: 40,
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
      <section id="home" className="">
        <div className="home-container flex flex-col md:flex-row items-center justify-between p-10">
          
          {/* Left Text */}
          <div className="home-text">
            <h1 className="text-3xl font-bold">
              Hi There! <span className="wave">👋</span>
            </h1>

            <h2 className="text-4xl font-bold mt-2">
              I'M <span className="text-black rounded-xl p-1" id="myName" ref={nameRef}></span>
            </h2>

            {/* Combined Typed */}
            <span
              ref={mergedRef}
              className="text-xl font-semibold mt-4 inline-block"
            ></span>
          </div>

          {/* Right Image */}
          <div className="home-image mt-10 md:mt-0">
            {/* <img src={devImg} alt="Developer" className="w-72" /> */}
            <img src="../assets/me.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Intro;
