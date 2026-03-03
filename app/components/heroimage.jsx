export default function HeroImage({ hero, difficulty }) {
    return(
        <div>
            {hero ? (
                <img src={hero.image} alt={hero.name} 
                className={difficulty == "normal" ? "blur-xl" : difficulty == "hard" ? "brightness-0" : ""}/>
            ) : (
                <a>https://stats.uptimerobot.com/E0k0yU1pJQ</a>
            )}

        </div>
    )
}