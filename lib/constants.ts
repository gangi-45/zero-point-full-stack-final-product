export function waLink(whatsapp: string, text: string): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880") && digits.length === 13) {
    const national = `0${digits.slice(3)}`;
    return `${national.slice(0, 5)}-${national.slice(5)}`;
  }
  if (digits.length === 11 && digits.startsWith("01")) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return phone;
}
