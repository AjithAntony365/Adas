"use client";
import { Card, Flex, Icon, Text } from "@tremor/react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { IconLink } from "./SideBar";
import { signOut, useSession } from "next-auth/react";
import { MdDashboard } from "react-icons/md";
import { FaPeopleGroup, FaWarehouse, FaCar, FaBars } from "react-icons/fa6";
import Link from "next/link";
import { NavLinkList } from "@/lib/navLinks";
import { showSuccessNotification } from "@/lib/NotificationUtil";
import PlaceholderImage from "../../public/user_avatar.png"; // '../../../../../public/user_avatar.png'

// Function to filter and join classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Main NavBar component
const NavBar = () => {
  return (
    <nav>
      <Card className="p-2 mx-auto my-2 w-[98%]">
        <Flex className="justify-between md:justify-end">
          {/* Justify content between on small screens, justify-end on medium and larger screens */}
          <MobileNavLinks />
          <AvatarMenu />
        </Flex>
      </Card>
    </nav>
  );
};

export default NavBar;

// Avatar Menu component
const AvatarMenu = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center gap-2">
        {/* Display user name or 'Loading...' */}
        <Text>
          {session?.user?.name || 
          "Loading..."
           } 
        </Text>
        {/* Display user avatar image with a placeholder */}
        <Image
          // src='/avapic.jpg'
          src={PlaceholderImage}
          alt="ProfilePicture"
          width={40}
          height={40}
          className="rounded-full w-10 h-10"
        />
      </Menu.Button>
      {/* Menu transition animation */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-0 origin-top-right mt-1 py-1 ring-1 ring-black/5 w-44 rounded-md divide-y divide-gray-100 bg-white shadow-lg ">
          {/* User profile link */}
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profile"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>

          {/* Settings link */}
          {/* <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Settings
                            </a>
                        )}
                    </Menu.Item> */}

          {/* Sign out button */}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={async () => {
                  // localStorage.removeItem('userName');
                  // router.push('/login'); // Redirect to login page
                  showSuccessNotification("Logout successful"); // Display success notification
                  await signOut(); // Invalidate user session
                }}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "w-full text-left px-4 py-2 text-sm text-gray-700"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const MobileNavLinks = () => {
  return (
    <Menu as="div" className="relative block sm:hidden">
      <Menu.Button className="rounded-md p-0 hover:bg-slate-500/30 ">
        <Icon
          className="cursor-pointer p-1"
          icon={FaBars}
          variant="simple"
          size="md"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-1 w-40 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
          {NavLinkList?.map((item) => (
            <NavMenuItem key={item.id} item={item} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const NavMenuItem = ({ item }) => {
  return (
    <div className="p-1">
      <Menu.Item>
        {({ active }) => (
          <Link
            href={item.link}
            className={`${
              active ? "bg-slate-400 text-white " : "text-black"
            } flex w-full items-center rounded-md p-2 text-sm`}
          >
            <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
            {item.tooltip}
          </Link>
        )}
      </Menu.Item>
    </div>
  );
};
