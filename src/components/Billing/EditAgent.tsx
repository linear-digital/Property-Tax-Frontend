import React, { useEffect } from 'react';
import type { User } from '../../types/user';
import { Button, Modal } from 'antd';
import { Input, InputSelect } from '../global/InputFeilds';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';

const EditAgent = ({ agent, open, setOpen, refetch }: { agent: User, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, refetch: () => void }) => {
    const [info, setInfo] = React.useState({
        name: agent?.name || '',
        float_balance: agent?.float_balance || 0,
        status: agent?.status || ''
    });
    useEffect(() => {
        setInfo({
            name: agent?.name || '',
            float_balance: agent?.float_balance || 0,
            status: agent?.status || ''
        })
    }, [agent])
    const updateAgent = async () => {
        try {
            await fetcher({
                path: `/user/${agent._id}`,
                method: 'PUT',
                body: info
            });
            refetch();
            toast.success("Agent updated successfully")
            setOpen(false)
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    return (
        <Modal title="Edit Agent" open={open} onCancel={() => setOpen(false)} footer={null} width={800}>
            <div className="flex flex-col gap-y-4 items-start">
                <Input label="Agent Name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} />
                <Input
                    type='number'
                    label="Float Balance" value={info.float_balance} onChange={(e) => setInfo({ ...info, float_balance: Number(e.target.value) })} />
                <InputSelect
                    options={[
                        { value: 'approved', label: 'Approved' },
                        { value: 'rejected', label: 'Rejected' },
                        { value: 'pending', label: 'Pending' },
                    ]}
                    label="Status" value={info.status} onChange={(e) => setInfo({ ...info, status: e })} />
                <Button
                    onClick={updateAgent}
                    type="primary">Update</Button>
            </div>
        </Modal>
    );
};

export default EditAgent;