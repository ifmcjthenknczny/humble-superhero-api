import { useState } from 'react'
import Header from './components/layout/Header'
import HeroImagePanel from './components/panels/HeroImagePanel'
import FormPanel from './components/panels/FormPanel'
import Footer from './components/layout/Footer'
import ListPanel from './components/panels/ListPanel'

function App() {
    const [refreshCount, setRefreshCount] = useState<number>(0)

    const incrementRefreshCount = () => {
        setRefreshCount((prev) => prev + 1)
    }

    return (
        <>
            <main className="px-6 pt-6 md:px-12 md:pt-12 flex flex-col items-center gap-6 md:gap-12 pb-16">
                <Header />
                <div className="flex flex-row gap-12 w-full">
                    <FormPanel onSubmit={incrementRefreshCount} />
                    <HeroImagePanel />
                </div>
                <ListPanel refreshCount={refreshCount} />
            </main>
            <Footer />
        </>
    )
}

export default App
