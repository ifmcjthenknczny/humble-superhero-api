import React from 'react'
import Header from './components/Header'
import HeroImagePanel from './components/panels/HeroImagePanel'
import FormPanel from './components/panels/FormPanel'
import Footer from './components/Footer'
import ListPanel from './components/panels/ListPanel'

function App() {
    return (
        <>
            <main className="p-12 flex flex-col items-center gap-12">
                <Header />
                <div className="flex flex-row gap-12">
                    <FormPanel />
                    <HeroImagePanel />
                </div>
                <ListPanel />
            </main>
            <Footer />
        </>
    )
}

export default App
