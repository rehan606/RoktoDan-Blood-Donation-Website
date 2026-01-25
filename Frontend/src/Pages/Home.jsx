
import { useOutletContext } from 'react-router';
import Hero from '../components/HomeComponents/Hero'
import WhyDonateBlood from '../components/HomeComponents/WhyDonateBlood';
import Statistics from '../components/HomeComponents/Statistics';

const Home = () => {
    const { language } = useOutletContext();

    return (
        <div>
            <Hero language={language} />
            <WhyDonateBlood language={language} />
            <Statistics language={language} />
        </div>
    )
}

export default Home
