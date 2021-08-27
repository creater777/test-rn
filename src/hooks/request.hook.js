import {useCallback, useState, useEffect} from "react";
import axios from "axios";
import {API_USER, API_KEY} from "@env"

export const PAGE_SIZE = 25;
export const BASE_URL = `https://${API_USER}:${API_KEY}@api.github.com`;

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
