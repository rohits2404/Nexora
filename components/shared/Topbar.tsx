import { OrganizationSwitcher, Show, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import Image from "next/image";
import Link from "next/link";

export function Topbar() {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/logo.svg" alt="logo" width={28} height={28} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">
                    Nexora
                </p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <Show when="signed-in">
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image
                                    src="/assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </Show>
                </div>

                <OrganizationSwitcher
                    appearance={{
                        theme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4",
                        },
                    }}
                />
            </div>
        </nav>
    );
}
