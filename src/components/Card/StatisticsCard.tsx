import React from 'react';
import { Building, DollarSign, FileText, AlertCircle } from 'lucide-react';

interface StatisticsCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    bgColor: string;
    iconBg: string;
}

const DashboardCard: React.FC<StatisticsCardProps> = ({ title, value, icon, bgColor, iconBg }) => {
    return (
        <div className={`${bgColor} rounded-xl p-6 text-white relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-white/80 text-sm font-medium mb-2">{title}</h3>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
                <div className={`${iconBg} p-3 rounded-lg bg-white/10`}>
                    {icon}
                </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 transform translate-x-8 -translate-y-8"></div>
        </div>
    );
};

const StatisticsCard: React.FC = () => {
    const cards = [
        {
            title: 'Total Properties',
            value: '18,671',
            icon: <Building size={24} />,
            bgColor: 'bg-primary',
            iconBg: 'bg-blue-400/20'
        },
        {
            title: 'Total Payments',
            value: '$116,543.00',
            icon: <DollarSign size={24} />,
            bgColor: 'bg-accent',
            iconBg: 'bg-emerald-400/20'
        },
        {
            title: 'Total Discounts',
            value: '$35,334.00',
            icon: <FileText size={24} />,
            bgColor: 'bg-secondary',
            iconBg: 'bg-orange-400/20'
        },
        {
            title: 'Total Bills Due',
            value: '$206,647.00',
            icon: <AlertCircle size={24} />,
            bgColor: 'bg-error',
            iconBg: 'bg-red-400/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-5">
            {cards.map((card, index) => (
                <DashboardCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    bgColor={card.bgColor}
                    iconBg={card.iconBg}
                />
            ))}
        </div>
    );
};

export default StatisticsCard;

