import { HomePage } from "./pages/HomePage.jsx";
import { ThemeProvider } from "./contexts/index.js";
import "./globals.css";
import axios from "axios";
import { baseURL,time } from "./config";




const homeSsr = async () => {
  try {
    const response = await fetch(`${baseURL}home`, { next: { revalidate: time } });
    const testimonialData = await fetch(`${baseURL}testimonial/`,{ next: { revalidate: time } });

    if (!response.ok || !testimonialData.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const testimonial = await testimonialData.json();
    return { data, testimonial };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

export default async function Home() {
  const homeData = await homeSsr();
  return <HomePage data={homeData} />;
}
