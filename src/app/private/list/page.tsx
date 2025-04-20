"use client";

import CustomLoading from "@/components/loading/CustomLoading";
import { ChevronDown, ChevronLeft, ChevronRight, HeartOff } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CircleLoader from "@/components/loading/CircleLoading";

type ReportsType = {
    id: string;
    created: Date;
    name: string;
    investor: string;
    signal: string;
};

export default function ListPage() {
    const [reports, setReports] = useState<ReportsType[] | null>(null);
    const [oldReportsFirst, setOldReportsFirst] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    const [paginatedReports, setPaginatedReports] = useState<ReportsType[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 9;
    const [totalPages, setTotalPages] = useState(0);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/reports/get-all-reports", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const parsedResponse = await response.json();
            setReports(parsedResponse.reports);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!reports) return;

        const filteredReports = [...reports];

        if (oldReportsFirst) {
            filteredReports.sort(
                (a, b) =>
                    new Date(a.created).getTime() -
                    new Date(b.created).getTime()
            );
        } else {
            filteredReports.sort(
                (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime()
            );
        }

        const newTotalPages = Math.ceil(
            filteredReports.length / reportsPerPage
        );
        setTotalPages(newTotalPages);

        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        } else if (newTotalPages === 0) {
            setCurrentPage(1);
        }

        const startIndex = (currentPage - 1) * reportsPerPage;
        const endIndex = startIndex + reportsPerPage;
        setPaginatedReports(filteredReports.slice(startIndex, endIndex));
    }, [reports, currentPage, reportsPerPage, oldReportsFirst]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const q = raw.trim().toLowerCase();

        if (!reports) return;

        if (!q) {
            setCurrentPage(1);
            setTotalPages(Math.ceil(reports.length / reportsPerPage));
            setPaginatedReports(reports.slice(0, reportsPerPage));
            return;
        }

        const filtered = reports.filter((r) =>
            r.name.toLowerCase().includes(q)
        );

        const pages = Math.ceil(filtered.length / reportsPerPage);
        setTotalPages(pages);

        setCurrentPage(1);
        setPaginatedReports(filtered.slice(0, reportsPerPage));
    };

    const deleteReport = async (id: string) => {
        try {
            if (!reports) return;
            setDeleteLoading(id);
            const response = await fetch(`/api/reports/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage =
                    errorData.error || "Failed to delete report";
                throw new Error(errorMessage);
            }
            const filtered = reports.filter((r) => r.id !== id);
            const pages = Math.ceil(filtered.length / reportsPerPage);
            setTotalPages(pages);

            setCurrentPage(1);
            setPaginatedReports(filtered.slice(0, reportsPerPage));
            setReports((prevReports) =>
                prevReports
                    ? prevReports.filter((report) => report.id !== id)
                    : []
            );

            toast.success("Report deleted successfully!");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
                console.log(err.message);
            } else {
                toast("Server error. Try again later!");
                console.log(err);
            }
        } finally {
            setDeleteLoading(null);
        }
    };

    return (
        <div
            className={`flex flex-col ${
                totalPages > 1 ? "justify-between" : "justify-start"
            } gap-8 lg:gap-20 py-6 md:py-16 px-0 md:px-16 mt-12 md:mt-0 md:h-[calc(100vh-56px)]`}>
            <div className="flex max-md:flex-col gap-4 items-center justify-between">
                <input
                    onChange={onInputChange}
                    className="text-[.8rem] px-4 py-3 bg-[#171717] border border-neutral-800 rounded-lg outline-0 w-full md:w-auto md:flex-1"
                    placeholder="Search by instrument name"
                />
                <div className="flex gap-0 md:gap-4 justify-between w-full md:w-auto">
                    <div className="flex border border-neutral-800 rounded-lg p-1">
                        <button
                            onClick={() => setOldReportsFirst(true)}
                            className={`px-3 py-2 rounded-sm cursor-pointer ${
                                oldReportsFirst ? "bg-[#202020]" : "transparent"
                            }`}>
                            Old
                        </button>
                        <button
                            onClick={() => setOldReportsFirst(false)}
                            className={`px-3 py-2 rounded-sm cursor-pointer ${
                                !oldReportsFirst
                                    ? "bg-[#202020]"
                                    : "transparent"
                            }`}>
                            New
                        </button>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="border border-neutral-800 bg-white px-4 py-3 text-black font-normal rounded-lg shrink-0 flex-center gap-3">
                                Filter by investor
                                <ChevronDown size={18} />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-container border border-zinc-600">
                            <h1>Coming soon...</h1>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* <div className="flex max-lg:flex-col gap-4 w-full lg:w-auto">
                  
                    <Select
                        value={sorted}
                        onValueChange={(value) => setSorted(value)}>
                        <SelectTrigger className="border border-gray-200 rounded-md w-full md:w-[160px] px-4">
                            <SelectValue placeholder="Sort by time" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="desc">
                                    Newest first
                                </SelectItem>
                                <SelectItem value="asc">
                                    Oldest first
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div> */}
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-8 pb-[24px] lg:pb-0">
                {paginatedReports ? (
                    paginatedReports?.map((report) => (
                        <Link
                            className="max-h-[170px] relative col-span-3 lg:col-span-1 row-span-1 bg-[#181818] border border-neutral-800 md:hover:border-neutral-700 duration-200 rounded-2xl py-4 px-6 flex flex-col gap-2 overflow-hidden"
                            href={`/private/list/${report.id}`}
                            key={report.id}>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <Image
                                        src="/buffett.png"
                                        alt="logo"
                                        width={68}
                                        height={68}
                                    />
                                    <span className="text-[1rem]">
                                        {report.name}
                                    </span>
                                </div>

                                {deleteLoading === report.id ? (
                                    <CircleLoader />
                                ) : (
                                    <HeartOff
                                        size={16}
                                        color="var(--green)"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            deleteReport(report.id);
                                        }}
                                    />
                                )}

                                {/* <MdDelete
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        deleteReport(report.reportId);
                                    }}
                                    className="text-[1.2rem] text-sell cursor-pointer"
                                /> */}
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="text-neutral-500 text-[.7rem]">
                                    Investor:
                                </span>
                                <span className="text-[.8rem]">
                                    {report.investor}
                                </span>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span className="text-neutral-500 text-[.7rem]">
                                    Generated on:
                                </span>
                                <span className="text-[.8rem]">
                                    {new Date(
                                        report.created
                                    ).toLocaleDateString("en-CA")}
                                </span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="text-neutral-500 text-[.7rem]">
                                    Signal:
                                </span>
                                <span className="text-[.8rem]">
                                    {report.signal}
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-3 row-span-3 flex items-center justify-center">
                        <CustomLoading />
                    </div>
                )}
                {paginatedReports?.length === 0 && (
                    <div className="min-h-[400px] col-span-3 row-span-3 flex items-center justify-center md:text-[1.5rem] text-zinc-500">
                        Your reports archive is empty
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4 pb-[24px] lg:pb-0">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`flex gap-2 items-center px-4 py-2 text-[.75rem] rounded-md ${
                            currentPage === 1
                                ? " text-zinc-500 cursor-not-allowed"
                                : "cursor-pointer"
                        }`}>
                        <ChevronLeft />
                        Prev
                    </button>
                    <span className="text-[.75rem]">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`flex gap-2 items-center px-4 py-2 text-[.75rem] rounded-md ${
                            currentPage === totalPages
                                ? " text-zinc-500 cursor-not-allowed"
                                : "cursor-pointer"
                        }`}>
                        Next
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}
