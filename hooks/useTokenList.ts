import { Token } from "@/types/tokens"
import { getImportedToken, getPolygonTokenList, isEthAdress } from "@/utils/token"
import { useMemo } from "react"
import useSWR from 'swr'

export const POLYGON_TOKEN_LIST_KEY = 'wi:polygon-token-list'
export const POLYGON_TOKEN_LIST_KEY_SERVER = 'wi:polygon-token-list-server'
export const POLYGON_TOKEN_LIST_KEY_LOCAL = 'wi:polygon-token-list-local'


const usePolygonTokenList = () => {
    const { data: serverTokens, error } = useSWR([POLYGON_TOKEN_LIST_KEY, POLYGON_TOKEN_LIST_KEY_SERVER], getPolygonTokenList)
    const { data: localTokens, error: error_local } = useSWR(POLYGON_TOKEN_LIST_KEY_LOCAL, getImportedToken)

    const withServer = serverTokens || []
    const allTokens = localTokens ? [
        ...withServer,
        ...localTokens
    ] : withServer

    return {
        tokens: allTokens,
        isLoading: !serverTokens,
        errors: [
            error,
            error_local
        ]
    }
}

const useTokenSearch = (tokens: Token[], searchRaw: string): Token[] => {
    
    const search = searchRaw.toLowerCase();
    
    const tokensResult = useMemo(() => {
        if (search === "") return tokens

        const isAddress = isEthAdress(search)
        if (isAddress) {
            const result = tokens.find((token) => token.address.toLowerCase() === search.toLowerCase())
            return result ? [result] : []
        }

        const scores = tokens.map((token) => {
            let score = 0;
            const symbol = token.symbol.toLowerCase()
            const name = token.name.toLowerCase()
            if (search.length == 1 && symbol.startsWith(search)) {
                score += 2
            } 
            if (search.length > 1 && symbol.includes(search)) {
                score += 2
            }
            search.split(' ').forEach(word => {
                const isIncluded = name.split(' ').reduce((prev, token_word) => {
                    return (token_word.startsWith(word) || prev)
                }, false)
                if (isIncluded) score += 1
            })
            return score
        })

        const filtered = tokens.filter((_, idx) => scores[idx] > 0)
        const filtered_scores = scores.filter(score => score > 0)
        const sorted = filtered.sort((a, b) => {
            const aScore = filtered_scores[filtered.indexOf(a)]
            const bScore = filtered_scores[filtered.indexOf(b)]
            return bScore - aScore
        })

        return sorted

    }, [tokens, search]) as Token[]
    return tokensResult
}

export {
    usePolygonTokenList,
    useTokenSearch
}