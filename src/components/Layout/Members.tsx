import { faLink, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { fetcher } from "../../util/axios.instance";
import type { User } from "../../types/user";


const Users = ({ query }: { query: string }) => {
    const { data } = useQuery({
        queryKey: ["users", query],
        queryFn: () => {
            return fetcher({ path: "/user" });
        },
        enabled: !!query
    })
    const users: User[] = data || []
    return (
        <div>
            <div className="py-2 text-xs font-semibold dark:text-white text-dark uppercase tracking-wider mt-5">
                Users
            </div>
            {(query ? users : []).length < 1 ? <span>
                <div className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FontAwesomeIcon icon={faLink} />
                    <span className="ml-3">No results found</span>
                </div>
            </span> : (query ? users : []).map((page) => {
                return (
                    <Link
                        to={`/users/list/${page._id}`}
                        key={page._id}
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-x-3"
                    >
                        <FontAwesomeIcon icon={faUser} />
                        <div className="flex flex-col items-start">
                            <span className="">{page.name}</span>
                            <p className="text-xs">{page.roles.map(role => role.name).join(", ")}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Users;