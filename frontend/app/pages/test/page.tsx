import { getProducts } from "@/hooks/datafetch"
import { Product } from "@/hooks/datafetch"
import { unstable_cache } from "next/cache"
import { useShoppingCart } from "@/hooks/use-context"
import Page from '../../../.next/dev/types/routes';

export const dynamic = "force-static"
export const regenerate = 300


const TestPage = () => {


    return (
        <div className="min-h-[100vh] w-screen">
            <div className="mt-20   ">
    <div className="flex justify-center items-center p-4">
        <div
            className="bg-[url('/bg-one.png')] bg-no-repeat bg-cover bg-center rounded-xl 
            w-full max-w-[400px] lg:max-w-[750px] overflow-hidden
            flex flex-col lg:flex-row justify-around items-stretch min-h-[500px] lg:min-h-[420px] relative"
        >
            {/* LEFT — Image Section */}
            <div className="h-64 lg:h-auto lg:w-3/8 lg:relative absolute h-full z-10 overflow-hidden">
                <img
                    src="https://plus.unsplash.com/premium_photo-1682145578037-0369879262a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Solar panels"
                    className="w-full h-full object-cover blur-none lg:blur-none scale-100 brightness-45 lg:brightness-75"
                />

                {/* badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white border rounded-full px-3 py-1.5 shadow-sm">
                    <span className="text-[var(--teal-dark-dark)] text-[9px] lg:text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                        Security, Solar, Access control
                    </span>
                </div>
            </div>

            {/* RIGHT — Details Section */}
            <div className="relative z-10 flex flex-col justify-center w-screen p-6 lg:p-10 lg:w-3/5">
                <div className="ml-35">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-px bg-white rounded" />
                        <span className="lg:text-[var(--teal-dark-dark)] text-white text-[10px] font-semibold tracking-[0.18em] uppercase">
                            Solar Solutions
                        </span>
                    </div>
                    <h1 className="lg:text-white lg:text-[var(--teal-dark-dark)] text-white font-black leading-[1.05] text-3xl lg:text-4xl tracking-tight">
                        Best <span className="text-[var(--teal-dark-light)]">Solar</span><br />
                        Solution
                    </h1>

                    {/* body */}
                    <p className="lg:text-white text-white mt-4 mb-6 text-sm font-md  leading-relaxed max-w-[200px]">
                        We provide the best solar solution for both commercial and residential buildings.
                    </p>

                    {/* stats row */}
                    <div className="flex flex-wrap gap-6 mb-8">
                        {[["98%", "Efficiency"], ["25Y", "Warranty"], ["60%", "Bill Cut"]].map(([val, label]) => (
                            <div key={label} className="flex flex-col gap-0.5">
                                <span className="lg:text-white text-white text-xl lg:text-2xl font-black leading-none">{val}</span>
                                <span className="text-white text-[9px] uppercase tracking-widest opacity-90 font-bold">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap items-center gap-4">
                        <button className="bg-[var(--teal-dark-dark)] px-5 py-2.5 rounded-md text-xs lg:text-sm text-white font-bold hover:brightness-110 transition-all">
                            View Solution →
                        </button>
                        <button className="lg:text-[var(--teal-dark-dark)] bg-white text-[var(--teal-dark-dark)] hover:text-slate-300 text-[11px] border border-white/30 px-5 py-2.5 rounded-md font-medium transition-colors duration-200">
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
    )
}

export default TestPage;