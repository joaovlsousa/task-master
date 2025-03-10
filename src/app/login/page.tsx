import { Copyright } from '@/components/copyright'
import { Logo } from '@/components/logo'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { SignInWithGithubButton } from './_components/sign-in-with-github-button'

export default async function LoginPage() {
  return (
    <div className="h-screen flex items-center">
      <div className="h-full md:flex flex-col items-stretch p-10 hidden bg-muted border-l w-full">
        <Logo />
        <Copyright />
      </div>
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="absolute top-7 left-6 md:hidden">
          <Logo />
        </div>

        <Card className="w-full md:w-96 border-0 space-y-4 bg-background shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              Acesse o painel de projetos
            </CardTitle>
            <CardDescription>
              Faça login para acessar seus projetos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInWithGithubButton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
