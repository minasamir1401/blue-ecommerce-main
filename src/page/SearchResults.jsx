import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SlideProductLoading from "../components/slideProducts/SlideProductLoading";
import ProductCard from "../components/common/ProductCard/ProductCard";
import "./SearchResults.css";

function SearchResults() {
  const { t } = useTranslation();
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("query");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <PageTransition key={query}>
      <div className="search-results-page">
        {loading ? (
          <SlideProductLoading key={query} />
        ) : results.length > 0 ? (
          <div className="container">
            <div className="search-results-page__header">
              <h1>{t('search.searchResults')}</h1>
              <p>
                {t('search.foundProducts')} {results.length} {t('search.productsFor')} "{query}"
              </p>
            </div>

            <div className="search-results-page__products">
              {results.map((item) => (
                <ProductCard item={item} key={item.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="search-results-page__empty">
              <p>{t('search.noResults')} "{query}"</p>
              <a href="/" className="btn">{t('search.browseAllProducts')}</a>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default SearchResults;
