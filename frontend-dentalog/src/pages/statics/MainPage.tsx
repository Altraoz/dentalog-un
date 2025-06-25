import Navbar from '../../components/statics/navbar/Navbar';
import AboutUs from '../../components/statics/about_us/AboutUs';
import SomeOfOurServices from '../../components/statics/SomeOfOurServices/SomeOfOurServices';

export default function MainPage() {
    return (
        <>
            <Navbar />
            <AboutUs />
            <SomeOfOurServices />
        </>
    );
}