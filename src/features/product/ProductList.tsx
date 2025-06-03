import React, { useEffect, useState } from "react";
import axios from "axios";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    buyCount: number;
};

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then((res) => {
                setProducts(res.data); // הנתונים הגיעו
                setLoading(false);     // ✔️ כאן הייתה הבעיה
                console.log("resdata:", res.data)
            })
            .catch((err) => {
                setError("שגיאה בטעינת מוצרים");
                setLoading(false);     // גם במקרה של שגיאה
                console.error("שגיאה בטעינת מוצרים:", err);
            });
    }, []);

    console.log('products in render:', products);

    if (loading) return <p>טוען מוצרים...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {products.length === 0 ? (
                <p>אין מוצרים להצגה</p>
            ) : (
                products.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>מחיר: {product.price} ₪</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductsList;
