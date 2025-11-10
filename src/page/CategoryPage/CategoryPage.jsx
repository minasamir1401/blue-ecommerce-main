import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import "./categorypage.css";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

function CategoryPage() {
  const { t } = useTranslation();
  const { category } = useParams();

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await res.json();
        setCategoryProducts(data.products || []);
        
        // Fetch category name
        const categoriesRes = await fetch('https://dummyjson.com/products/categories');
        const categoriesData = await categoriesRes.json();
        const foundCategory = categoriesData.find(cat => cat.slug === category);
        setCategoryName(foundCategory?.name || category);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [category]);

  return (
    <PageTransition key={category}>
      <div className="category-page">
        {loading ? (
          <SlideProductLoading key={category} />
        ) : (
          <div className="container">
            <div className="category-page__header">
              <h1 className="category-page__title">{categoryName}</h1>
              <p className="category-page__description">
                {t('category.discoverCategory')} {categoryName}
              </p>
              <p className="category-page__count">
                {categoryProducts.length} {t('category.productsAvailable')}
              </p>
            </div>

            {categoryProducts.length > 0 ? (
              <div className="category-page__products">
                {categoryProducts.map((item) => (
                  <ProductCard item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="category-page__empty">
                <p>{t('category.noProductsInCategory')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default CategoryPage;
