
import { useOutletContext } from 'react-router';
import Hero from '../../components/HomeComponents/Hero'
import WhyDonateBlood from '../../components/HomeComponents/WhyDonateBlood';
import Statistics from '../../components/HomeComponents/Statistics';
import HowItWorks from '../../components/HomeComponents/HowItWorks';
import DonorRegistration from '../../components/HomeComponents/DonorRegistration';
import UrgentBloodRequests from '../../components/HomeComponents/UrgentBloodRequests';
import Testimonials from '../../components/HomeComponents/Testimonials';

const Home = () => {
    const { language } = useOutletContext();

    return (
        <div>
            <Hero language={language} />
            <WhyDonateBlood language={language} />
            <Statistics language={language} />
            <HowItWorks language={language} />
            <DonorRegistration language={language} />
            <UrgentBloodRequests language={language} />
            <Testimonials language={language} />

        </div>
    )
}

export default Home
