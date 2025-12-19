import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

const isLenderRoute = createRouteMatcher(['/lender(.*)'])
const isBorrowerRoute = createRouteMatcher(['/borrower(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth()
  
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // Role-based route protection
  if (userId && sessionClaims) {
    const userRole = (sessionClaims as any).metadata?.role as string | undefined
    
    if (isLenderRoute(request) && userRole !== 'lender') {
      return Response.redirect(new URL('/borrower/dashboard', request.url))
    }
    
    if (isBorrowerRoute(request) && userRole !== 'borrower') {
      return Response.redirect(new URL('/lender/dashboard', request.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
