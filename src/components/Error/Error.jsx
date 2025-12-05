import { useGlobalContext } from "../../context/GlobalContext"

const Error = () => {
    const {error} = useGlobalContext()
    return (
        <div className="flex justify-center items-center min-h-96 bg-white dark:bg-black">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-bold mb-2">Error Loading Movie</h3>
                <p>{error}</p>
            </div>
        </div>
    )
}

export default Error