import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet } = req.query;
  if (!wallet) return res.status(400).json({ error: "missing wallet" });

  const query = `
    {
      positions(where: { owner: "${String(wallet).toLowerCase()}" }) {
        id
        tickLower { tickIdx }
        tickUpper { tickIdx }
        pool { token0 { symbol } token1 { symbol } feeTier }
      }
    }
  `;
  try {
    const r = await fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const json = await r.json();
    res.status(200).json(json.data?.positions || []);
  } catch (err: any) {
    res.status(500).json({ error: String(err.message || err) });
  }
}
