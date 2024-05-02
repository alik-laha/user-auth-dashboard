import { NextResponse, type NextFetchEvent } from "next/server";

export function middleware(req: NextFetchEvent) {
    // Add your middleware logic here
    return NextResponse.next();
}

export default middleware;