import type React from "react"
import { VscEye, VscEyeClosed } from "react-icons/vsc"

export const getPasswordIcon = (isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    return isVisible ? (
        <VscEye cursor={"pointer"} onClick={() => setIsVisible((prev) => !prev)}/>
    ) : (
        <VscEyeClosed cursor={"pointer"} onClick={() => setIsVisible((prev) => !prev)} />
    )
}