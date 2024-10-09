import "swiper/css";
import "swiper/css/effect-coverflow";
import "../pages/swiperStyle.css";
import "swiper/css/pagination";
import { useSidebar } from "../contexts/index.js";
import { baseURL,time } from "../config";
import axios from "axios";

import AboutPage from "./AboutPage";

const aboutSsr = async () => {
  try {
    const response = await fetch(`${baseURL}about`, { next: { revalidate: time } });
    const testimonialData = await fetch(`${baseURL}testimonial/`, { next: { revalidate: time } });

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

export default async function Page() {
  const aboutData = await aboutSsr();

  return <AboutPage aboutData={aboutData} />;
}
