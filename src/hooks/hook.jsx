import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useErrors = (errors = []) => {
    useEffect(() => {
        errors.forEach(({isError, error, fallback}) => {
            if(isError){
                if(fallback) fallback();
                else toast.error(error?.data?.message || "Something went wrong");
            }
        })
    }, [errors])
};

const useAsyncMutation = (mutationHook) => {
    const [isLodaing, setIsLodaing] = useState(false);
    const [data, setData] = useState(null);

    const [mutate] = mutationHook();

    const executeMutation = async (toastMessage, ...agrs) => {
        setIsLodaing(true);
        const toastId = toast.loading(toastMessage || "Updating data... ");
        try {
            const res = await mutate(...agrs);

            if(res.data){
                toast.success(res.data.message || "Updated Message Successfully...", {id: toastId});
                setData(res.data);
            }else{
                toast.error(res?.error?.data?.message || "Something Went Wrong", {id: toastId})
            }

        } catch (error) {
            toast.error("Something Went Wrong", {id: toastId})
        }
        finally{
            setIsLodaing(false)
        }
    }

    return [executeMutation, isLodaing, data]
}

const useSocketEvents = (socket, handlers) => {
    useEffect(() => {
        Object.entries(handlers).forEach(([event, handler]) => {
            socket.on(event, handler);
        })

        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                socket.off(event, handler)
            })
        }
    }, [socket, handlers])
};

export {
    useAsyncMutation, useErrors, useSocketEvents
};

