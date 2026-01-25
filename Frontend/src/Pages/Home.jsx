
import { useOutletContext } from 'react-router';
import Hero from '../components/HomeComponents/Hero'
import WhyDonateBlood from '../components/HomeComponents/WhyDonateBlood';
import Statistics from '../components/HomeComponents/Statistics';
import HowItWorks from '../components/HomeComponents/HowItWorks';

const Home = () => {
    const { language } = useOutletContext();

    return (
        <div>
            <Hero language={language} />
            <WhyDonateBlood language={language} />
            <Statistics language={language} />
            <HowItWorks language={language} />
        </div>
    )
}

export default Home
