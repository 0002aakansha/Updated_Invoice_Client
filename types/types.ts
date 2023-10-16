export interface dataProps {
  _id: string;
  id: number;
  description: string;
  period?: string;
  workingDays?: string;
  totalWorkingDays?: string;
  hours?: string;
  amount?: string | number;
  projectAmount?: number;
  rate?: { currency: string; rate: string };
  conversionRate?: number;
  checked: boolean;
  projectBelongsTo?: string;
}
export interface rateType {
  currency: string;
  rate: number;
}

export interface childrenProps {
  children: JSX.Element | JSX.Element[] | string;
}

export interface loginType {
  email: string;
  password: string;
}


export interface userType {
  _id?: string;
  name: string;
  email: string;
  gstin: string;
  pan: string;
  account: {
    acc_no: number | string;
    bank: string;
    ifsc: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pin: number | string;
    country: string;
  };
  contact: number | string;
}
export interface addressType {
  street: string;
  city: string;
  pin: string;
  state: string;
  country: string;
}

export interface clientType {
  _id?: string;
  name: string;
  gstin: string;
  address: addressType;
}

export interface projectType {
  _id: string;
  description: string;
  rate: {
    currency: string;
    rate: number;
  };
  projectAmount: number;
  conversionRate: number;
  projectBelongsTo?: string;
}

export interface userStateType {
  user: userType;
  isLoading: boolean;
  error: string;
}

export interface projectStateType {
  projects: projectType[];
  created: boolean;
  isLoading: boolean;
  error: { status: number | string; message: string };
}

export interface clientStateType {
  clients: clientType[];
  created: boolean;
  clientById: clientType;
  clientState: string;
  projects: projectType[];
  isLoading: boolean;
  isHidden: boolean;
  error?: { status: number | string; message: string };
}

export interface invoiceStateType {
  invoiceType: string;
  invoiceNumber: string,
  Date: Date,
  DueDate: Date,
  isChecked: boolean;
  detailedProject: dataProps[];
  subtotal: number;
  GST: { CGST: number; SGST: number } | number;
  GrandTotal: number;
}

export interface PdfPreviewProps {
  invoice: {
    invoice: dataProps[] | undefined,
    invoiceType: string,
    invoiceNumber: string,
    Date: Date,
    DueDate: Date
  },
  user: userType,
  client: clientType,
  total: {
    subtotal: number;
    GST: { CGST: number; SGST: number } | number;
    GrandTotal: number;
  }
}