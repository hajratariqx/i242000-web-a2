// Mock asynchronous "server". It returns the local product data after a short delay,
// and can be told to fail so we can show the error and retry states.
import { products } from './products.js'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function loadProducts({ delay = 700, shouldFail = false } = {}) {
  await wait(delay)
  if (shouldFail) {
    throw new Error('We could not load the collection. This failure is simulated.')
  }
  return structuredClone(products) // a copy, so the app never edits the original data
}
