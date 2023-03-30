import { useEffect, useState } from "react";
import useControl from "../hooks/useControl";
import { useMutate } from "../hooks/useMutate";

const ChangeFlatStatus = ({defaultStatus, flatId, invalidate}) => {
    const [status, control, setSatus] = useControl(defaultStatus)
    
    
    const [changeStatus, {isLoading}] = useMutate({
        path: `/flat/${flatId}`,
        method: 'PATCH',
        body: {
            status
        },
        onEnd: invalidate
    })


    useEffect(() => {
        if(!!status && status !== defaultStatus) changeStatus()
    }, [status, defaultStatus])
    


    return (
        <>
            <form>
                <select className="form-select" name="status" {...control} disabled={isLoading}>
                    <option value="free">Свободна</option>
                    <option value="reserved">Бронь</option>
                    <option value="sold">Продана</option>
                </select>
            </form>
        </>
    );
}

export default ChangeFlatStatus;