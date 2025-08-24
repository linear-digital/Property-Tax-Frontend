/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import { Input, TextArea } from '../global/InputFeilds';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';

const Waafipay = ({ open, setOpen, refetch, payment }: { open: boolean, setOpen: any, refetch: any, payment: any }) => {
    const [accountNumber, setAccountNumber] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    useEffect(() => {
        if (!description || description === "Payment for Invoice ") {
            setDescription(`Payment for Invoice ${payment?.invoice_number}`);
        }
    }, [payment])
    const [response, setResponse] = React.useState<any>(null);
    const handleSubmit = async () => {
        try {
            const referenceId = payment?.invoice_id;
            const currency = "USD"
            const newPayment = {
                amount: payment?.paid_amount,
                accountNumber,
                description,
                referenceId,
                currency
            }
            const res = await fetcher({
                path: `/waafipay/preauthorize`,
                method: 'POST',
                body: newPayment
            })
            toast.success(res?.message || "Payment initiated successfully");
            setResponse(res?.details);
        } catch (error: any) {
            toast.error(errorMessage(error));
            setResponse(error?.response?.data?.details || null);
        }
    }
    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={800} centered title="Waafipay Payment"
        destroyOnHidden
        >
            <div className="flex flex-col gap-y-3 mt-5">
                <Input
                    label='Ammount Number'
                    placeholder='Enter Ammount'
                    disabled
                    value={payment?.paid_amount}
                />
                <Input
                    label='Waafipay Number'
                    placeholder='Enter Waafipay Number'
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <TextArea
                    label='Description'
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p>
                    {response && JSON.stringify(response)}
                </p>
                <Button
                    className='self-end mt-6'
                    onClick={handleSubmit}
                    disabled={!accountNumber || !description}
                >
                    Submit
                </Button>
            </div>
        </Modal>
    );
};

export default Waafipay;