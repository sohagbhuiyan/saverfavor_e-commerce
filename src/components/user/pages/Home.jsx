
import Categories from "../../user/body/Categories";
import HeroSection from "../body/HeroSection";
import Collections from "../../user/body/collection/Collections";
import UserInfo from "../body/UserInfo";

const Home = ()=> {

    return (
        <>
        <HeroSection/>
        <UserInfo/>
        <Categories/>
        <Collections/>
        </>
      );
    }
    
    export default Home;
