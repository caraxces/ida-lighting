"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedTitle from "@/components/animated-title"

export default function PartnershipPolicy() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-r from-black via-black to-[#8B2323] text-white pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedTitle className="text-center italic">
            Chính Sách Hợp Tác
          </AnimatedTitle>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert max-w-none md:prose-lg lg:prose-xl mx-auto bg-black/20 p-6 md:p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#FFDAB9]">
              CHÍNH SÁCH DÀNH CHO CÔNG TY THIẾT KẾ, KIẾN TRÚC SƯ, NHÀ THẦU VÀ ĐỐI TÁC THI CÔNG
            </h2>
            
            <div className="text-gray-300 mb-6 space-y-4">
              <p>
                Với mong muốn mở rộng quy mô kinh doanh ngày càng rộng khắp tại miền Bắc nói riêng và toàn quốc nói chung, 
                IDA LIGHTING mong muốn có thể hợp tác cùng quý ĐỐI TÁC để khách hàng có thể tiếp cận với sản phẩm của mình một cách dễ dàng hơn.
              </p>
              <p>
                Chúng tôi cũng hiểu rằng mọi người sẽ là cầu nối hữu ích nhất để giúp mỗi sản phẩm của IDA tiếp cận dễ dàng hơn với khách hàng, 
                và IDA cũng hy vọng có thể góp phần tối ưu hóa được ý tưởng cũng như sản phẩm của Quý ĐỐI TÁC. 
                Cả hai cùng hợp tác, bổ trợ để dịch vụ thiết thực nhất khi tiếp cận với khách hàng.
              </p>
            </div>

            <motion.h2 
              custom={1}
              variants={fadeIn}
              initial="hidden"
              animate={isClient ? "visible" : "hidden"}
              className="text-2xl md:text-3xl font-semibold mb-6 text-[#FFDAB9]"
            >
              QUY ĐỊNH CHUNG
            </motion.h2>
            
            <motion.div 
              custom={2}
              variants={fadeIn}
              initial="hidden"
              animate={isClient ? "visible" : "hidden"}
              className="text-gray-300 mb-6 space-y-4"
            >
              <p>Để đảm bảo tính công bằng, minh bạch và rõ ràng trong chính sách giá bán đối với các đơn vị đối tác chúng tôi có 1 số quy định sau:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mỗi K.H khi trở thành đối tác của chúng tôi sẽ được cung cấp 1 Mã Số riêng</li>
                <li><strong>Đối với Công Ty Thiết Kế & Thi Công:</strong> cung cấp cho chúng tôi MÃ SỐ THUẾ của công ty và được chiết khấu theo Chính Sách Đối Tác ngay đơn hàng đầu tiên.</li>
                <li><strong>Đối với Kiến Trúc Sư & CTV:</strong> Được hưởng chính sách chiết khấu từ đơn hàng thứ 2 (Đối với đơn hàng thứ nhất vẫn được chiết khấu bình thường, nhưng sẽ tạm giữ lại và giảm trừ trực tiếp vào giá bán đơn hàng thứ 2. Nhằm đảm bảo tính công bằng khi khách hàng lẻ(có thể của chính KTS đó) chỉ mua 1 lần và cũng muốn hưởng Chính Sách Đối Tác)</li>
              </ul>
            </motion.div>

            <motion.h2 
              custom={3}
              variants={fadeIn}
              initial="hidden"
              animate={isClient ? "visible" : "hidden"}
              className="text-2xl md:text-3xl font-semibold mb-6 text-[#FFDAB9]"
            >
              LỢI ÍCH KHI TRỞ THÀNH ĐỐI TÁC
            </motion.h2>
            
            <motion.div 
              custom={4}
              variants={fadeIn}
              initial="hidden"
              animate={isClient ? "visible" : "hidden"}
              className="text-gray-300 mb-6 space-y-4"
            >
              <ul className="list-disc pl-6 space-y-2">
                <li>KTS và công ty Nội Thất sẽ được hưởng chiết khấu từ 20% trở lên trên mỗi đơn hàng</li>
                <li>Áp dụng chính sách cộng dồn doanh số và tăng chiết khấu đối với những đối tác phát sinh nhiều hơn 1 đơn hàng mỗi tháng</li>
                <li>Với những đơn hàng có giá trị lớn chúng tôi sẽ thỏa thuận và có mức chiết khấu ưu đãi riêng cho phía đối tác</li>
                <li>Được cung cấp các tài liệu, model thiết kế miễn phí với hầu hết tất cả các sản phẩm mà chúng tôi kinh doanh</li>
              </ul>
            </motion.div>

            <AnimatedTitle delay={0.5} className="text-center italic">
              CHÍNH SÁCH HỢP TÁC
            </AnimatedTitle>
            
            <motion.div 
              custom={6}
              variants={fadeIn}
              initial="hidden"
              animate={isClient ? "visible" : "hidden"}
              className="text-gray-300 mb-6 space-y-6"
            >
              <p>Chính sách hoa hồng dành cho kiến trúc sư và các đơn vị thiết kế, xây dựng của IDA LIGHTING như sau:</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#FFE4C4] mb-4">1. Đối với đèn giải pháp indoor, outdoor và đèn trang trí IDA LIGHTING</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#8B2323]/30">
                        <th className="border border-gray-600 px-4 py-2 text-left">STT</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Chiết khấu theo bậc thang lũy tiến</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Mức hoa hồng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">1</td>
                        <td className="border border-gray-600 px-4 py-2">50 triệu đầu tiên</td>
                        <td className="border border-gray-600 px-4 py-2">15%</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">2</td>
                        <td className="border border-gray-600 px-4 py-2">50 triệu tiếp theo</td>
                        <td className="border border-gray-600 px-4 py-2">17%</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">3</td>
                        <td className="border border-gray-600 px-4 py-2">100 triệu tiếp theo</td>
                        <td className="border border-gray-600 px-4 py-2">18%</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">4</td>
                        <td className="border border-gray-600 px-4 py-2">300 triệu tiếp theo</td>
                        <td className="border border-gray-600 px-4 py-2">20%</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">5</td>
                        <td className="border border-gray-600 px-4 py-2">Trên 500 triệu</td>
                        <td className="border border-gray-600 px-4 py-2">22%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-[#8B2323]/20 rounded-lg">
                  <h4 className="text-lg font-medium text-[#FFE4C4] mb-3">Ví dụ đơn hàng 700.000.000 triệu</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="hover:bg-white/5">
                          <td className="border border-gray-600 px-4 py-2">50 triệu đầu tiên</td>
                          <td className="border border-gray-600 px-4 py-2">Ck 15%</td>
                          <td className="border border-gray-600 px-4 py-2">=50.000.000 * 15% = 7.500.000</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="border border-gray-600 px-4 py-2">50 triệu tiếp theo</td>
                          <td className="border border-gray-600 px-4 py-2">Ck 17%</td>
                          <td className="border border-gray-600 px-4 py-2">=50.000.000 * 17% = 8.250.000</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="border border-gray-600 px-4 py-2">100 triệu tiếp theo</td>
                          <td className="border border-gray-600 px-4 py-2">Ck 18%</td>
                          <td className="border border-gray-600 px-4 py-2">=100.000.000 * 18% = 18.150.000</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="border border-gray-600 px-4 py-2">300 triệu tiếp theo</td>
                          <td className="border border-gray-600 px-4 py-2">Ck 20%</td>
                          <td className="border border-gray-600 px-4 py-2">=300.000.000 * 20% = 59.895.000</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="border border-gray-600 px-4 py-2">200 triệu tiếp theo</td>
                          <td className="border border-gray-600 px-4 py-2">Ck 22%</td>
                          <td className="border border-gray-600 px-4 py-2">=200.000.000 * 22% = 44.000.000</td>
                        </tr>
                        <tr className="bg-[#8B2323]/30 font-medium">
                          <td className="border border-gray-600 px-4 py-2">Tổng đơn 700 triệu</td>
                          <td className="border border-gray-600 px-4 py-2"></td>
                          <td className="border border-gray-600 px-4 py-2">Tổng chiết khấu 137.795.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#FFE4C4] mb-4">2. Đối với các loại đèn hãng Châu Âu</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#8B2323]/30">
                        <th className="border border-gray-600 px-4 py-2 text-left">STT</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Chiết khấu theo bậc thang lũy tiến</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Mức hoa hồng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">1</td>
                        <td className="border border-gray-600 px-4 py-2">200 triệu đầu tiên</td>
                        <td className="border border-gray-600 px-4 py-2">3%</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">2</td>
                        <td className="border border-gray-600 px-4 py-2">300 triệu tiếp theo</td>
                        <td className="border border-gray-600 px-4 py-2">5%</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">3</td>
                        <td className="border border-gray-600 px-4 py-2">500 triệu tiếp theo</td>
                        <td className="border border-gray-600 px-4 py-2">7%</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="border border-gray-600 px-4 py-2">4</td>
                        <td className="border border-gray-600 px-4 py-2">Từ 1 tỷ trở lên</td>
                        <td className="border border-gray-600 px-4 py-2">8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-4">
                <p>Chiết khấu thực tế sẽ được tính dựa trên giá trị của hợp đồng dự án không bao gồm thuế GTGT và các giảm giá (nếu có) cho khách hàng.</p>
                <p>IDA LIGHTING hỗ trợ thiết kế chiếu sáng, và báo giá sản phẩm, và các biện pháp hỗ trợ tốt nhất dành cho đối tác.</p>
                <p>Công ty IDA LIGHTING sẽ thanh toán chiết khấu đồng thời với tiến độ thanh toán của Khách Hàng, hoặc thanh toán một lần sau khi Khách Hàng đã hoàn tất việc thanh toán và nhận hàng đầy đủ, kết thúc hợp đồng.</p>
                <p>Công ty IDA LIGHTING sẽ trừ tiền thuế TNCN theo luật thuế TNCN hiện hành (nếu có).</p>
                <p>Đối tác có quyền chuyển một phần hoặc toàn chiết khấu để giảm trừ trực tiếp trên giá trị đơn hàng.</p>
              </div>
            </motion.div>

            <div className="mt-12 text-right text-gray-300 italic">
              <p>……. Ngày ….. tháng ….. năm …….</p>
              <p className="mt-2 font-medium">Đại diện IDA Lighting</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
