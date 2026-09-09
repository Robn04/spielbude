import { createContext, ReactNode, useContext, useState } from "react";

export type Player = {
    id: string;
    name: string;
    role?: string;
};

type GameContextType = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [players, setPlayers] = useState<Player[]>([]);

    return (
        <GameContext.Provider value={{ players, setPlayers }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useGame must be used inside GameProvider");
    }

    return context;
}