import React from "react";
// import profileImg from "../assets/me.png";

const MySelf = () => {
  return (
    <div className="bg-[#0c001a] text-white min-h-screen flex items-center" id="about">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* Text Section */}
        <div
          data-aos="flip-left"
          data-aos-duration="2000"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            LET ME{" "}
            <span className="text-purple-400">INTRODUCE</span>{" "}
            <span className="text-purple-300">MYSELF</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed">
            My name is <span className="font-bold text-purple-400">Muhammad Ibrahim</span>.
            I am currently pursuing a Full Stack Web & App Development course at{" "}
            <span className="font-bold text-purple-400">SMIT</span>.
          </p>

          <p className="mt-4 text-lg leading-relaxed">
            I am passionate about building modern web applications and love to turn
            ideas into reality using code. My journey in tech has equipped me with 
            a strong foundation in both frontend and backend technologies.
          </p>

          <h2 className="mt-6 text-xl font-semibold">My professional skillset includes:</h2>

          <ul className="mt-3 space-y-2 text-lg">
            <li>• <span className="font-bold text-purple-300">HTML5</span> & <span className="font-bold text-purple-300">CSS3</span> for crafting responsive UI</li>
            <li>• <span className="font-bold text-purple-300">JavaScript</span> for interactive web experiences</li>
            <li>• <span className="font-bold text-purple-300">React.js</span> for advanced frontend</li>
            <li>• <span className="font-bold text-purple-300">Firebase</span> Auth & FireStore I Used & <span className="font-bold text-purple-300">Supabase</span> of Basic Knowledge</li>
            <li>• <span className="font-bold text-purple-300">Node.js<span className="text-white">/</span> Express.js <span className="text-white">&</span> MongoDB</span> for backend</li>
            <li>• <span className="font-bold text-purple-300">Git & GitHub</span> for version control</li>
            <li>• <span className="font-bold text-purple-300">Tailwind Css <span className="text-white">&</span> Bootstrap</span> for fast UI development</li>
            <li>• Completed <span className="font-bold text-purple-300">Frontend</span> & Learning Backend</li>
          </ul>

          <p className="mt-6 text-lg">
            I am always eager to learn new technologies and take on challenging projects 
            that help me grow as a developer.
          </p>
        </div>

        {/* Image Section */}
        <div
          className="flex justify-center"
          data-aos="flip-left"
          data-aos-duration="2500"
          data-aos-delay="300"
        >
          <img
            src='../assets/code.gif'
            alt="Profile"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-lg border-4 border-purple-500"
          />
        </div>

      </div>

    </div>
  );
};

export default MySelf;