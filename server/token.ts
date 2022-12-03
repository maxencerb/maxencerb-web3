import type { Token } from "@/types/tokens"

const getPolygonTokenListServer = async (): Promise<Token[]> => {
    const res = await fetch('https://raw.githubusercontent.com/maticnetwork/polygon-token-list/master/src/tokens/popularTokens.json')
    const tokenList = await res.json() as Token[]
    return tokenList.splice(1)
}

export {
    getPolygonTokenListServer
}