import Link from "next/link";
import React from "react";

function Logo() {
	return (
		<Link
			href={"/"}
			className="font-bold text-3xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500  text-transparent bg-clip-text "
		>
			FormFlow
		</Link>
	);
}

export default Logo;
