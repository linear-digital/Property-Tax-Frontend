import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";


const Pages = ({ query }: { query: string }) => {
    const pages = [
        { id: "/", label: "Dashboard" },
        { id: "properties/property", label: "Properties < Manage Properties" },
        { id: "properties/edit-request", label: "Properties < Proprty Edit Request" },

        { id: "/billing/invoices", label: "Billing < Tax Invoice" },
        { id: "/billing/payments", label: "Billing < Payments" },
        { id: "/billing/summarys", label: "Billing < Tax Collection Summary" },
        { id: "/billing/agents", label: "Billing < Agents" },
        { id: "/billing/agent-float", label: "Billing < Agent Float" },
        { id: "/billing/commissions", label: "Billing < Commissions" },

        { id: "/unauthorized-payments", label: "Unauthorised Payments" },
        { id: "billing/authorised", label: "Authorised Payments" },

        { id: "locations/states", label: "Locations < States" },
        { id: "locations/regions", label: "Locations < Regions" },
        { id: "locations/districts", label: "Locations < Districts" },
        { id: "locations/villages", label: "Locations < Villages" },
        { id: "locations/branches", label: "Locations < Branches" },

        { id: "users/list", label: "Users < List" },

        { id: "/roles", label: "Roles & Permissions < Roles" },
        { id: "/roles", label: "Roles & Permissions < Permissions" }
    ]
    return (
        <div>
            <div className="py-2 text-xs font-semibold dark:text-white text-dark uppercase tracking-wider">
                Pages
            </div>
            {(query ? pages.filter((page) => page.label.toLowerCase().includes(query.toLowerCase())) : []).length < 1 ? <span>
                <div className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FontAwesomeIcon icon={faLink} />
                    <span className="ml-3">No results found</span>
                </div>
            </span> : (query ? pages.filter((page) => page.label.toLowerCase().includes(query.toLowerCase())) : []).map((page) => {
                return (
                    <Link
                        to={page.id}
                        key={page.id}
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <FontAwesomeIcon icon={faLink} />
                        <span className="ml-3">{page.label}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default Pages;