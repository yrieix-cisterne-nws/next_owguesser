"use client";
import { useState, useEffect } from "react"
import HeroImage from "./components/heroimage"
import HeroGuess from "./components/heroguess"
import { HeroRandom } from "./components/herorandom"
import Difficulty from "./components/difficulty"
import { saveScore } from "./components/scorehandler"
import { useScores } from "./components/scoreloader"
import Link from "next/link";


export default function Hero() {
    const [currentHero, setCurrentHero] = useState(null)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [difficulty, setDifficulty] = useState("easy")
    const { bestStreak, loadScores} = useScores()


    useEffect(() => {
        HeroRandom(setCurrentHero);
        loadScores()
    }, []);

    const handleGuess = async (guess) => {
        if (!currentHero) return

        if (guess.toLowerCase() === currentHero.name.toLowerCase()) {
            setCurrentStreak(currentStreak + 1)
            HeroRandom(setCurrentHero)
        } else {
            alert(`Wrong! The correct answer was ${currentHero.name}`)
            
            saveScore(currentStreak, difficulty)
            
            if (currentStreak > bestStreak) {
                await saveScore(currentStreak, bestStreak)
            }
            setCurrentStreak(0)
            await loadScores()

        }
    };

    return (
        <div className="">
            <div className="flex justify-center">
                <h1 className="text-4xl">OWGuesser</h1>
            </div>
            <div className="flex justify-center items-center">
                <Difficulty difficulty={difficulty} setDifficulty={setDifficulty}/>
                <div className="flex flex-col pt-4 px-2">
                    <div className="bg-[#f99e1a] p-8">
                        <HeroImage hero={currentHero} difficulty={difficulty} />
                    </div>
                    <HeroGuess onSubmit={handleGuess}/>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2>Streak</h2>
                    <div className="bg-[#34495e] text-white p-2 rounded-xl">
                        <div className="flex flex-col items-center">
                            <h3 className="text-[14.4px]">Current</h3>
                            <p className="text-3xl">{currentStreak}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-[14.4px]">Best</h3>
                            <p className="text-3xl">{bestStreak}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}