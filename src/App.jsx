import React from "react";
import Card from "./Card";
import styles from "./App.module.css";

const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
];

const App = () => {
    const [products, setProducts] = React.useState([]);
    const [category, setCategory] = React.useState("all");
    const [priceFilter, setPriceFilter] = React.useState("");
    const [ratingFilter, setRatingFilter] = React.useState("");

    React.useEffect(() => {
        let url;
        if (category === "all") url = "https://dummyjson.com/products?limit=0";
        else url = `https://dummyjson.com/products/category/${category}`;
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data.products);
            setPriceFilter("");
            setRatingFilter("");
        };
        fetchData();
    }, [category]);

    React.useEffect(() => {
        if (!priceFilter) {
            return;
        } else if (priceFilter === "lth") {
            const data = [...products].sort((a, b) => a.price - b.price);
            setProducts(data);
            setRatingFilter("");
        } else {
            const data = [...products].sort((a, b) => b.price - a.price);
            setProducts(data);
            setRatingFilter("");
        }
    }, [priceFilter]);

    React.useEffect(() => {
        if (!ratingFilter) {
            return;
        } else if (ratingFilter === "lth") {
            const data = [...products].sort((a, b) => a.rating - b.rating);
            setProducts(data);
            setPriceFilter("");
        } else {
            const data = [...products].sort((a, b) => b.rating - a.rating);
            setProducts(data);
            setPriceFilter("");
        }
    }, [ratingFilter]);

    return (
        <React.Fragment>
            <div className={styles.home}>
                <h1>DummyJSON API e-commerce</h1>
                <div className={styles.filters}>
                    <select
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        value={category}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                    <select
                        value={priceFilter}
                        onChange={(e) => {
                            setPriceFilter(e.target.value);
                        }}
                    >
                        <option value="">Prices</option>
                        <option value="lth">Low to High</option>
                        <option value="htl">High to Low</option>
                    </select>
                    <select
                        value={ratingFilter}
                        onChange={(e) => {
                            setRatingFilter(e.target.value);
                        }}
                    >
                        <option value="">Ratings</option>
                        <option value="lth">Low to High</option>
                        <option value="htl">High to Low</option>
                    </select>
                </div>
            </div>
            <div className={styles.cards}>
                {products.map((p) => {
                    return <Card props={p} key={p.id} />;
                })}
            </div>
        </React.Fragment>
    );
};

export default App;
