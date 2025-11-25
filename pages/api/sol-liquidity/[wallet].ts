import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet } = req.query;
  if (!wallet) return res.status(400).json({ error: "missing wallet" });

  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=600");

  try {
    const r = await fetch(`https://api.orca.so/v1/liquidity/user/${wallet}`);
    const json = await r.json();
    res.status(200).json(json);
  } catch (err: any) {
    res.status(200).json([]);
  }
}
