import { getPolygonTokenListServer } from '@/server/token'
import type { Token } from '@/types/tokens'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = Token[]

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tokens = await getPolygonTokenListServer()
    res.status(200).json(tokens)
}
