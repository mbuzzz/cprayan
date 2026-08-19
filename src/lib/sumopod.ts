/**
 * Sumopod Payment Gateway Client (Sandbox / Production)
 * Documentation: https://api-pay-sandbox.sumopod.com
 */

export interface CreatePaymentParams {
  orderId: string;
  amount: number;
  currency?: string;
  expiresInHours?: number;
  successReturnUrl: string;
  cancelReturnUrl: string;
  paymentMethodTypeCode?: string; // e.g. "QRIS", "VA", "BANK_TRANSFER"
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface SumopodPaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  qrCodeUrl?: string;
  qrString?: string;
  status?: string;
  rawResponse?: any;
  error?: string;
}

export async function createSumopodPayment(params: CreatePaymentParams): Promise<SumopodPaymentResponse> {
  const apiKey = process.env.SUMOPOD_API_KEY || "166b0a48cccd4de36594ac8abe8b86f24e3276b24a7323dcbed9863a8daa4cef";
  const baseUrl = process.env.SUMOPOD_BASE_URL || "https://api-pay-sandbox.sumopod.com/api/v1";

  const payload = {
    order_id: params.orderId,
    amount: Math.round(params.amount),
    currency: params.currency || "IDR",
    expires_in_hours: params.expiresInHours || 24,
    success_return_url: params.successReturnUrl,
    cancel_return_url: params.cancelReturnUrl,
    payment_method_type_code: params.paymentMethodTypeCode || "QRIS",
    customer_name: params.customerName,
    customer_email: params.customerEmail,
    customer_phone: params.customerPhone,
  };

  try {
    const response = await fetch(`${baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Sumopod API Error:", data);
      return {
        success: false,
        error: data.message || data.error || `Error ${response.status}: Failed to create Sumopod payment`,
        rawResponse: data,
      };
    }

    // Extract relevant payment fields from Sumopod response
    const paymentId = data.data?.id || data.payment_id || data.id || params.orderId;
    const paymentUrl =
      data.data?.payment_url ||
      data.data?.payment_link_url ||
      data.payment_url ||
      data.payment_link_url ||
      data.checkout_url ||
      data.redirect_url;
    const qrCodeUrl = data.data?.qr_code_url || data.qr_code_url || data.qr_image;
    const qrString = data.data?.qr_string || data.qr_string;

    return {
      success: true,
      paymentId,
      paymentUrl,
      qrCodeUrl,
      qrString,
      status: data.data?.status || data.status || "PENDING",
      rawResponse: data,
    };
  } catch (error: any) {
    console.error("Sumopod Fetch Exception:", error);
    return {
      success: false,
      error: error.message || "Network error connecting to Sumopod Payment Gateway",
    };
  }
}
