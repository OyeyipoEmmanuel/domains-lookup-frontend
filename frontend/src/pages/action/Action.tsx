import { useContext, useState } from "react"
import Result from "./Result"
import { LetterLengthContext } from "../../context/LetterLengthContext"
import { Select } from "antd"

type LetterSelection = {
    letterLength: number
}

const Action = () => {
    const [tld, setTld] = useState<string>(".tech")

    const { letterLength, setLetterLength } = useContext(LetterLengthContext)

    const letterSelection: LetterSelection[] = [
        {
            letterLength: 1
        },
        {
            letterLength: 2
        },
        {
            letterLength: 3
        },
    ]

    const handleChange = (value: string)=>{
        setTld(value)
    }

    return (
        <main className="bg-white p-3 rounded-md shadow-md">
            <section>
                <h1>Number of Letters</h1>
                <div className="flex flex-row justify-between space-x-2">
                    {letterSelection.map((letter, idx) => (
                        <span key={idx} className={`${letter.letterLength === letterLength && "bg-black text-white"} px-6 py-1 rounded-lg border border-black/40 font-semibold mt-4 duration-200 transition-all cursor-pointer`} onClick={() => setLetterLength(letter.letterLength)}>{letter.letterLength} {letter.letterLength === 1 ? "Letter" : "Letters"}</span>
                    ))}
                </div>
            </section>
            
                

            <section className="mt-4">
                <h1>Select TLD</h1>
                <Select
                    defaultValue=".tech"
                    style={{width: 150}}
                    onChange={handleChange}
                    options={[
                        { value: ".ai", label: ".ai" },
                        { value: ".io", label: ".io" },
                        { value: ".com", label: ".com" },
                        { value: ".tech", label: ".tech" },
                        { value: ".xyz", label: ".xyz" },
                    ]} />
            </section>

            <section>
                <Result letterLengthSelected={letterLength} tld={tld} />
            </section>
        </main>
    )
}

export default Action