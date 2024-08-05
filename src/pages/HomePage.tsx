import AOS from "aos";
import "aos/dist/aos.css";
import "@scss/homepage.scss";
import KiaIntro from "@videos/kiaaboutvideopri.mp4";
import KiaSecPic from "@pictures/carpixel.net-2024-kia-seltos-us-117120-hd.jpg";
import KiaThirdPic from "@pictures/ab3.jpg";

const Homepage = () => {
  AOS.init();
  return (
    <div>
      <div className="homepage-page-body">
        <div className="homepage-page-intro">
          <video
            style={{
              width: "100%",
              height: "100%",
            }}
            autoPlay
            muted
            loop
          >
            <source src={KiaIntro} type="" />
          </video>
          <p>Không ngừng khám phá, khơi nguồn cảm hứng</p>
          <span>Câu chuyện thương hiệu</span>
        </div>
        <div className="homepage-page-info">
          <img
            src={KiaSecPic}
            alt="kia seltos"
            style={{ width: "100%", height: "100%" }}
          />
          <span>Không ngừng khám phá, khơi nguồn cảm hứng</span>
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-anchor-placement="center-center"
          >
            <p>
              Ý tưởng chỉ lộ diện khi ta bước khỏi vùng an toàn, Khơi gợi những
              cung bậc cảm xúc mới và mở ra góc nhìn hoàn toàn khác biệt. Chúng
              chỉ được tạo ra bởi những ai dám theo đuổi đam mê và không ngừng
              khám phá. <br />
              <br /> Thông qua những sáng tạo truyền cảm hứng, Kia sẽ luôn là
              người bạn đồng hành trong suốt hành trình tìm đến ý tưởng – khởi
              nguồn của sự sáng tạo.
            </p>
          </div>
        </div>
        <div className="home-page-pre">
          <div data-aos="fade-up" data-aos-duration="2000">
            <img src={KiaThirdPic} alt="" />
          </div>
          <div data-aos="fade-up" data-aos-duration="3000">
            {" "}
            <p>
              Ý tưởng là thành quả của một quá trình vận hành không ngừng giữa
              tâm trí và thể chất. Không đơn thuần chỉ là suy nghĩ, nguồn cảm
              hứng được tạo ra khi ý tưởng gắn liền với cảm xúc để tạo nên những
              điều không tưởng.
            </p>
            <p>
              Hơn cả một phương tiện di chuyển thông thường, Kia chính là người
              bạn đồng hành mang đến không gian và thời gian cho những cảm hứng
              được khai mở.
            </p>
          </div>
        </div>
        <button className="know-more">Tìm hiểu thêm</button>
      </div>
    </div>
  );
};

export default Homepage;
