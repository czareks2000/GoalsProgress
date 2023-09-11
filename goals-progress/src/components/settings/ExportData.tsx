import { useState } from "react";
import agent from "../../app/api/agent";
import Button from "../common/Button";
import { observer } from "mobx-react-lite";
import { store } from "../../app/stores/store";

export default observer(function ExportData() {
    const [isLoading, setIsLoading] = useState(false);

    const downloadData = async () => {
        setIsLoading(true);
        try {
            const response = await agent.Data.zip();
            const blob = new Blob([response.data], { type: 'application/zip' })
            const downloadUrl = URL.createObjectURL(blob)
            const a = document.createElement("a"); 
            a.href = downloadUrl;
            a.download = "goalsprogress.zip";
            document.body.appendChild(a);
            a.click();
        } catch (error) {
            store.commonStore.setError(`Error downloading ZIP file: ${error}`)
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <>
            <div className="form-group-inline export-data">
                <h2>Export data</h2>
                <div className="form-control">
                    <Button
                        text="Export" 
                        loading={isLoading}
                        onClick={() => downloadData()}
                    />
                </div>
            </div>
        </>
    )
})