export const HeroRandom = async (setCurrentHero) => {
    try {
        const herolist = await fetch('https://overfast-api.tekrop.fr/heroes')
        const herojson = await herolist.json();
        
        const randomhero = herojson[Math.floor(Math.random() * herojson.length)];
        const herodetail = await fetch(`https://overfast-api.tekrop.fr/heroes/${randomhero.key}`);
        const herodetailjson = await herodetail.json();

        setCurrentHero({
            name: herodetailjson.name,
            image: herodetailjson.portrait
        })
    } catch (error) {
        console.error('Erreur:', error);
    }
};

