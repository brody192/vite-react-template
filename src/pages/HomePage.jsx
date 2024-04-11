import OpeningHours from "../components/OpeningHours.jsx";
import { Link } from "react-router-dom";
import GoogleMap from "../components/GoogleMap.jsx";
import NewsAndInformation from "../components/NewsAndInformation.jsx";
import FeaturedProducts from "@/components/FeaturedProducts.jsx";

function HomePage() {
    return (
        <div className="p-8 bg-boulangerie-main" style={{backgroundColor: '#f5f5f5'}}>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center mb-2" style={{color: '#8c4322'}}>Welcome to The Wee
                    Boulangerie!</h1>
                <p className="text-lg text-center" style={{color: '#8c4322'}}>We are a genuine artisan bakery in the
                    heart of Edinburgh’s Southside.</p>
            </div>

            <FeaturedProducts/>
            <hr style={{border: 'none', borderBottom: '2px solid #8c4322', margin: '2rem auto', width: '50%'}}/>
            <section className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-boulangerie-main w-full text-center">About Us</h2>
                <div className="md:flex-row md:items-start mx-8">

                    <p className="text-lg">
                        <img src="/RealBreadLogo.png" alt="Real Bread Campaign Logo"
                             className="md:mr-4 mb-4 md:mb-0 rounded-2xl shadow-md"
                             style={{maxWidth: '200px', float: 'left', marginRight: '1rem', marginBottom: '1rem'}}/>
                        The Real Bread Campaign’s mission is to find and share ways to make bread better for us,
                        better for our communities and better for the planet. We support them with all our
                        heart!<br/><br/>
                        It is at times difficult to distinguish marketing spin from what is really on offer when it
                        comes to bread. A lot of additives and processing aids need not be mentioned on labels.
                        There is
                        no legal definition of “artisan”, “sourdough” and many other terms. There is not restriction
                        on
                        the processes used to make the bread, or their continuity.
                        <br/><br/>
                        In contrast, the Real Bread Campaign proposes a comprehensive definition of “Real Bread”,
                        see <a href="https://www.sustainweb.org/realbread/what_is_real_bread/"
                               className="text-boulangerie-main hover:no-underline hover:text-boulangerie-main-hover hover:font-bold"
                               target="_blank"
                               rel="noreferrer">
                        What is Real Bread?
                    </a> Our bread is Real Bread, and now you know exactly what you are eating.
                    </p>


                </div>
                <div className="text-center mt-5">
                    <Link to="/about"
                          className="mt-10 bg-boulangerie-main text-white px-4 py-2 rounded hover:bg-boulangerie-main-hover transition"
                          style={{borderColor: '#8c4322'}}>
                        Learn more
                    </Link>
                </div>
            </section>

            <hr style={{border: 'none', borderBottom: '2px solid #8c4322', margin: '2rem auto', width: '50%'}}/>
            <section className="mb-8">
                {/* Display the News and Information Component */}
                <NewsAndInformation/>
            </section>

            <hr style={{border: 'none', borderBottom: '2px solid #8c4322', margin: '2rem auto', width: '50%'}}/>
            <section className="flex flex-wrap items-center justify-center">
                <div className="w-full md:w-1/2 text-center">
                    <OpeningHours/>
                    <div className="mt-4">
                    `<Link to="/contact"
                          className="bg-boulangerie-main text-white px-4 py-2 rounded hover:bg-boulangerie-main-hover transition"
                          style={{borderColor: '#8c4322' }}>
                        Learn more
                    </Link>`
                    </div>

                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <GoogleMap/>
                </div>
            </section>

        </div>
    );
}

export default HomePage;
