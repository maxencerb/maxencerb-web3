import type { Token } from "@/types/tokens"
import { fetchToken } from "@wagmi/core"

const TOKENS_LOCALSTORAGE = 'wi:t:imported_tokens'

const getPolygonTokenList = async (): Promise<Token[]> => {
    const res = await fetch('/api/tokens')
    const tokenList = await res.json() as Token[]
    return tokenList
}

const isEthAdress = (str: string): str is `0x${string}` => {
    return /^0x[a-fA-F0-9]{40}$/g.test(str)
}

const getImportedToken = (): Token[] => {
    const existingImportsRaw = localStorage.getItem(TOKENS_LOCALSTORAGE)
    const imports = (existingImportsRaw ? JSON.parse(existingImportsRaw) : []) as Token[]
    return imports
}

const importToken = async (address: `0x${string}`, revalidate?: () => void) => {
    const token = await fetchToken({
        address: address,
        chainId: 137
    })

    const toImport = {
        ...token,
        totalSupply: undefined,
        chainId: 137
    }

    const imports = getImportedToken()
    const newTokens = [
        ...imports,
        toImport
    ]
    localStorage.setItem(TOKENS_LOCALSTORAGE, JSON.stringify(newTokens))
    revalidate?.()
}


export {
    getPolygonTokenList,
    isEthAdress,
    importToken,
    getImportedToken
}