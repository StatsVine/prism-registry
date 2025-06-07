import { getCachedData } from '@lib/fileCache'
import fs from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = '_data/exports'

export const getSportNames = async () => await fs.readdir(DATA_DIR)

export const getProductNames = async (sportName) =>
  await fs.readdir(path.join(DATA_DIR, sportName))

export const getProductPath = (sportName, productName) =>
  path.join(DATA_DIR, sportName, productName, 'by_id', 'prism_id.json')

export const getPlayerIds = async (sportName, productName) => {
  const productPath = getProductPath(sportName, productName)
  const data = await getCachedData(productPath)
  return Object.keys(data)
}

export const getPlayerData = async (sportName, productName, playerId) => {
  const productPath = getProductPath(sportName, productName)
  const data = await getCachedData(productPath)
  return data[playerId]
}

export function createHandler() {
  return async ({ params }) => {
    const playerId = params.player_id
    const player = await getPlayerData(params.sport, params.product, playerId)

    if (!player) {
      return new Response(JSON.stringify({ error: 'Player not found' }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify(player, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export function createStaticPaths() {
  return async () => {
    let pages = []

    const sportNames = await getSportNames()
    for (const sportName of sportNames) {
      const products = await getProductNames(sportName)
      for (const product of products) {
        const playerIds = await getPlayerIds(sportName, product)
        for (const playerId of playerIds) {
          pages.push({
            params: { sport: sportName, product: product, player_id: playerId },
          })
        }
      }
    }
    return pages
  }
}

export const GET = createHandler()
export const getStaticPaths = createStaticPaths()
