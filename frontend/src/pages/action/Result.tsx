import { useQuery } from "@tanstack/react-query"
import { Pagination, Spin } from "antd";
import { useState } from "react";
import { IoIosWarning } from "react-icons/io";

type ResultProps = {
    letterLengthSelected: number
    tld: string
}

const Result = ({ letterLengthSelected, tld }: ResultProps) => {
    // const [paginate, setPaginate] = useState<number>(20)
    // const [currentPg, setCurrentPg] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetch_result', letterLengthSelected],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const res = await fetch(`http://localhost:5000/api/domains?letters=${letterLengthSelected}`)

            return res.json()
        },

    })

    const startIdx = (page - 1) * 20
    const endIdx = startIdx + 20

    const loadMore = (pageNo: number) => {
        setPage(pageNo)
        console.log(page)

        // setCurrentPg(paginate + 1)
        // console.log(currentPg)

        // setPaginate(20*pageNo)
        // console.log(paginate)

    }

    return (
        <main className="pt-6">
            <section className="mb-6">
                Showing {data && data[tld].length || 0} result
            </section>

            <section className="border border-black/40 rounded-lg shadow-md w-full">
                {/* Header */}
                <table className="w-full border-collapse text-left">

                    <thead className=" bg-[#F8FAFC]">
                        <tr>
                            <th className="py-2 px-3 w-1/3">Domain</th>
                            <th className="py-2 px-3 w-1/3">TLD</th>
                            <th className="py-2 px-3 w-1/3 text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody className="w-full">
                        {error && (<tr className="w-full">
                            <td><IoIosWarning className="w-full text-7xl text-center mx-auto text-red-600" /></td>
                        </tr>
                        )}
                        {isLoading && (
                            <tr>
                                <td colSpan={3} className="text-center py-8 text-gray-500">
                                    <Spin size="large" style={{width: "240px"}}/>
                                </td>
                            </tr>
                        )}
                        {!isLoading && data[tld] && data[tld].length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-8 text-gray-500">
                                    <p>No available domain for {tld} of length {letterLengthSelected}</p>
                                </td>
                            </tr>

                        )}
                        {!error && !isLoading && data[tld] && data[tld].slice(startIdx, endIdx).map((domain: string, idx: number) => (
                            <tr key={idx} className="border-b border-black/20">
                                <td className="py-2 px-3">{domain}</td>
                                <td className="py-2 px-3">{tld}</td>
                                <td className="py-2 px-3 text-center">
                                    <span className="bg-[#DAFAE3] text-green-500 rounded-full text-sm px-2 py-0.5">
                                        Available
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <Pagination pageSize={20} current={page} total={data && data[tld].length} onChange={loadMore} style={{}} className="" />
            </section>

        </main >
    )
}

export default Result