import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router';
import { Input } from '../global/InputFeilds';
import permissions from '../../util/permissions';
import { Button, Checkbox } from 'antd';

const CreateRole = () => {
    return (
        <div className='my-5'>
            <div className="flex items-center justify-between mb-4">
                <h3 className='text-xl dark:text-white text-dark font-semibold '>
                    Add New Role
                </h3>
                <Link to={'/roles'} className='text-primary'>
                    <FontAwesomeIcon icon={faArrowLeftLong} />    Back to Roles
                </Link>
            </div>
            <form
                className='p-4 bg-white dark:bg-background-dark mt-5 rounded-lg'
            >
                <Input label='Role Name' />
                <div className="grid grid-cols-2 gap-2 mt-5">
                    {
                    permissions.map((permission, index) => (
                        <Checkbox value={permission.value} key={index}>{permission.label}</Checkbox>
                    ))
                }
                </div>
                <Button type='primary' className='mt-5'>Create Role</Button>
            </form>
        </div>
    );
};

export default CreateRole;