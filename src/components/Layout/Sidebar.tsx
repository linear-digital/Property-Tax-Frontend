import React, { useEffect, useState } from 'react';
import {
    Home,
    Building,
    CreditCard,
    MapPin,
    Users,
    Shield,
    ChevronRight,
    ChevronDown,
    Settings,
    X,
    CircleDot
} from 'lucide-react';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    children?: SidebarItem[];
    active?: boolean;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    width: number; // Optional prop for width, if needed
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, width }) => {
    const [expandedItems, setExpandedItems] = useState<string[]>(['users']);
    const [isHovered, setIsHovered] = useState(true);
    useEffect(() => {
        if (isHovered) {
            setExpandedItems([])
        }
    }, [isHovered]);
    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const sidebarItems: SidebarItem[] = [
        {
            id: 'home',
            label: 'Home',
            icon: <Home size={18} />,
            active: true
        },
        {
            id: 'properties',
            label: 'Properties',
            icon: <Building size={18} />,
        },
        {
            id: 'billing',
            label: 'Billing',
            icon: <CreditCard size={18} />,
        },
        {
            id: 'unauthorised',
            label: 'Unauthorised Payments',
            icon: <div className="w-4 h-4 border border-current rounded-sm" />,
        },
        {
            id: 'authorised',
            label: 'Authorised Payments',
            icon: <div className="w-4 h-4 border border-current rounded-sm bg-current/20" />,
        },
        {
            id: 'locations',
            label: 'Locations',
            icon: <MapPin size={18} />,
        },
        {
            id: 'users',
            label: 'Users',
            icon: <Users size={18} />,
            children: [
                { id: 'list', label: 'List', icon: null, active: true }
            ]
        },
        {
            id: 'roles',
            label: 'Roles & Permissions',
            icon: <Shield size={18} />,
        }
    ];

    const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
        const isExpanded = expandedItems.includes(item.id);
        const hasChildren = item.children && item.children.length > 0;
        const showExpanded = isHovered

        return (
            <div key={item.id}>
                <div
                    className={`flex items-center justify-between cursor-pointer transition-all duration-200 ${item.active
                        ? 'to-[#A096F5]  bg-linear-to-r from-[#7468F0]  text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        } ${level > 0
                            ? `py-2 ${showExpanded ? 'pl-12 pr-4' : 'pl-4 pr-2'} text-sm`
                            : `py-3 ${showExpanded ? 'px-4' : 'px-3'}`
                        } ${level === 0 ? 'mx-2 rounded-lg' : ''
                        }`}
                    onClick={() => hasChildren && showExpanded && toggleExpanded(item.id)}
                >
                    <div className="flex items-center justify-center space-x-3 min-w-0">
                        {item.icon && (
                            <span className={`flex-shrink-0 ${item.active ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                {item.icon}
                            </span>
                        )}
                        {
                            isHovered && <span
                                className={`text-sm transition-all duration-200 ${level > 0 ? 'text-xs' : ''
                                    } ${showExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                                    }`}
                            >
                                {item.label}
                            </span>
                        }
                    </div>
                    {hasChildren && isHovered && showExpanded && (
                        <span className="text-gray-400 flex-shrink-0">
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                    )}
                </div>

                {hasChildren && isExpanded && showExpanded && (
                    <div>
                        {item.children?.map(child => renderSidebarItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className={`fixed inset-0 bg-[#00000022] z-40 ${width < 1200 ? 'block' : 'hidden'}`}
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`${(width < 1200 && !isOpen) ? 'hidden' : ''} ${width < 1200 ? 'fixed' : 'relative'} inset-y-0 left-0 z-50 bg-white dark:bg-background-dark border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    } ${isHovered ? 'min-w-[260px]' : 'max-w-16 overflow-hidden'
                    } md:w-auto`}
                onMouseEnter={() => !isHovered && setIsHovered(true)}
                onMouseLeave={() => !isHovered && setIsHovered(false)}
            >
                {/* Header */}
                <div className={`p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-200 ${isHovered || isOpen ? 'block' : 'hidden '
                    }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Building className="text-white" size={20} />
                            </div>
                            <h1 className={`text-gray-900 dark:text-white font-semibold text-lg transition-all duration-200 ${isHovered ? 'block' : 'hidden -translate-x-2'
                                }`}>
                                Property Tax
                            </h1>
                        </div>
                        {/* Mobile Close Button */}
                        <button
                            onClick={onClose}
                            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X size={20} />
                        </button>
                        <button
                            onClick={() => setIsHovered(!isHovered)}
                            className='text-gray-600 dark:text-white'
                        >
                            <CircleDot size={20} />
                        </button>
                    </div>
                </div>

                {/* Collapsed Header - Logo Only */}
                <div className={`p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-200 ${isHovered || isOpen ? 'opacity-0 absolute' : 'opacity-100'
                    } hidden md:block`}>
                    <div className="flex justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Building className="text-white" size={20} />
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-4 px-2 space-y-1">
                    {sidebarItems.slice(0, 1).map(item => renderSidebarItem(item))}
                    {/* Section Headers */}
                    <div className={`px-2 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}>
                        Properties & Ownership
                    </div>

                    {sidebarItems.slice(1, 2).map(item => renderSidebarItem(item))}

                    <div className={`px-2 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all duration-200 ${isHovered || isOpen ? 'opacity-100' : 'opacity-0'
                        }`}>
                        Bills & Payments
                    </div>

                    {sidebarItems.slice(2, 5).map(item => renderSidebarItem(item))}

                    <div className={`px-2 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all duration-200 ${isHovered || isOpen ? 'opacity-100' : 'opacity-0'
                        }`}>
                        Location Settings
                    </div>

                    {sidebarItems.slice(5, 6).map(item => renderSidebarItem(item))}

                    <div className={`px-2 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all duration-200 ${isHovered || isOpen ? 'opacity-100' : 'opacity-0'
                        }`}>
                        Users & Roles
                    </div>

                    {sidebarItems.slice(6).map(item => renderSidebarItem(item))}
                </nav>

                {/* Settings at bottom */}
                <div className="absolute bottom-4 left-0 right-0 px-2">
                    <div
                        className={`flex items-center cursor-pointer transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg ${isHovered || isOpen ? 'px-4 py-3' : 'px-3 py-3'
                            }`}
                    >
                        <div className="flex items-center space-x-3 min-w-0">
                            <span className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                                <Settings size={18} />
                            </span>
                            <span
                                className={`text-sm transition-all duration-200 ${isHovered || isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                                    }`}
                            >
                                Settings
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;