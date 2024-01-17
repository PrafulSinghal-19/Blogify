import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className='h-dvh w-dvw'>
            <div className='relative top-[40%]'>
                <div className="text-center">
                    <CircularProgress />
                    <h1 className="text-3xl">
                        Loading
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Loader