
import Categories from "../../user/body/Categories";
import HeroSection from "../body/HeroSection";
import Collections from "../../user/body/collection/Collections";
import UserInfo from "../body/UserInfo";
import BrandSection from "../body/BrandSection";

const Home = ()=> {

    return (
        <>
        <HeroSection/>
        <UserInfo/>
        <Categories/>
        <Collections classname = " mb-2 "/> <hr/>
        <BrandSection/>
        </>
      );
    }
    
    export default Home;
