import React from "react";
import Footer from "@/components/layout/footer";
import { CloudMoon, Sun, MapPin, Shield } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import {Button} from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75"
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://btnmt.1cdn.vn/2021/12/20/hinh-1.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center"
              >
                <div className="px-12">
                  <CloudMoon className="text-white w-24 h-24 mb-2 lg:w-6/12 px-4 ml-auto mr-auto text-center" />
                  <h1 className="text-white font-semibold text-5xl">
                    Chung cư BlueMoon
                  </h1>
                  <p className="text-white mt-4 text-lg">
                    Biểu tượng của sự phát triển hiện đại và thịnh vượng. Với
                    thiết kế tinh tế và tiện nghi sang trọng, BlueMoon mang đến
                    không gian sống hoàn hảo, xứng tầm đẳng cấp.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <section className="pb-20 mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto bg-white rounded-lg">
                    <Sun className="w-12 h-12 mb-4 mx-auto text-black" />
                    <h6 className="text-xl font-semibold text-black">Tiện Nghi Cao Cấp</h6>
                    <p className="mt-2 font-light mb-4 text-black">
                      Thưởng thức các tiện ích hiện đại như phòng gym, hồ bơi và
                      vườn trên mái. Mọi chi tiết đều được thiết kế để mang đến
                      sự thoải mái và sang trọng tuyệt đối.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full md:w-4/12 px-4 text-center"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto bg-white rounded-lg">
                    <MapPin className="w-12 h-12 mb-4 mx-auto text-black" />
                    <h6 className="text-xl font-semibold text-black">Vị Trí Chiến Lược</h6>
                    <p className="mt-2 mb-4 font-light text-black">
                      Tọa lạc tại ngã tư sầm uất Văn Phú, BlueMoon cung cấp sự
                      tiếp cận tuyệt vời đến các trung tâm mua sắm, nhà hàng và
                      khu giải trí. Tiện lợi ngay trước cửa nhà bạn.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="pt-6 w-full md:w-4/12 px-4 text-center"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto bg-white rounded-lg">
                    <Shield className="w-12 h-12 mb-4 mx-auto text-black" />
                    <h6 className="text-xl font-semibold text-black">An Ninh Tuyệt Đối</h6>
                    <p className="mt-2 mb-4 font-light text-black">
                      Hệ thống an ninh hàng đầu đảm bảo sự yên tâm với giám sát
                      24/7, các điểm vào bảo mật và nhân viên bảo vệ chuyên
                      nghiệp.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-5/12 px-4 mr-auto ml-auto"
              >
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  BlueMoon là chung cư hiện đại bậc nhất
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4">
                  Tọa lạc ngay ngã tư Văn Phú được khởi công xây dựng năm 2021 và
                  hoàn thành vào 2023. Chung cư được xây dựng trên diện tích
                  450m2, gồm 30 tầng, tầng 1 làm kiot, 4 tầng đế, 24 tầng nhà ở
                  và 1 tầng penhouse.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-4/12 px-4 mr-auto ml-auto"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg">
                  <Image
                    width={1900}
                    height={1900}
                    alt="BlueMoon là chung cư hiện đại bậc nhất"
                    src="/img/bluemoon-modern.jpg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          ></div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-4/12 ml-auto mr-auto px-4"
              >
                <Image
                  width={2560}
                  height={1440}
                  alt="BlueMoon là chung cư danh giá bậc nhất"
                  src="/img/bluemoon-convenient.jpg"
                  className="max-w-full rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-5/12 ml-auto mr-auto px-4 mt-4"
              >
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold">
                    BlueMoon là chung cư danh giá bậc nhất
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                    Đến với chung cư BlueMoon, quý khách sẽ được chào đón bởi
                    sự thân thiện của đội ngũ nhân viên tận tình và tận hưởng
                    những dịch vụ cao cấp bậc nhất khu vực, đảm bảo sẽ mang đến
                    cho quý khách một trải nghiệm ấn tượng không
                    thể nào quên.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative block lg:pt-0">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:mt-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full lg:w-6/12 px-4"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold text-black">
                      Để lại lời nhắn cho chúng tôi
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-black">
                      Hãy điền vào mục dưới đây và chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-xs font-bold mb-2 text-black"
                        htmlFor="full-name"
                      >
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Họ và tên"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2 text-black"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-xs font-bold mb-2 text-black"
                        htmlFor="message"
                      >
                        Lời nhắn
                      </label>
                      <textarea
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Để lại lời nhắn..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <Button
                        className="uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Gửi
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
