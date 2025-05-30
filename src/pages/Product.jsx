import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
// import api from "../api";
// import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(
    products.filter((item) => parseInt(item.id) === parseInt(id))[0]
  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedProduct(
      products.filter((item) => parseInt(item.id) === parseInt(id))[0]
    );
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === selectedProduct?.category &&
          item.id !== selectedProduct?.id
      )
    );
  }, [selectedProduct, id]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

// const Product = () => {
//   const { id } = useParams();
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//             console.log("Fetching product with ID:", id);

//         const response = await axios.get(`axios.get('http://localhost:5000/products/${id}`);
//         setSelectedProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     const fetchRelatedProducts = async () => {
//       try {
    
//         const response = await axios.get("/products");
//         const products = Array.isArray(response.data) ? response.data : [];
//         setRelatedProducts(
//           products.filter(
//             (item) =>
//               item.category === selectedProduct?.category &&
//               item.id !== selectedProduct?.id
//           )
//         );
//       } catch (error) {
//         console.error("Error fetching related products:", error);
//       }
//     };

//     fetchProduct();
//     fetchRelatedProducts();
//   }, [id, selectedProduct?.category, selectedProduct?.id]);

//   useWindowScrollToTop();

//   return (
//     <Fragment>
//       <Banner title={selectedProduct?.productName} />
//       <ProductDetails selectedProduct={selectedProduct} />
//       <ProductReviews selectedProduct={selectedProduct} />
//       <section className="related-products">
//         <Container>
//           <h3>You might also like</h3>
//         </Container>
//         <ShopList productItems={relatedProducts} />
//       </section>
//     </Fragment>
//   );
// };

export default Product;

