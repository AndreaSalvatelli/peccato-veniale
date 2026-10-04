import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VenueSection from '@/components/VenueSection';
import RecruitmentSection from '@/components/RecruitmentSection';
import HousingSection from '@/components/HousingSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import GallerySection from '@/components/GallerySection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import SocialSection from '@/components/SocialSection';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';
import AnnouncementPopup from '@/components/AnnouncementPopup';
export default function Home(){return <><a className="skip-link" href="#main">Vai al contenuto</a><Header/><main id="main"><div id="top"/><Hero/><VenueSection/><RecruitmentSection/><HousingSection/><HowItWorksSection/><GallerySection/><FaqSection/><ContactSection/><SocialSection/></main><Footer/><MobileCTA/><AnnouncementPopup/></>}
