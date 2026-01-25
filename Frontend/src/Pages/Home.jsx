
import { useOutletContext } from 'react-router';
import Hero from '../components/HomeComponents/Hero'

const Home = () => {
    const { language } = useOutletContext();

    return (
        <div>
            <Hero language={language} />
        </div>
    )
}

export default Home
