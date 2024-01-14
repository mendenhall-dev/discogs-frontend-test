import data from './data'

function delay(ts: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ts)
  })
}

export async function fetchReleaseData() {
  await delay(300 + Math.random() * 500)
  return data
}
