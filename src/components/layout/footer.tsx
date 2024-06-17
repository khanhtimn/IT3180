import React from "react";
import { Github } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="relative pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
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

        <div className="container mx-auto px-4">
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © 2024 -{" "}
                <a href="https://github.com/khanhtimn/it3180/">
                  Nhóm 3 - IT3180.
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <section className="pt-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center">
                {[
                  {
                    name: "Phạm Quang Khánh",
                    mssv: "20224867",
                    imgSrc: "/img/khanh-460x460.jpg",
                    social: [{ icon: <Github />, url: "https://github.com/khanhtimn" }],
                  },
                  {
                    name: "Phạm Đức Mạnh",
                    mssv: "20225361",
                    imgSrc: "/img/manh-460x460.jpg",
                    social: [{ icon: <Github />, url: "https://github.com/p3dm" }],
                  },
                  {
                    name: "Bùi Hoàng Anh",
                    mssv: "20215298",
                    imgSrc: "/img/hoangem-460x460.jpg",
                    social: [{ icon: <Github />, url: "https://github.com/mimiceolo" }],
                  },
                ].map((person, index) => (
                  <div
                    key={index}
                    className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 px-4"
                  >
                    <div className="px-6">
                      <Image
                        width={460}
                        height={460}
                        alt={person.name}
                        src={person.imgSrc}
                        className="shadow-lg rounded-full mx-auto w-24"
                      />
                      <div className="pt-6 text-center">
                        <h5 className="text-xl font-bold">{person.name}</h5>
                        <p className="text-sm uppercase font-semibold">
                          {person.mssv}
                        </p>
                        <div className="mt-6 flex justify-center">
                          {person.social.map((social, idx) => (
                            <a
                              key={idx}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1 flex items-center justify-center"
                            >
                              {social.icon}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
}