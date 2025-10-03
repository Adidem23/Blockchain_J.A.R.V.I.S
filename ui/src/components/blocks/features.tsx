import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Bell, Mic } from 'lucide-react'
import RootStock from '@/assets/RootStock1.png'
import ChatUI from '@/assets/image1.png'

export function Features() {
    return (
        <section id='features' className="bg-muted/25 py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-16">
                    <h2 className="scroll-m-20 text-3xl font-light tracking-tight first:mt-0 lg:text-4xl">
                        Our Agent Does A Lot More Than Just Transactions
                    </h2>
                </div>
                <div className="mx-auto grid gap-2 sm:grid-cols-5">
                    <Card className="group overflow-hidden shadow-black/5 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl">
                        <CardHeader>
                            <div className="md:p-6">
                                <p className="font-medium">Portfolio Insights</p>
                                <p className="text-muted-foreground mt-3 max-w-sm text-sm">Get instant summaries of your wallet, tokens, and NFTs — just by asking</p>
                            </div>
                        </CardHeader>

                        <div className="relative h-fit pl-6 md:pl-12">
                            <div className="absolute -inset-6 [background:radial-gradient(75%_95%_at_50%_0%,transparent,hsl(var(--background))_100%)]"></div>

                            <div className="bg-background overflow-hidden rounded-tl-lg border-l border-t pl-2 pt-2 dark:bg-zinc-950">
                                <img
                                    src={RootStock}
                                    className="hidden dark:block"
                                    alt="payments illustration dark"
                                    width={1207}
                                    height={929}
                                />
                                <img
                                    src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                                    className="shadow dark:hidden"
                                    alt="payments illustration light"
                                    width={1207}
                                    height={929}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl">
                        <p className="mx-auto my-6 max-w-md text-balance px-6 text-center text-lg font-semibold sm:text-2xl md:p-6">Query Blockchain Data, Prices, or Market Trends in natural language</p>

                        <CardContent className="mt-auto h-fit">
                            <div className="relative mb-6 sm:mb-0">
                                <div className="absolute -inset-6 [background:radial-gradient(50%_75%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                                <div className="aspect-76/59 overflow-hidden rounded-r-lg border">
                                    <img
                                        src={ChatUI}
                                        className="hidden dark:block"
                                        alt="payments illustration dark"
                                        width={1207}
                                        height={900}
                                    />
                                    <img
                                        src={ChatUI}
                                        className="shadow dark:hidden"
                                        alt="payments illustration light"
                                        width={1207}
                                        height={929}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="group p-6 shadow-black/5 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-12">
                        <p className="mx-auto mb-12 max-w-md text-balance text-center text-lg font-semibold sm:text-2xl">Schedule reminders, or trigger on-chain/off-chain workflows with voice.</p>

                        <div className="flex justify-center gap-6">
                            <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 flex aspect-square size-16 items-center justify-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                                <Mic/>
                            </div>
                            <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 flex aspect-square size-16 items-center justify-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                                <Bell/>
                            </div>
                        </div>
                    </Card>
                    <Card className="group relative shadow-black/5 sm:col-span-3 sm:rounded-none sm:rounded-br-xl">
                        <CardHeader className="p-6 md:p-12">
                            <p className="font-lg">Seamless Integration </p>
                            <p className="text-muted-foreground mt-2 max-w-sm text-sm">Connect with dApps, Wallets, and Services to execute complex actions hands-free.</p>
                        </CardHeader>
                        <CardContent className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
                            <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                                    <img
                                        className="m-auto size-8 invert dark:invert-0"
                                        src="https://tinyurl.com/248ve5wf"
                                        alt="Linear logo"
                                        width="32"
                                        height="32"
                                    />
                                </div>
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                                    <img
                                        className="m-auto size-8 invert dark:invert-0"
                                        src="https://tinyurl.com/5n67243u"
                                        alt="Netlify logo"
                                        width="32"
                                        height="32"
                                    />
                                </div>
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                                    <img
                                        className="m-auto size-8 invert dark:invert-0"
                                        src="https://tinyurl.com/bdct8cvy"
                                        alt="github logo"
                                        width="32"
                                        height="32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}