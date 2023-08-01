import { useStore } from "../../app/stores/store";

const ServerError = () => {
    const {commonStore} = useStore();

    return (
        <div className="container shadow">
            <h1 className="text-center">Server Error</h1>
            <h5 className="text-center error">{commonStore.serverError?.message}</h5>
            {commonStore.serverError?.details && (
                <>
                    <h4>Stack trace</h4>
                    <code style={{marginTop: '10px'}}>{commonStore.serverError.details}</code>
                </>
            )}
        </div>
    )
}

export default ServerError
