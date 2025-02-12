import React from 'react'
import Header from './components/Header'
import HeroImagePanel from './components/panels/HeroImagePanel'
import FormPanel from './components/panels/FormPanel'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <main className="p-12 flex flex-col items-center gap-12">
                <Header />
                <div className="flex flex-row gap-12">
                    <FormPanel />
                    <HeroImagePanel />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default App
