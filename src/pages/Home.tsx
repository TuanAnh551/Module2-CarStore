import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "@scss/home.scss";
import { useEffect, useState } from "react";
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="home-page">
      <Header></Header>
      <div className="homepage-page-body">
        <Outlet></Outlet>
        {isVisible && (
          <button onClick={scrollToTop} style={styles.backToTopButton}>
            Back to Top
          </button>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
const styles = {
  backToTopButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    cursor: "pointer",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    fontWeight: "700",
  },
};
