import data from './data'

function delay(ts: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, ts)
  })
}

export async function fetchReleaseData(): Promise<typeof data> {
  await delay(300 + Math.random() * 500)
  return data
}
