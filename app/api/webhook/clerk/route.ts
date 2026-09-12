import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import {
    addMemberToCommunity,
    createCommunity,
    deleteCommunity,
    removeUserFromCommunity,
    updateCommunityInfo,
} from "@/lib/actions/community.actions";

type OrganizationData = {
    id: string;
    name: string;
    slug: string;
    logo_url?: string | null;
    image_url?: string | null;
    created_by?: string;
};

type OrganizationMembershipData = {
    organization: {
        id: string;
    };
    public_user_data: {
        user_id: string;
    };
};

export const POST = async (request: NextRequest) => {
    let evt;

    try {
        // verifyWebhook reads the svix headers + raw body and validates the
        // signature using CLERK_WEBHOOK_SIGNING_SECRET internally.
        evt = await verifyWebhook(request);
    } catch (err) {
        console.error("Webhook verification failed:", err);

        return NextResponse.json(
            { message: "Invalid webhook" },
            { status: 400 },
        );
    }

    const eventType = evt.type;

    if (eventType === "organization.created") {
        const data = evt.data as unknown as OrganizationData;

        const { id, name, slug, logo_url, image_url, created_by } = data;

        try {
            await createCommunity(
                id,
                name,
                slug,
                logo_url || image_url || "",
                "org bio",
                created_by || "",
            );

            return NextResponse.json(
                { message: "Organization created" },
                { status: 201 },
            );
        } catch (err) {
            console.error(err);

            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 },
            );
        }
    }

    if (eventType === "organizationInvitation.created") {
        console.log("Invitation created", evt.data);

        return NextResponse.json(
            { message: "Invitation created" },
            { status: 201 },
        );
    }

    if (eventType === "organizationMembership.created") {
        const data = evt.data as unknown as OrganizationMembershipData;

        try {
            const { organization, public_user_data } = data;

            console.log("Membership created", evt.data);

            await addMemberToCommunity(
                organization.id,
                public_user_data.user_id,
            );

            return NextResponse.json(
                { message: "Invitation accepted" },
                { status: 201 },
            );
        } catch (err) {
            console.error(err);

            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 },
            );
        }
    }

    if (eventType === "organizationMembership.deleted") {
        const data = evt.data as unknown as OrganizationMembershipData;

        try {
            const { organization, public_user_data } = data;

            console.log("Membership removed", evt.data);

            await removeUserFromCommunity(
                public_user_data.user_id,
                organization.id,
            );

            return NextResponse.json(
                { message: "Member removed" },
                { status: 201 },
            );
        } catch (err) {
            console.error(err);

            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 },
            );
        }
    }

    if (eventType === "organization.updated") {
        const data = evt.data as unknown as OrganizationData;

        const { id, logo_url, name, slug } = data;

        try {
            console.log("Organization updated", evt.data);

            await updateCommunityInfo(id, name, slug, logo_url || "");

            return NextResponse.json(
                { message: "Organization updated" },
                { status: 201 },
            );
        } catch (err) {
            console.error(err);

            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 },
            );
        }
    }

    if (eventType === "organization.deleted") {
        const data = evt.data as unknown as OrganizationData;

        try {
            console.log("Organization deleted", evt.data);

            await deleteCommunity(data.id);

            return NextResponse.json(
                { message: "Organization deleted" },
                { status: 201 },
            );
        } catch (err) {
            console.error(err);

            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 },
            );
        }
    }

    return NextResponse.json({ message: "Unhandled event" }, { status: 200 });
};
