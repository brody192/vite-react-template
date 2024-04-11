// src/pages/AboutPage.jsx
function AboutPage() {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
            <div className="max-w-4xl mx-auto text-lg">
                <p>
                    <img src="/Team2013.png" alt="photo of the team in 2013" className="float-left mt-4 mr-4 rounded-lg"
                         style={{maxHeight: "250px"}}/>
                    We are a true local artisan bakery established in 2012 on Clerk St, Edinburgh. We have 3 passionate,
                    skilled bakers who make all our production daily at the back of the shop. We make bread slowly,
                    gently, and with traditional methods from France, Scotland, Germany, Scandinavia, Italy, and beyond.
                    We patiently ferment doughs, sometimes over days, to bring out different flavors and marvelous
                    nutritional and conservation properties. We turn our croissants and shape our cinnamon buns. We
                    roast our vegetables and make our own tomato sauce to put in our Fougasses and Pizzettas.
                </p>
                <p>
                    Really, all you see in the shop is made here, from scratch, using simple and natural ingredients. We
                    work with the weather and the seasons…and we just love it, and love to share with you the taste of
                    real bread!
                </p>
                <h2 className="text-2xl font-bold mt-6 mb-4">Our Bread Making Choices</h2>
                <div className="text-justify mt-8">
                    <h2 className="text-3xl font-bold mb-8">Crafting Our Artisan Bread</h2>
                    <p className="text-lg mb-4">
                        <strong className="text-yellow-600">Step 1: Meticulous Ingredient Selection</strong><br/>
                        Bread making begins with the meticulous selection of ingredients: Flour, water, salt, and
                        ferment (sourdough or very small quantities of baker’s yeast). We pride ourselves on using only
                        the finest ingredients. Our flours contain no additives or improvers, ensuring a pure and
                        authentic taste. Our high extraction (“wholemeal”) flours are organic, and our whole wheat is
                        stoneground, enriching our bread with essential nutrients.
                    </p>
                    <p className="text-lg mb-4">
                        <strong className="text-yellow-600">Step 2: Gentle Mixing for Optimal Flavor
                            Preservation</strong><br/>
                        Once the ingredients are assembled, we delicately mix them into the dough. We handle this
                        process with care, as it preserves the rich taste of our bread, albeit to the detriment of
                        volume in our loaves.
                    </p>
                    <p className="text-lg mb-4">
                        <strong className="text-yellow-600">Step 3: Patient Fermentation for Depth of
                            Flavor</strong><br/>
                        The dough then undergoes a patient fermentation process. We employ various fermentation
                        techniques to develop a myriad of tastes and textures. Our commitment to long-fermented bread
                        ensures better conservation, enhanced nutrition, and easier digestion.
                    </p>
                    <p className="text-lg mb-4">
                        <strong className="text-yellow-600">Step 4: Into the Oven: The Art of Well-Fired
                            Bread</strong><br/>
                        After fermentation, it's time for the oven. Our bread is baked to perfection, resulting in a
                        beautifully caramelized crust that significantly contributes to its rich taste profile.
                    </p>
                    <p className="text-lg mb-4">
                        <strong className="text-yellow-600">Step 5: Resting and Evolving</strong><br/>
                        Fresh out of the oven, our bread needs time to rest and breathe. This crucial step allows it to
                        cool properly and continue evolving. While a baguette may achieve its peak crispiness shortly
                        after baking, our breads require more time to reach their optimum. Contrary to popular belief,
                        this extended evolution enhances the flavor and texture of our loaves. Our Rye bread, for
                        instance, truly comes into its own after a few days—try it on the fifth day for an exquisite
                        experience!
                    </p>
                </div>
                <div className="text-center mt-4">
                    <img src="/process1.png" alt="Process Image 1"
                         className="rounded-lg shadow-md inline-block mx-2 mb-4"
                         style={{width: "200px", height: "200px", objectFit: "cover"}}/>
                    <img src="/process2.png" alt="Process Image 2"
                         className="rounded-lg shadow-md inline-block mx-2 mb-4"
                         style={{width: "200px", height: "200px", objectFit: "cover"}}/>
                    <img src="/process3.png" alt="Process Image 3"
                         className="rounded-lg shadow-md inline-block mx-2 mb-4"
                         style={{width: "200px", height: "200px", objectFit: "cover"}}/>
                    <img src="/process4copy.png" alt="Process Image 4"
                         className="rounded-lg shadow-md inline-block mx-2 mb-4"
                         style={{width: "200px", height: "200px", objectFit: "cover", overflow: "hidden"}}/>
                </div>


                <h2 className="text-2xl font-bold mb-4">What Happens to Our Leftovers</h2>
                <div className="text-lg mb-8">
                    <p className="mb-4">
                        We actively support our community by donating our day's leftover bread to various charities,
                        including the Salvation Army, the Cyrenians, the Braidwood Centre, the local Mosque's food bank,
                        SCOOSH (a local after-school club providing healthy snacks for children), the food bank at the
                        King’s Hall, Soup kitchens run by Soul Food, and Street fit Scotland. If you represent a charity
                        interested in receiving our leftover bread, please reach out to us.
                    </p>
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex flex-col items-center mx-4">
                            <img src="/liam.png" alt="Swimmer Image" className="rounded-lg shadow-lg mb-2"
                                 style={{maxWidth: "200px", height: "auto"}}/>
                            <p className="text-sm text-gray-600">Liam, a young Scottish swimmer sponsored by us</p>
                        </div>
                        <div className="flex flex-col items-center mx-4">
                            <img src="/soulFood.png" alt="Charity Image" className="rounded-lg shadow-lg mb-2"
                                 style={{maxWidth: "200px", height: "auto"}}/>
                            <p className="text-sm text-gray-600">Charity: Soup kitchens run by Soul Food</p>
                        </div>
                    </div>
                    <p>
                        In addition to supporting athletes like Liam on their journey, we ensure that our own team, as
                        well as various animals, benefit from our commitment to minimizing food waste. No bread goes to
                        waste at our boulangerie.
                    </p>
                </div>

                <h2 className="text-2xl font-bold mt-6 mb-4">A Bit About Real Bread Campaign</h2>
                <p className="text-lg">
                    <img src="/RealBreadLogo.png" alt="Real Bread Campaign Logo"
                         className="mt-4 md:mr-4 mb-4 md:mb-0 rounded-2xl shadow-md"
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
        </div>
    );
}

export default AboutPage;
