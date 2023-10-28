import {
  BrowserRouter,
  Route,
  Redirect,
  Link,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

type Item = {
  title: string;
};
type Category = {
  category_id: string;
  category_name: string;
};

export const ItemList = () => {
  const { lesson_id, category_id, order } = useParams<{
    lesson_id: string;
    category_id: string;
    order: string;
  }>();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const lesson_name = query.get("lesson_name");

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/categories",
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch item categories: ${res.status}`);
      }

      const categories: Category[] = await res.json();
      setCategories(categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>{lesson_name}</h2>
      {categories.map((category) => (
        <div>
          <Link
            to={`/items/${lesson_id}/${category.category_id}/registration_order?lesson_name=${lesson_name}`}
          >
            {category.category_name}
          </Link>
        </div>
      ))}
    </div>
  );
};
