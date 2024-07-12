import { BiSolidErrorAlt } from "react-icons/bi";

import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something Went wrong!"
            backButtonLabel={"Back to Login"}
            backButtonHref={"/auth/login"}
        >
            <div className="w-full flex justify-center items-center">
                <BiSolidErrorAlt size={50} color="red"></BiSolidErrorAlt>
            </div>
        </CardWrapper>
    );
};
