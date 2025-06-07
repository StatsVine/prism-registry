import fs from 'node:fs/promises'
import path from 'node:path'
import { getCachedData } from '@lib/fileCache'

const DATA_DIR = '_data/exports'

async function getProductFiles(directory) {
  let filePaths = []

  const files = await fs.readdir(directory)

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = await fs.stat(filePath)

    if (stat.isDirectory()) {
      const subPaths = await getProductFiles(filePath)
      filePaths = filePaths.concat(subPaths)
    } else if (file.endsWith('.json') && !file.endsWith('.min.json')) {
      filePaths.push(filePath.replace(DATA_DIR, ''))
    }
  }

  return filePaths
}

function extractPathSegments(filePath) {
  const normalizedPath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/')
  const pathSegments = normalizedPath
    .replace(/\\/g, '/')
    .split('/')
    .filter((segment) => segment !== '') // Split and remove empty segments
  const fileNameWithoutExtension = pathSegments.pop().replace('.json', '')
  return [...pathSegments, fileNameWithoutExtension]
}

export const getSourceIds = async (productPath) => {
  const data = await getCachedData(productPath)
  return Object.keys(data)
}

function getProductPath(
  sportName,
  productName,
  pivotName,
  sourceName,
  extension = '.json',
) {
  return path.join(
    DATA_DIR,
    sportName,
    productName,
    pivotName,
    sourceName + extension,
  )
}

export const getPlayerData = async (
  sportName,
  productName,
  pivotName,
  sourceName,
  sourceId,
) => {
  const productPath = getProductPath(
    sportName,
    productName,
    pivotName,
    sourceName,
  )
  const data = await getCachedData(productPath)
  return data[sourceId]
}

export function createStaticPaths() {
  return async () => {
    let pages = []
    const allPaths = await getProductFiles(DATA_DIR)

    for (const filePath of allPaths) {
      const segments = extractPathSegments(filePath)
      if (segments.length !== 4) {
        // Skip the base product files (the ones that are lists, not pivots/maps)
        continue
      }
      const sourceIds = await getSourceIds(
        getProductPath(segments[0], segments[1], segments[2], segments[3]),
      )
      for (const sourceId of sourceIds) {
        const parts = {
          sport: segments[0],
          product: segments[1],
          pivot: segments[2],
          source: segments[3],
          source_id: sourceId,
        }
        pages.push({ params: parts })
      }
    }
    return pages
  }
}

export function createHandler() {
  return async ({ params }) => {
    const sourceId = params.source_id
    const player = await getPlayerData(
      params.sport,
      params.product,
      params.pivot,
      params.source,
      sourceId,
    )

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

export const GET = createHandler()
export const getStaticPaths = createStaticPaths()
