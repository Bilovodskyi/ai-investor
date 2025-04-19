import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { AiResponseType } from "@/types/buffetAIReportTypes";
import { BuffettFinancialData } from "@/types/buffettAgentTypes";
import { useAppDispatch } from "@/redux/store";
import { spentOneToken } from "@/redux/slices/tokensSlice";

const STORAGE_KEY = "buffettAiReports";

async function fetchClaudeReport(
    ticker: string,
    analysisData: BuffettFinancialData
) {
    const res = await fetch("/api/buffett/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, analysisData }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch AI report");
    }
    const parsed = await res.json();
    return JSON.parse(parsed.content[0].text) as AiResponseType;
}

function readFromStorage(id: string): AiResponseType | null {
    try {
        const all = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        return all[id] || null;
    } catch {
        return null;
    }
}

function writeToStorage(id: string, report: AiResponseType) {
    try {
        const all = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        all[id] = report;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
        console.error("sessionStorage error:", e);
    }
}

export function useBuffettAiReport(
    ticker: string,
    analysisData: BuffettFinancialData | null
): {
    data?: AiResponseType;
    isLoading: boolean;
    error?: string;
} {
    const [data, setData] = useState<AiResponseType>();
    const [error, setError] = useState<string>();
    const [isLoading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const didSpendTokenRef = useRef(false);

    useEffect(() => {
        if (!analysisData) {
            setError(undefined);
            setLoading(true);
            return;
        }

        if (analysisData.ticker !== ticker) {
            setError("This instrument isn't supported.");
            setLoading(false);
            return;
        }

        setError(undefined);
        setLoading(true);

        const cached = readFromStorage(ticker);
        if (cached) {
            setData(cached);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetchClaudeReport(ticker, analysisData)
            .then((report) => {
                writeToStorage(ticker, report);
                setData(report);

                if (!didSpendTokenRef.current) {
                    dispatch(spentOneToken());
                    toast.success("You've spent 1 token!");
                    didSpendTokenRef.current = true;
                }
            })
            .catch((err: Error) => {
                const msg = err.message.includes("529")
                    ? "Claude is busy—try again soon."
                    : "Failed to fetch AI report.";
                setError(msg);
                toast.error(msg);
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [ticker, analysisData]);

    return { data, isLoading, error };
}
