import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{transform: "translateZ(0)"}}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
          </svg>
        </div>


        {/*<section className="pt-20 pb-48">*/}
        {/*  <div className="container mx-auto px-4">*/}
        {/*    <div className="flex flex-wrap justify-center text-center mb-24">*/}
        {/*      <div className="w-full lg:w-6/12 px-4">*/}
        {/*        <h2 className="text-4xl font-semibold">Here are our heroes</h2>*/}
        {/*        <p className="text-lg leading-relaxed m-4 text-blueGray-500">*/}
        {/*          According to the National Oceanic and Atmospheric*/}
        {/*          Administration, Ted, Scambos, NSIDClead scentist, puts the*/}
        {/*          potentially record maximum.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="flex flex-wrap">*/}
        {/*      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">*/}
        {/*        <div className="px-6">*/}
        {/*          <img*/}
        {/*            alt="..."*/}
        {/*            src="/img/team-1-800x800.jpg"*/}
        {/*            className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
        {/*          />*/}
        {/*          <div className="pt-6 text-center">*/}
        {/*            <h5 className="text-xl font-bold">Ryan Tompson</h5>*/}
        {/*            <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">*/}
        {/*              Web Developer*/}
        {/*            </p>*/}
        {/*            <div className="mt-6">*/}
        {/*              <button*/}
        {/*                className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-twitter"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-facebook-f"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-dribbble"></i>*/}
        {/*              </button>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">*/}
        {/*        <div className="px-6">*/}
        {/*          <img*/}
        {/*            alt="..."*/}
        {/*            src="/img/team-2-800x800.jpg"*/}
        {/*            className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
        {/*          />*/}
        {/*          <div className="pt-6 text-center">*/}
        {/*            <h5 className="text-xl font-bold">Romina Hadid</h5>*/}
        {/*            <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">*/}
        {/*              Marketing Specialist*/}
        {/*            </p>*/}
        {/*            <div className="mt-6">*/}
        {/*              <button*/}
        {/*                className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-google"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-facebook-f"></i>*/}
        {/*              </button>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">*/}
        {/*        <div className="px-6">*/}
        {/*          <img*/}
        {/*            alt="..."*/}
        {/*            src="/img/team-3-800x800.jpg"*/}
        {/*            className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
        {/*          />*/}
        {/*          <div className="pt-6 text-center">*/}
        {/*            <h5 className="text-xl font-bold">Alexa Smith</h5>*/}
        {/*            <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">*/}
        {/*              UI/UX Designer*/}
        {/*            </p>*/}
        {/*            <div className="mt-6">*/}
        {/*              <button*/}
        {/*                className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-google"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-twitter"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-instagram"></i>*/}
        {/*              </button>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">*/}
        {/*        <div className="px-6">*/}
        {/*          <img*/}
        {/*            alt="..."*/}
        {/*            src="/img/team-4-470x470.png"*/}
        {/*            className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
        {/*          />*/}
        {/*          <div className="pt-6 text-center">*/}
        {/*            <h5 className="text-xl font-bold">Jenna Kardi</h5>*/}
        {/*            <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">*/}
        {/*              Founder and CEO*/}
        {/*            </p>*/}
        {/*            <div className="mt-6">*/}
        {/*              <button*/}
        {/*                className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-dribbble"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-google"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-twitter"></i>*/}
        {/*              </button>*/}
        {/*              <button*/}
        {/*                className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                <i className="fab fa-instagram"></i>*/}
        {/*              </button>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="pb-20 relative block bg-blueGray-800">*/}
        {/*  <div*/}
        {/*    className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"*/}
        {/*    style={{transform: "translateZ(0)"}}*/}
        {/*  >*/}
        {/*    <svg*/}
        {/*      className="absolute bottom-0 overflow-hidden"*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*      preserveAspectRatio="none"*/}
        {/*      version="1.1"*/}
        {/*      viewBox="0 0 2560 100"*/}
        {/*      x="0"*/}
        {/*      y="0"*/}
        {/*    >*/}
        {/*      <polygon*/}
        {/*        className="text-blueGray-800 fill-current"*/}
        {/*        points="2560 0 2560 100 0 100"*/}
        {/*      ></polygon>*/}
        {/*    </svg>*/}
        {/*  </div>*/}

        {/*  <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">*/}
        {/*    <div className="flex flex-wrap text-center justify-center">*/}
        {/*      <div className="w-full lg:w-6/12 px-4">*/}
        {/*        <h2 className="text-4xl font-semibold text-white">*/}
        {/*          Build something*/}
        {/*        </h2>*/}
        {/*        <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">*/}
        {/*          Put the potentially record low maximum sea ice extent tihs*/}
        {/*          year down to low ice. According to the National Oceanic and*/}
        {/*          Atmospheric Administration, Ted, Scambos.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="flex flex-wrap mt-12 justify-center">*/}
        {/*      <div className="w-full lg:w-3/12 px-4 text-center">*/}
        {/*        <div*/}
        {/*          className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">*/}
        {/*          <i className="fas fa-medal text-xl"></i>*/}
        {/*        </div>*/}
        {/*        <h6 className="text-xl mt-5 font-semibold text-white">*/}
        {/*          Excelent Services*/}
        {/*        </h6>*/}
        {/*        <p className="mt-2 mb-4 text-blueGray-400">*/}
        {/*          Some quick example text to build on the card title and make up*/}
        {/*          the bulk of the cards content.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*      <div className="w-full lg:w-3/12 px-4 text-center">*/}
        {/*        <div*/}
        {/*          className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">*/}
        {/*          <i className="fas fa-poll text-xl"></i>*/}
        {/*        </div>*/}
        {/*        <h5 className="text-xl mt-5 font-semibold text-white">*/}
        {/*          Grow your market*/}
        {/*        </h5>*/}
        {/*        <p className="mt-2 mb-4 text-blueGray-400">*/}
        {/*          Some quick example text to build on the card title and make up*/}
        {/*          the bulk of the cards content.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*      <div className="w-full lg:w-3/12 px-4 text-center">*/}
        {/*        <div*/}
        {/*          className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">*/}
        {/*          <i className="fas fa-lightbulb text-xl"></i>*/}
        {/*        </div>*/}
        {/*        <h5 className="text-xl mt-5 font-semibold text-white">*/}
        {/*          Launch time*/}
        {/*        </h5>*/}
        {/*        <p className="mt-2 mb-4 text-blueGray-400">*/}
        {/*          Some quick example text to build on the card title and make up*/}
        {/*          the bulk of the cards content.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
        {/*<section className="relative block py-24 lg:pt-0 bg-blueGray-800">*/}
        {/*  <div className="container mx-auto px-4">*/}
        {/*    <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">*/}
        {/*      <div className="w-full lg:w-6/12 px-4">*/}
        {/*        <div*/}
        {/*          className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">*/}
        {/*          <div className="flex-auto p-5 lg:p-10">*/}
        {/*            <h4 className="text-2xl font-semibold">*/}
        {/*              Want to work with us?*/}
        {/*            </h4>*/}
        {/*            <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">*/}
        {/*              Complete this form and we will get back to you in 24*/}
        {/*              hours.*/}
        {/*            </p>*/}
        {/*            <div className="relative w-full mb-3 mt-8">*/}
        {/*              <label*/}
        {/*                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
        {/*                htmlFor="full-name"*/}
        {/*              >*/}
        {/*                Full Name*/}
        {/*              </label>*/}
        {/*              <input*/}
        {/*                type="text"*/}
        {/*                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
        {/*                placeholder="Full Name"*/}
        {/*              />*/}
        {/*            </div>*/}

        {/*            <div className="relative w-full mb-3">*/}
        {/*              <label*/}
        {/*                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
        {/*                htmlFor="email"*/}
        {/*              >*/}
        {/*                Email*/}
        {/*              </label>*/}
        {/*              <input*/}
        {/*                type="email"*/}
        {/*                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
        {/*                placeholder="Email"*/}
        {/*              />*/}
        {/*            </div>*/}

        {/*            <div className="relative w-full mb-3">*/}
        {/*              <label*/}
        {/*                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
        {/*                htmlFor="message"*/}
        {/*              >*/}
        {/*                Message*/}
        {/*              </label>*/}
        {/*              <textarea*/}
        {/*                // rows="4"*/}
        {/*                // cols="80"*/}
        {/*                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"*/}
        {/*                placeholder="Type a message..."*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*            <div className="text-center mt-6">*/}
        {/*              <button*/}
        {/*                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
        {/*                type="button"*/}
        {/*              >*/}
        {/*                Send Message*/}
        {/*              </button>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}


        <div className="container mx-auto px-4">
          <hr className="my-6 border-blueGray-300"/>
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © 2024 - {" "}
                <a
                  href="https://github.com/khanhtimn/it3180/"
                  className="text-blueGray-500 hover:text-blueGray-800"
                >
                  Nhóm 3
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}