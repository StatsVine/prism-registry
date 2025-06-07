import fs from 'node:fs/promises'

const fileCache = new Map()

export async function getCachedData(filePath) {
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath)
  }

  const fileContent = await fs.readFile(filePath, 'utf-8')
  const data = JSON.parse(fileContent)
  fileCache.set(filePath, data)
  return data
}
