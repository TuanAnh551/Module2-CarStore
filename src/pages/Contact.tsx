import "@scss/contact.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import RoomIcon from "@mui/icons-material/Room";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import KiaFirstPic from "@pictures/kia-k3-premium-2eeupf7.jpg";
import KiaSecPic from "@pictures/640-den-sau-xe-kia-seltos.jpg";
import KiaThirdPic from "@pictures/cum-man-hinh-thong-tin-optimized.jpg";
const Contact = () => {
  AOS.init();
  return (
    <div className="wrapper">
      <h1
        style={{
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "30px",
        }}
      >
        Contact
      </h1>
      <div className="line"></div>
      <span>KẾT NỐI VỚI CHÚNG TÔI</span>
      <div className="container">
        <div
          className="container-item"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <img src={KiaFirstPic} alt="" />
        </div>
        <div
          className="container-item-info"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          <RoomIcon
            style={{
              color: "rgb(186, 180, 180)",
              fontSize: "100px",
            }}
          />
          <h2>Địa chỉ</h2>
          <p>Địa chỉ: 387-389 Nguyễn Văn Cừ, P.4, Q.5, TP.HCM</p>
        </div>
        <div
          className="container-item"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          {" "}
          <img src={KiaSecPic} alt="" />
        </div>
        <div
          className="container-item-info"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          <LocalPhoneIcon
            style={{
              color: "rgb(186, 180, 180)",
              fontSize: "100px",
            }}
          ></LocalPhoneIcon>
          <h2>Điện Thoại</h2>
          <p>Hotline: 1900 1001</p>
        </div>
        <div
          className="container-item"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <img src={KiaThirdPic} alt="" />
        </div>
        <div
          className="container-item-info"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          <EmailIcon
            style={{
              color: "rgb(186, 180, 180)",
              fontSize: "100px",
            }}
          ></EmailIcon>
          <h2>Email</h2>
          <p>AnhTuan@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
