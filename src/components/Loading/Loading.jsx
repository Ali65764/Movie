const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[40vh] bg-white dark:bg-black">
            <div className="w-16 h-16 border-4 border-red-600 dark:border-blue-600 border-dashed rounded-full animate-spin"></div>
            <p className="text-red-600 dark:text-blue-600 text-2xl mt-4">Loading...</p>
        </div>
    )
}

export default Loading