import { createContext, useState, type ReactNode } from "react";

type Type = {
    letterLength: number
    setLetterLength: (value: number) => void
}
export const LetterLengthContext = createContext<Type>({
    letterLength: 1,
    setLetterLength: () => { }
})

export const LetterLengthProvider = ({ children }: { children: ReactNode }) => {
    const [letterLength, setLetterLength] = useState<number>(1)

    return (
        <LetterLengthContext.Provider value={{ letterLength, setLetterLength }}>
            {children}
        </LetterLengthContext.Provider>
    )
}
