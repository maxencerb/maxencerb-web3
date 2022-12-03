type TokenProject = {
    name?: string,
    summary?: string,
    contact?: string,
    website?: string
}

type TokenExtension = {
    rootAddress: string,
    project?: TokenProject
}

type Token = {
    chainId: number,
    name: string,
    symbol: string,
    decimals: number,
    address: `0x${string}`,
    logoURI?: string,
    tags?: string[],
    extension?: TokenExtension
}

export type {
    Token
}