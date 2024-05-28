import { Button, Card, TextInput } from "@tremor/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setSearchTerm }) => {
    const [isOpen, setIsOpen] = useState(false); // Define isOpen state variable
    return (
        <>
            <div className="relative md:hidden">
                <Button icon={FaSearch} onClick={() => setIsOpen(prevState => !prevState)} />
                {isOpen && (
                    <Card className="absolute w-30 z-10 p-2">
                        <TextInput
                            className=""
                            icon={FaSearch}
                            placeholder="Search..."
                            onValueChange={setSearchTerm}
                        />
                    </Card>
                )}
            </div>
            <TextInput
                className="hidden md:flex max-w-sm"
                icon={FaSearch}
                placeholder="Search..."
                onValueChange={setSearchTerm}
            />
        </>
    )
}

export default SearchBar;