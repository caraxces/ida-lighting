"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function IDALightingProfile() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return
      const scrollPosition = window.scrollY
      const opacity = Math.min(1, scrollPosition / 300)
      if (textRef.current) {
        textRef.current.style.opacity = (0.4 + opacity * 0.6).toString()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-gradient-to-r from-black via-black to-[#8B2323] text-white min-h-screen w-full">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="flex justify-center md:justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-64 h-64 bg-red-700"
            />
          </div>
          <div className="space-y-6" ref={textRef}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-center md:text-left text-white"
            >
              NGƯỜI THẮP SÁNG IDA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm md:text-base text-gray-300 leading-relaxed"
            >
              Với tầm nhìn sáng tạo và đột phá, IDA LIGHTING được thành lập vào năm 2019 bởi Ths.Kts Nguyễn Đình Dương. Sau nhiều năm làm việc 
trong lĩnh vực thiết kế và thi công kiến trúc, nhận thấy nhu cầu cấp thiết về những giải pháp chiếu sáng hiện đại, tinh tế và cá nhân hóa 
cao cho các công trình. Đây chính là động lực để IDA LIGHTING ra đời vào năm 2019 với sứ mệnh:
              <span className="block italic mt-2">"Biến ánh sáng thành lên nhân của không gian".</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm md:text-base text-gray-300 leading-relaxed"
            >
              IDA LIGHTING không chỉ cung cấp ánh sáng mà còn mang đến giải pháp chiếu sáng tối ưu, giúp các không gian kiến trúc trở nên hoàn 
              hảo, ấn tượng và tiện nghi. Chúng tôi luôn hướng đến việc kết hợp tính thẩm mỹ và sự hiệu quả, tạo ra những sản phẩm đẳng cấp quốc 
              tế với khả năng làm nổi bật các chi tiết kiến trúc trong mọi không gian. Trở thành đơn vị thiết kế và giải pháp chiếu sáng đáp ứng được 
              nhu cầu của các Kiến trúc sư và khách hàng, mang đến những trải nghiệm cao nhất về ánh sáng trên thế giới về thị trường Việt Nam.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm md:text-base text-gray-300 leading-relaxed"
            >
              Với đội ngũ chuyên gia và các đối tác quốc tế uy tín,{" "}
              IDA LIGHTING cam kết mang đến những sản phẩm chiếu sách chất
              lượng cao, đáp ứng mọi yêu cầu từ các dự án kiến trúc phức tạp đến các công trình có yêu cầu cao về công
              năng và thẩm mỹ. Và trên hết là sự thỏa mãn nhu cầu, đạt đến thủy cảm hứng của{" "}
              IDA LIGHTING là điểm cho hành công trình. Chính là thành công là
              đích đến của IDA muốn hướng tới.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">CÂU CHUYỆN CỦA ÁNH SÁNG</h2>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              Xuất thân từ một kiến trúc sư, tôi đã từng tiếp xúc và làm việc với rất nhiều dự án trong lĩnh vực thiết
              kế - thi công. Và nhận thấy một vấn đề lớn trong ngành: Thị trường chiếu sáng thiếu vắng những giải pháp
              không chỉ đẹp mắt mà còn cần hiệu quả và tiết kiệm năng lượng. Bên cạnh đó, trong quá trình làm việc, bản
              thân gặp khó khăn trong việc tìm ra những sản phẩm chiếu sáng vừa có thể tôn vinh không gian, vừa đảm bảo
              chất lượng và tính bền vững. Ánh sáng là thành tố chính tạo nên
              chất lượng thẩm mỹ, góp phần tạo chiều sâu và cảm xúc cho những giải kiến trúc.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center md:justify-end items-center"
          >
            <div className="w-48 h-64 relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=256&width=192"
                alt="Founder Portrait"
                width={192}
                height={256}
                className="object-cover grayscale"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Organization Chart Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative border-t border-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white mb-12"
        >
          CHI TIẾT SƠ ĐỒ TỔ CHỨC:
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="flex flex-col items-center">
              {/* HDQT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-700 px-8 py-2 mb-4 w-40 text-center"
              >
                <p className="font-bold">HĐQT</p>
              </motion.div>

              {/* Dotted line */}
              <div className="h-6 border-l border-dotted border-gray-500"></div>

              {/* GIAM DOC */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-700 px-8 py-2 mb-4 w-40 text-center"
              >
                <p className="font-bold">GIÁM ĐỐC</p>
              </motion.div>

              {/* Dotted lines to 3 directors */}
              <div className="w-full flex justify-between items-center mb-4">
                <div className="w-1/3 flex flex-col items-center">
                  <div className="h-6 border-l border-dotted border-gray-500"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-700 px-4 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs md:text-sm">GIÁM ĐỐC KỸ THUẬT</p>
                  </motion.div>
                </div>

                <div className="w-1/3 flex flex-col items-center">
                  <div className="h-6 border-l border-dotted border-gray-500"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-700 px-4 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs md:text-sm">GIÁM ĐỐC KINH DOANH</p>
                  </motion.div>
                </div>

                <div className="w-1/3 flex flex-col items-center">
                  <div className="h-6 border-l border-dotted border-gray-500"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-700 px-4 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs md:text-sm">GIÁM ĐỐC TÀI CHÍNH</p>
                  </motion.div>
                </div>
              </div>

              {/* Departments */}
              <div className="w-full grid grid-cols-3 gap-4">
                {/* Technical departments */}
                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG DỰ ÁN</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG THIẾT KẾ</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG KỸ THUẬT</p>
                  </motion.div>

                  <div className="h-6 border-l border-dotted border-gray-500"></div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">TỔ GIÁM SÁT</p>
                  </motion.div>

                  <div className="h-6 border-l border-dotted border-gray-500"></div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">TỔ THI CÔNG</p>
                  </motion.div>

                  <div className="h-6 border-l border-dotted border-gray-500"></div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">TỔ BẢO HÀNH - SỬA CHỮA</p>
                  </motion.div>
                </div>

                {/* Business departments */}
                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG KINH DOANH</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG NHẬP KHẨU</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG R&D (NC - PT)</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG SẢN XUẤT</p>
                  </motion.div>
                </div>

                {/* Finance departments */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gray-700 px-2 py-2 w-full text-center"
                  >
                    <p className="font-bold text-xs">PHÒNG KẾ TOÁN</p>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-xs md:text-sm text-gray-400 mt-12 leading-relaxed"
            >
              IDA LIGHTING có đội ngũ nhân sự trên 30 người gồm nhiều kỹ sư, kiến trúc sư, kỹ sư, thạc sĩ kinh tế,
              chuyên gia, nhân viên có kinh độ chuyên môn đầy đam mê nghiệm và làm việc. Toàn thể nhân viên hoạt động
              đúng tinh thần:
              <span className="block font-bold text-center my-4">SÁNG TẠO - CHUYÊN NGHIỆP - HIỆU QUẢ</span>
              và luôn phải huy tinh sáng tạo trong mỗi công trình để mỗi sản phẩm là một tác phẩm nghệ thuật về ánh
              sáng, không đơn thuần như và làm hài lòng mỗi khách hàng khi tìm đến IDA LIGHTING.
            </motion.p>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full h-32 relative overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=128&width=320"
                alt="Team Photo 1"
                width={320}
                height={128}
                className="object-cover w-full h-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full h-32 relative overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=128&width=320"
                alt="Team Photo 2"
                width={320}
                height={128}
                className="object-cover w-full h-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full h-32 relative overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=128&width=320"
                alt="Team Photo 3"
                width={320}
                height={128}
                className="object-cover w-full h-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full h-32 relative overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=128&width=320"
                alt="Team Photo 4"
                width={320}
                height={128}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Business Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Operating Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-500 mr-2"></div>
              <h3 className="text-xl font-bold text-white">PHƯƠNG CHÂM HOẠT ĐỘNG</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-white font-bold">PHÙ HỢP NHẤT</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Đến với IDA LIGHTING chúng tôi sẽ cung cấp cho quý khách hàng các sản phẩm chiếu sáng phù hợp nhất dựa
                  theo:
                </p>
                <ul className="text-sm text-gray-300 space-y-1 pl-4">
                  <li>- Giá thẩm mỹ của chủ đầu tư</li>
                  <li>- Phong cách kiến trúc của công trình</li>
                  <li>- Nguồn sách của chủ đầu tư</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">TIÊN TIẾN NHẤT</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING tự hào là một trong những đơn vị đi đầu tại Việt Nam và khu vực về công nghệ và sản phẩm
                  mới, chúng tôi luôn luôn nỗ lực cập nhật những công nghệ mới nhất và hiện đại nhất để đáp ứng nhu cầu
                  và tính đặc thù của các dự án.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Business Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-500 mr-2"></div>
              <h3 className="text-xl font-bold text-white">TRIẾT LÝ KINH DOANH</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-white font-bold">CHUYÊN TÂM</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING luôn đặt làm huyết, tận tâm đồng hành trong từng sản phẩm. Vì chúng tôi hiểu Câu chuyện
                  ánh sáng của mình có khả năng đồng điệu và song hành cùng khách hàng trong mọi khoảnh khắc của cuộc
                  sống.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">CHUYÊN NGHIỆP</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING xây dựng đội ngũ nhân sự chuyên nghiệp. Với mọi đối tượng và sản phẩm của IDA đều đạt
                  tiêu chí tận tâm đầu, đảm bảo đáp ứng sự tin tưởng của khách hàng và đối tác.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">CHUYÊN BIỆT</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING đề cao tính sáng tạo, những ý tưởng mới, cập nhật những xu hướng, công nghệ và những sản
                  phẩm tốt nhất nhằm đồng bộ và tương thích cao nhất với hệ sinh thái chung, giúp mang cao kết quả và
                  chất lượng của dự án.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-500 mr-2"></div>
              <h3 className="text-xl font-bold text-white">GIÁ TRỊ CỐT LÕI</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-white font-bold">ĐẲNG CẤP</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING đem đến những sản phẩm và giải pháp đặc thù là minh chứng cho những giá trị vượt trội.
                  Trong quá trình sáng tạo, tôn vinh và nổi bật cho kiến trúc, kiến tạo không gian sống hoàn hảo.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">TÂM HUYẾT</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING luôn nỗ lực và đề cao tinh chuyên nghiệp, tận tâm và chân thành trong mọi hợp tác, đánh
                  giá cao tâm huyết cho từng sản phẩm để nâng cao chất lượng cũng như cảm xúc trong các dự án và khách
                  hàng.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">KHÁC BIỆT</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING luôn tìm kiếm các hướng đi riêng, những giải pháp đặc biệt cho từng dự án. Mỗi công trình
                  là một tiền đặc bản đặc may do mỗi cách cảm nhận và phù hợp với từng khách hàng.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">HIỆU QUẢ</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING trải qua nhiều năm đúc kết những giá trị, kinh nghiệm... nhằm mang đến những giải pháp
                  tối ưu, với những sản phẩm tốt nhất, công nghệ mới nhất, chi phí hợp nhất, đem lại giá trị và hiệu quả
                  cho công trình nói chung và khách hàng lớn đối tác.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative border-t border-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white mb-12 text-center md:text-left"
        >
          HOẠT ĐỘNG - GIẢI THƯỞNG
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-sm text-gray-300 leading-relaxed">
              Trong suốt quá trình hoạt động, IDA LIGHTING đã tham gia và hoàn thành nhiều dự án lớn trên toàn quốc.
              Chúng tôi tự hào đã có tác lần cày của nhiều kiến trúc sư, nhà thầu, và chủ đầu tư, cung cấp các giải pháp
              chiếu sáng đạt chuẩn quốc tế. Không chỉ cung cấp sản phẩm, chúng tôi còn tư vấn và thiết kế chiếu sáng
              theo yêu cầu, đảm bảo hiệu quả ánh sáng tối ưu cho từng không gian. Những thành tựu của IDA LIGHTING là
              minh chứng cho sự tận tâm và chuyên môn cao của chúng tôi trong ngành.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex justify-end">
                <div className="max-w-sm">
                  <p className="text-white text-right font-bold">Top 10 Sao Vàng thương hiệu Việt năm 2024</p>
                  <p className="text-sm text-gray-300 text-right">
                    Sự minh hỏa thành đạt chỉ tin cậy hàng đầu Việt Nam. Giải quyết những thức mắc, làm trỏ của các kiến
                    trúc sư trong việc tìm kiếm giải pháp chiếu sáng đặc biệt và gây ấn tượng.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full h-40 relative overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=160&width=400"
                alt="Award Ceremony 1"
                width={400}
                height={160}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 p-2">
                <p className="text-xs text-white">Giải pháp chiếu sáng cho Ashui Awards 2023</p>
                <p className="text-xs text-gray-400">Pavilion Ashui Awards tại Thành Cổ Vinh (Nghệ An)</p>
                <p className="text-xs text-gray-400">Do văn phòng MIA design studio thiết kế</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full h-40 relative overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=160&width=400"
                alt="Award Ceremony 2"
                width={400}
                height={160}
                className="object-cover w-full h-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full h-40 relative overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=160&width=400"
                alt="ASHUI AWARDS VIBE EXPO 2024"
                width={400}
                height={160}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 p-2">
                <p className="text-xs text-white">Giải pháp chiếu sáng cho Ashui Awards Vibe Expo 2024</p>
                <p className="text-xs text-gray-400">Do văn phòng MIA design studio thiết kế</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-500 mr-2"></div>
              <h3 className="text-xl font-bold text-white">DỊCH VỤ</h3>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-white font-bold">Tư vấn thiết kế chiếu sáng</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING mang đến các giải pháp thiết kế chiếu sáng chuyên nghiệp, phù hợp cho từng không gian
                  kiến trúc như: Nhà ở, Văn phòng, Khách sạn, Resort nghỉ dưỡng, Nhà hàng... và các công trình Công
                  cộng. Chúng tôi đảm bảo sự hài hòa giữa thẩm mỹ và công năng, tối ưu hóa ánh sáng để nâng cao trải
                  nghiệm và tiết kiệm năng lượng.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">Cung cấp giải pháp chiếu sáng toàn diện</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Chiếu sáng không đơn thuần là ánh sáng mà còn là cách chúng ta kiểm soát và sử dụng ánh sáng như thế
                  nào để phục vụ - hướng chiếu sáng mục đích mình nhất. IDA cung cấp mọi giải pháp tổng thể cho công
                  trình và hướng thích với các ngành nghề đều thiết kế tiên mới nhất hiện nay.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">Bespoke lighting</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA làm chủ được công nghệ sản xuất, lắp ráp tại Trung Quốc, các nước Châu Âu như Đức, Czech... và lựa
                  chọn các nhà hiệu cung cấp linh kiện - phụ kiện hàng đầu thế giới, không chỉ mang lại những sản phẩm
                  chất lượng cao mà chỉ phí phù hợp với thị trường Việt Nam, đáp ứng nhu cầu cá nhân hóa ngày càng được
                  giá trị hóa lựa chọn.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold">Cung cấp thiết bị chiếu sáng</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  IDA LIGHTING mang đến những dòng sản phẩm đa dạng, đáp ứng đầu vào nhu cầu chiếu sáng cho nhiều không
                  gian khác nhau. Luôn lựa chọn và mang đến cho khách hàng những sản phẩm và liệu chất:
                </p>
                <ul className="text-sm text-gray-300 space-y-1 pl-4">
                  <li>- Cùng mới nhất đáng tin cậy nhất hiệu nhất.</li>
                  <li>- Cùng mới chỉ phí thì chất lượng cao nhất.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-500 mr-2"></div>
              <h3 className="text-xl font-bold text-white">THẾ MẠNH SẢN PHẨM</h3>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full relative"
              >
                <Image
                  src="/placeholder.svg?height=200&width=500"
                  alt="LED Module Downlight"
                  width={500}
                  height={200}
                  className="object-contain w-full"
                />
                <p className="text-center text-sm text-gray-400 mt-2">HỆ THỐNG LED MODULE DOWNLIGHT</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full relative mt-8"
              >
                <Image
                  src="/placeholder.svg?height=200&width=500"
                  alt="Lighting Components"
                  width={500}
                  height={200}
                  className="object-contain w-full"
                />
                <div className="flex justify-around mt-4">
                  <p className="text-center text-sm text-gray-400">CHÓA</p>
                  <p className="text-center text-sm text-gray-400">CHIP LED</p>
                  <p className="text-center text-sm text-gray-400">NGUỒN</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
