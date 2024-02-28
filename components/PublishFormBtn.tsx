import React from "react";
import { MdOutlinePublish } from "react-icons/md";
import { Button } from "./ui/button";

function PublishFormBtn() {
	return (
		<Button className="gap-2 text-white bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 ">
			<MdOutlinePublish className="h-4 w-4" />
			PublishFormBtn
		</Button>
	);
}

export default PublishFormBtn;
