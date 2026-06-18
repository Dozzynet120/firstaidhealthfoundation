import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import ImpactSection from "../components/ImpactSection";
import ProgramsSection from "../components/ProgramsSection";
import DonationSection from "../components/DonationSection";
import BlogPreview from "../components/BlogPreview";
import FAQSection from "../components/FAQSection";
import GalleryPreview from "../components/GalleryPreview";
import ReviewsSection from "../components/ReviewsSection";
import ContactSection from "../components/ContactSection";
import WhatWeDoSection from "../components/WhatWeDoSection";
import OurWorkInAction from "../components/OurWorkInAction";
import WeCollaborateSection from "../components/WeCollaborateSection";
import WhatPeopleSayAboutUs from "../components/WhatPeopleSayAboutUs";
import Reveal from "../components/Reveal";

import { Helmet } from "react-helmet-async";

export default function Home() {
   return (
      <>
         {/* SEO */}
         <Helmet>
            <title>RightAid Health Foundation | Saving Lives Across Nigeria</title>
            <meta
               name="description"
               content="RightAid Health Foundation provides free medical outreach, surgical assistance, and healthcare support to underserved communities across Nigeria."
            />
            <meta name="keywords" content="NGO Nigeria, healthcare charity, medical outreach Nigeria, free surgery Nigeria, donate health foundation" />
         </Helmet>

         <div>
            <Reveal><Hero /></Reveal>
            <Reveal><AboutPreview /></Reveal>
            <Reveal><ImpactSection /></Reveal>
            <Reveal><ProgramsSection /></Reveal>
            <Reveal><DonationSection /></Reveal>
            <Reveal><WhatWeDoSection /></Reveal>
            <Reveal><OurWorkInAction /></Reveal>
            <Reveal><WeCollaborateSection /></Reveal>
            <Reveal><WhatPeopleSayAboutUs /></Reveal>
            <Reveal><BlogPreview /></Reveal>
            <Reveal><FAQSection /></Reveal>
            <Reveal><GalleryPreview /></Reveal>
            <Reveal><ReviewsSection /></Reveal>
            <Reveal><ContactSection /></Reveal>
         </div>
      </>
   );
}