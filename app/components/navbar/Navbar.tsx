'use client';


import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
                className="
                    py-4
                    border-b-[1px]
                "
                >
                <Container>
                    <div
                        className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                        "
                    >
                     <Logo />
                      
                     <Search />     
                     {/* SafeUser types applied to ensure serializable (refer to app/types/index.ts)
                     Serializable in react do not support 'date' object*/}
                     <UserMenu currentUser={currentUser}/>
                    </div>
                    
                </Container>

            </div>
        </div>
    );
}

export default Navbar;