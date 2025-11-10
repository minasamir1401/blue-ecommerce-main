import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HeroSlider from "../../components/HeroSlider";
import ProductSlider from "../../components/common/ProductSlider/ProductSlider";
import CategorySlider from "../../components/common/CategorySlider/CategorySlider";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";
import "./home.css";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

function Home() {
  const { t } = useTranslation();
  const [products, setProducts] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();
            return { [category]: data.products };
          })
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const data = await res.json();
        setAllCategories(data.slice(0, 12));
      } catch (error) {
        console.error("Error Fetching Categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <PageTransition>
      <div className="home-page">
        <HeroSlider />

        {!categoriesLoading && allCategories.length > 0 && (
          <CategorySlider categories={allCategories} />
        )}

        {loading
          ? categories.map((category) => <SlideProductLoading key={category} />)
          : categories.map((category) => (
              <ProductSlider
                key={category}
                data={products[category] || []}
                title={category.replace("-", " ")}
                description={t('home.discoverProducts')}
              />
            ))}
      </div>
    </PageTransition>
  );
}

export default Home;
