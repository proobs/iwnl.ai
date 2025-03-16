import { SignIn } from '@clerk/remix'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/ui/footer'

export default function Page() {
    
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-blue-300 via-blue-400 to-purple-500 overflow">
    <header className="sticky top-0 z-50 bg-transparent">
      <Navbar />
    </header>

    <main className="flex flex-1 items-center justify-center">
        <SignIn />
    </main>

    <footer className="mt-auto w-full bg-white/5 backdrop-blur-sm border-t border-white/10">
        <Footer
      companyName="IWNL" 
      copyright={`© ${new Date().getFullYear()} All rights reserved.`}
        />
    </footer>
  </div> 
  )
}