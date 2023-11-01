import Link from "next/link";
import React from "react";

const BackToHub = () => {
    return (
        <Link href="/">
            <h2 className="z-50 py-4 px-5 rounded border border-gray-300 bg-gray-700 w-fit mx-auto my-4">
                Back to Hub
            </h2>
        </Link>
    );
};
export default BackToHub;
