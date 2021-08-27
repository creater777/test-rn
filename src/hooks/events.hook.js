import {useCallback, useState, useEffect} from "react";
import {useRequest} from "./request.hook";

export const useEvents = () => {
    const [events, setEvents] = useState(null);
    const [page, setPage] = useState(1)
    const {loading, error, data, request} = useRequest()

    useEffect(() => {
        request("/events", page);
    }, [page]);

    useEffect(() => {
        setEvents(data);
    }, [data]);

    const update = useCallback(() => {
        request("/events", page)
    });

    return {events, page, setPage, error, loading, update}
};
