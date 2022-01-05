// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import useSWR from 'swr'

type Data = {
  name: string
}

// https://random-data-api.com/api/cannabis/random_cannabis?size=2
const url = 'https://random-data-api.com/api/name/random_name?size=4'

const fetcher = (...args:any) => fetch(args).then(res => res.json())

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}


export function fetchJsonData() : any {
  const { data, error } = useSWR(url, fetcher)

  if (error) return error
  if (!data) return null
  return data
}