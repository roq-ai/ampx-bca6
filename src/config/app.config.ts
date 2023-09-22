interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Staff Member', 'Manager', 'Administrator', 'End Customer'],
  tenantName: 'Company',
  applicationName: 'AMPX',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage user information',
    'Manage company information',
    'Manage appointments',
    'Manage charge stations',
    'Manage vehicle information',
    'Manage charging history',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/e3a5c272-519b-4a24-b756-244173a1322b',
};
