import {useCallback, useState, useEffect} from "react";
import axios from 'axios';

export const PAGE_SIZE = 25;
export const BASE_URL = "https://creater777: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@api.github.com";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const request = useCallback((url, page = 1, method = "GET") => {
        setLoading(true);
        return axios({
            url: url + "?" + new URLSearchParams({
                accept: "application/vnd.github.v3+json",
                per_page: PAGE_SIZE,
                page
            }).toString(),
            baseURL: BASE_URL,
            method,
            headers: {"Accept": "application/vnd.github.v3+json"}
        }).then(response => {
            setData(response.data);
        }).catch(error => {
            setError(error.message);
        }).finally(() => setLoading(false))
    }, []);

    return {request, loading, error, data}
};
