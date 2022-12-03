import { Token } from "@/types/tokens"
import { getPolygonTokenList, isEthAdress } from "@/utils/token"
import { useMemo } from "react"
import useSWR from 'swr'

const POLYGON_TOKEN_LIST_KEY = 'polygon-token-list'

const usePolygonTokenList = () => {
    const { data, error } = useSWR(POLYGON_TOKEN_LIST_KEY, getPolygonTokenList)
    return {
        tokens: data || [],
        isLoading: !data,
        error
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
                const isIncluded = token.name.split(' ').reduce((prev, token_word) => {
                    return prev || token_word.startsWith(word)
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