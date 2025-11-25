import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { from, to, amount } = req.body;

  res.status(200).json({
    status: "mock_success",
    message: "EVM Swap transaction built (mock)",
    data: { from, to, amount },
  });
}
