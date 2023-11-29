import Layout from '@/components/layout/Layout';
import ButtonLoading from '@/components/spinners/buttonLoading';
import { getClientById } from '@/components/store/client';
import { AppDispatch, AppState } from '@/components/store/store';
import HistoryDetailTable from '@/components/tables/historyDetailTable';
import { clientStateType, userStateType } from '@/types/types';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function InvoiceHistoryDetail() {

    const router = useRouter();
    const rowID = router.query.id;
    

    const { user, isLoading } = useSelector<AppState>(
        (state) => state.user
    ) as userStateType;

    // const { clients, isLoading: clientLoading } = useSelector<AppState>(
    //     (state) => state.client
    // ) as clientStateType;

    const { clientById, isLoading: clientLoading } = useSelector<AppState>(
        (state) => state.client
      ) as clientStateType;

      console.log("client by id : ",clientById)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
    console.log(rowID);

     dispatch(getClientById(rowID))
    },[rowID])



    return (
        <Layout>
            <div className="flex justify-between items-center px-4">
                <div className="flex justify-end my-6">
                    <h1 className="font-semibold tracking-wider text-[#5a51be] text-xl ml-2">
                        Invoice Details
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 m-6">

                <div className="bg-white p-4 col-span-9 rounded-tl-md rounded-bl-md rounded-tr-md rounded-br-md">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold tracking-wider text-[#0c0c0f] text-lg mt-2">
                            INVOICE NUMBER: {" "}
                            <span className='font-semibold tracking-wider text-[#5a51be] text-lg mt-2'>
                               {rowID}
                            </span>
                        </h1>
                    </div>
                    {isLoading ? (
                        <ButtonLoading />
                    ) : (
                        <div className="grid grid-cols-2 gap-5 mt-8">

                            <div>
                                <h2 className="text-[#898991] text-lg mt-2">
                                    Billing From:
                                </h2>
                                <h2 className="uppercase font-semibold tracking-wider text-[#101011] text-sm mt-2">
                                    {user?.name}
                                </h2>
                                <p className='text-[#898991] text-sm mt-2'>GSTIN: <span className="uppercase">{user?.gstin}</span></p>
                                <p className='text-[#898991] text-sm mt-2'>PAN: <span className='uppercase'>{user?.pan}</span></p>
                                <p className='text-[#898991] text-sm mt-2'>
                                    {`${user?.address.street},`} </p>
                                <p className='text-[#898991] text-sm'>{`${user?.address.city} ${user?.address.pin}, 
                                 ${user?.address.state}, ${user?.address.country}`}</p>
                                <p className="text-[#898991] text-sm'">
                                    <span className="underline text-blue-500">{user?.email}</span>
                                    <span> | </span>
                                    <span>+91-{user?.contact}</span>
                                </p>
                            </div>

                            <div className=' ml-36'>
                                <h2 className="text-[#898991] text-lg mt-2">
                                    Billing To:
                                </h2>
                                <h2 className="font-semibold tracking-wider text-[#101011] text-md mt-2">
                                    {/* Techracers Pvt Lmt */}
                                    {clientById?.name}
                                </h2>
                                <p className='text-[#898991] text-sm mt-2'>GSTIN: 23AAJCG9212C1ZZ</p>
                                <p className='text-[#898991] text-sm mt-2'>
                                    {`${user?.address.street}, ${user?.address.city} `} </p>
                                <p className='text-[#898991] text-sm'>{`${user?.address.pin} ${user?.address.state}, ${user?.address.country}`}</p>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-5 mt-8">
                        <div>
                            <h2 className="font-semibold tracking-wider text-[#676769] text-md mt-2">
                                Invoice Number:
                            </h2>
                            <p className='text-lg mt-1'>3753759</p>
                        </div>
                        <div>
                            <h2 className="font-semibold tracking-wider text-[#676769] text-md mt-2">
                                Created on:
                            </h2>
                            <p className='text-lg mt-1'>12/11/2023</p>
                        </div>
                        <div>
                            <h2 className="font-semibold tracking-wider text-[#676769] text-md mt-2">
                                Due Date:
                            </h2>
                            <p className='text-lg mt-1'>12/11/2023</p>
                        </div>
                        <div>
                            <h2 className="font-semibold tracking-wider text-[#676769] text-md mt-2">
                                Bill Amount:
                            </h2>
                            <p className='text-lg mt-1'>23457 INR</p>
                        </div>
                    </div>

                    <div>
                        <HistoryDetailTable />
                    </div>

                    <div className="grid grid-cols-2 gap-5 mt-8">

                        <div className=' mt-3'>
                            <h2 className="uppercase font-semibold tracking-wider text-[#101011] text-sm mt-2">
                                Total Amount: 345334
                            </h2>
                            <h2 className="uppercase font-semibold tracking-wider text-[#101011] text-sm mt-2">
                                Amount Received: 833583
                            </h2>

                        </div>

                        <div className=' ml-36 mt-3'>
                            <h2 className="uppercase font-semibold tracking-wider text-[#101011] text-sm mt-2">
                                Subtotal: <span className=' ml-20'>23424</span>
                            </h2>
                            <h2 className="uppercase font-semibold tracking-wider text-[#101011] text-sm mt-2">
                                Avail Discount: <span className=' ml-11'>10%</span>
                            </h2>
                            <h2 className="uppercase font-semibold tracking-wider text-[#101011] text-sm mt-2">
                               TDS: 10%
                            </h2>
                        </div>
                    </div>
                </div>



                <div className="bg-white p-4 col-span-3 rounded-tl-md rounded-bl-md rounded-tr-md rounded-br-md">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold tracking-wider text-[#5a51be] text-xl mt-2">
                            Mode of Payment :
                        </h1>
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default InvoiceHistoryDetail;