import { useStore } from "../../app/stores/store";

const ServerError = () => {
    const {commonStore} = useStore();

    return (
        <div className="container shadow">
            <h1 className="text-center">Server Error</h1>
            <h5 className="text-center error">{commonStore.error?.message}</h5>
            {commonStore.error?.details && (
                <>
                    <h4>Stack trace</h4>
                    <code style={{marginTop: '10px'}}>{commonStore.error.details}</code>
                </>
            )}
        </div>
    )
}

export default ServerError
