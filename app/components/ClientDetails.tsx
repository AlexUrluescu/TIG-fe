"use client";

import { Client } from "@/types/client";

interface ClientDetailsProps {
  client: Client;
  handleOrganisationClick?: (orgId: string) => void;
  threadble?: boolean;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({
  client,
  handleOrganisationClick,
  threadble,
}) => {
  const detailRowClass = "w-full border-b border-[#F2F2F3] p-2 flex";
  const detailLabelClass = "text-[11px] font-bold w-[50%] text-start";
  const detailValueClass = "text-[11px] font-medium w-[50%] text-start";

  const formatStatus = (status: string) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <>
      <div className={detailRowClass}>
        <span className={detailLabelClass}>User ID</span>
        <span className={detailValueClass}>{client.id}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Organization ID</span>
        <span className={detailValueClass}>
          {threadble && handleOrganisationClick ? (
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => handleOrganisationClick(client.organisationId)}
            >
              {client.organisationId}
            </span>
          ) : (
            client.organisationId
          )}
        </span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Customer Info</span>
        <span className={detailValueClass}>{client.customerInfo}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Street</span>
        <span className={detailValueClass}>{client.street}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>City</span>
        <span className={detailValueClass}>{client.city}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Zip Code</span>
        <span className={detailValueClass}>{client.zipCode}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Country</span>
        <span className={detailValueClass}>{client.country}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Owner First Name</span>
        <span className={detailValueClass}>{client.ownerFirstName}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Owner Last Name</span>
        <span className={detailValueClass}>{client.ownerLastName}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Phone number</span>
        <span className={detailValueClass}>{client.phoneNumber}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Email</span>
        <span className={detailValueClass}>{client.email}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Customer ID</span>
        <span className={detailValueClass}>{client.customerId || "-"}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Delivery Address</span>
        <span className={detailValueClass}>
          {client.deliveryAddress || "-"}
        </span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Authorized Recipients</span>
        <span className={detailValueClass}>
          {client.authorizedRecipients || "-"}
        </span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Status</span>
        <span className={detailValueClass}>{formatStatus(client.status)}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Worldline Email Address</span>
        <span className={detailValueClass}>
          {client.worldlineLeEmail || "-"}
        </span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Worldline Le ID</span>
        <span className={detailValueClass}>{client.worldlineLeId || "-"}</span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Worldline Le User Id</span>
        <span className={detailValueClass}>
          {client.worldlineLeUserId || "-"}
        </span>
      </div>

      <div className={detailRowClass}>
        <span className={detailLabelClass}>Created at</span>
        <span className={detailValueClass}>{client.createdAt}</span>
      </div>

      <div className="w-full p-2 flex">
        <span className={detailLabelClass}>Updated at</span>
        <span className={detailValueClass}>{client.updatedAt}</span>
      </div>
    </>
  );
};

export default ClientDetails;
