"use client";
import { useState } from "react";


export default function HeroGuess({ onSubmit}) {
    const [guess, setGuess] = useState("");

    const inputChange = (e) => {
        e.preventDefault();
        onSubmit(guess);
        setGuess("");
    }
    return(
        <div className="flex flex-row justify-center pt-4">
            <form onSubmit={inputChange} className="flex gap-4">
                <input type="text" placeholder="Enter your guess here" className="bg-white rounded-xl p-1" value={guess} onChange={(e) => setGuess(e.target.value)}/>
                <button type="submit" className="cursor-pointer bg-[#34495e] text-white p-1 rounded-xl">Soumettre</button>
            </form>
        </div>
    )
}