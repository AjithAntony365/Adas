"use client";
import { Button } from "@tremor/react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { NavLinkList } from "@/lib/navLinks";
import Addcompany from "./Add company";

const SideBar = () => {
    return (
        <nav className="bg-slate-600 min-h-full px-7 hidden sm:block">
            <ul>
                {NavLinkList?.map(item => (
                    <li key={item.id}>
                        <IconLink item={item} />
                    </li>
                ))}

<Addcompany/>

            </ul>
        </nav>
    )
}

const IconLink = ({ item }) => {
    const pathname = usePathname();
    const isActive = pathname === item.link;
    return (
        <div className="my-5">
            <Link href={item.link}>
                <Button
                    variant="light"
                    tooltip={item?.tooltip}
                    className={`p-2 rounded-md hover:text-white hover:bg-slate-500 ${isActive ? 'bg-slate-500 text-white ' : 'text-black'}`}
                    icon={item?.icon} />
            </Link>
        </div>
    );
};

export default SideBar;
export { IconLink };