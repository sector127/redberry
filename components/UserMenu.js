import  {ArrowDown, ShoppingCart} from "@/lib/icons"
import Image from "next/image"

export const UserMenu = () => {
    return (
        <div className="flex justify-between items-center w-[108px]">
            <ShoppingCart/>
            <div className="flex justify-between items-center w-16">
            <Image src="/assets/images/avatar.png" alt="avatar" width={40} height={40} className="rounded-full object-cover cursor-pointer"/>
            <ArrowDown/>
            </div>
        </div>
    )
}