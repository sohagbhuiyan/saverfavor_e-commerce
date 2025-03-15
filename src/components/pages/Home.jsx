
import Navbar from "../navbar/Navbar";
import Categories from "../body/Categories";
import Slider from "../body/Slider";
import Collections from "../body/collection/Collections";
import Footer from "../footer/Footer";

const Home = ()=> {

    return (
        <>
        <Navbar/>
        <Slider/>
        <Categories/>
        <Collections/>
        <Footer/>
        </>
      );
    }
    
    export default Home;
