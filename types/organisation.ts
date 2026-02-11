export enum OrganisationType {
  ADMIN = "ADMIN",
  AUDIT = "AUDIT",
  RESELLER = "RESELLER",
}

export enum OrganisationStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export interface Organisation {
  [key: string]: unknown;

  id: string;
  name: string;
  code: string;
  organisationType: OrganisationType;
  status: OrganisationStatus;

  worldlineDvoId?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  address?: string | null;

  createdAt: string;
  updatedAt: string;
}
