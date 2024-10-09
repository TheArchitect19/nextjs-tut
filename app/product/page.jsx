import axios from "axios";
import { baseURL,time } from "../config";
import ProductPage from "./ProductPage";

const productSsr = async () => {
  try {
    const response = await fetch(`${baseURL}product`,{ next: { revalidate: time } });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

export default async function Page() {
  const productData = await productSsr();

  return <ProductPage data={productData} />;
}
