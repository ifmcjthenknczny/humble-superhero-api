const GITHUB_URL = 'https://github.com/ifmcjthenknczny/humble-superhero-api'
const CREATOR = 'Maciej Konieczny'

export default function Footer() {
    return (
        <footer className="w-full border-t-8 py-2 flex flex-row justify-center items-center gap-1 fixed bottom-0 left-0 z-10 bg-[#f8f5ef]">
            <p>
                © {new Date().getFullYear()} {CREATOR}.{' '}
            </p>
            <p>
                <a
                    href={GITHUB_URL}
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub repository
                </a>
            </p>
        </footer>
    )
}
