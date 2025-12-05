const Footer = () => {
    const date = new Date().toLocaleDateString("az-AZ")
    return (
        <footer className="bg-white dark:bg-black">
            <div className="flex flex-col items-center justify-center pt-28 pb-10">
                <p className="text-transparent bg-clip-text font-bold text-2xl md:text-4xl bg-gradient-to-r from-blue-600 to-red-700 dark:from-[#3d83f5] dark:to-[#d1d6df]">Movie App</p>
                <p className="mt-2 text-[12px] md:text-[15px] text-[#075995] font-bold dark:text-[#bae6fd]"><span className="mr-2">{date}</span>No © COPYRIGHT</p>
            </div>
        </footer>
    )
}

export default Footer