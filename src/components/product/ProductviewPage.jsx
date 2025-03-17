import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import ProductDetails from "./ProductDetails";
import ProductView from "./ProductView";
import RelatedProduct from "./RelatedProduct";


const ProductviewPage = () => {

    return (
      <>
      <Navbar/>
      <ProductView/>
      <ProductDetails/>
      <RelatedProduct/>
      <Footer/>
      </>
    )
  
}
export default ProductviewPage;
