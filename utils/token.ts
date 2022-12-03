import type { Token } from "@/types/tokens"

const getPolygonTokenList = async (): Promise<Token[]> => {
    const res = await fetch('/api/tokens')
    const tokenList = await res.json() as Token[]
    return tokenList
}

const isEthAdress = (str: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/g.test(str)
}

export {
    getPolygonTokenList,
    isEthAdress
}