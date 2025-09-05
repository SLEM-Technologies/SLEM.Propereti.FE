/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notification } from './Notification';
export type data = {
    id?: number;
    domain?: string | null;
    amount?: number;
    currency?: string | null;
    due_date?: any;
    has_invoice?: boolean;
    invoice_number?: any;
    description?: string | null;
    pdf_url?: any;
    line_items?: Array<any> | null;
    tax?: Array<any> | null;
    request_code?: string | null;
    status?: string | null;
    paid?: boolean;
    paid_at?: string;
    metadata?: any;
    notifications?: Array<Notification> | null;
    offline_reference?: string | null;
    customer?: number;
    created_at?: string;
};

