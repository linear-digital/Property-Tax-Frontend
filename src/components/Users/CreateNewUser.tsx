import { Button, Modal } from 'antd';
import React from 'react';
import { Input, InputSelect } from '../global/InputFeilds';

const CreateNewUser = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const options = [
        {
            value: 'option1',
            label: 'Option 1',
        },
        {
            value: 'option2',
            label: 'Option 2',
        },
        {
            value: 'option3',
            label: 'Option 3',
        },
    ]
    return (
        <Modal open={open} onCancel={() => setOpen(false)}
            footer={null}
            title='Create New User'
            width={1000}
            centered
        >
            <form action="" className='flex flex-col gap-y-4 mt-5'>
                <Input label='Name' />
                <Input label='Email' type='email' />
                <Input label='Mobile Number' type='number' />
                <Input label='Designation' />
                <Input label='National ID' />
                <InputSelect label='State'
                    options={options}
                />
                <InputSelect label='Region'
                    options={options}
                />
                <InputSelect label='District'
                    options={options}
                />
                <InputSelect label='Village'
                    options={options}
                />
                <InputSelect label='Branch'
                    options={options}
                />
                <Input label='Password:'
                    type='password'
                />
                <Input label='Confirm Password:'
                    type='password'
                />

                <InputSelect label='Role:'
                    options={options}
                />
                <div>
                    <Button type='primary' size='large'>
                        Create User
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewUser;