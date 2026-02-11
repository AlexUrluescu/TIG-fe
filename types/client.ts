export enum ClientStatus {
  DRAFT = "DRAFT",
  LE_CREATED = "LE_CREATED",
  LE_USER_CREATED = "LE_USER_CREATED",
  VHSK_READY = "VHSK_READY",
  DVO_CONFIG_DONE = "DVO_CONFIG_DONE",
  ACTIVE = "ACTIVE",
  FAILED = "FAILED",
  DELETED = "DELETED",
}

export interface Client {
  [key: string]: unknown;
  id: string;
  name: string;
  organisationId: string;
  customerInfo: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  ownerFirstName: string;
  ownerLastName: string;
  phoneNumber: string;
  email: string;
  status: ClientStatus;

  customerId?: string | null;
  deliveryAddress?: string | null;
  authorizedRecipients?: string | null;
  worldlineLeId?: string | null;
  worldlineLeEmail?: string | null;
  worldlineLeUserId?: string | null;
  createdAt: string;
  updatedAt: string;
}
