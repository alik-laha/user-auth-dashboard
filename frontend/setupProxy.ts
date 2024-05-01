import { NextApiRequest, NextApiResponse } from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(req: NextApiRequest, res: NextApiResponse) {
    const target = 'http://localhost:7000';

    const proxy = createProxyMiddleware({
        target,
        changeOrigin: true,
    });

    return proxy(req, res);
}