export function getWhatsAppLink(phone: string, text: string): string {
  const onlyNumbers = phone.replace(/\D/g, '');
  if (!onlyNumbers) return "";
  
  const prefix = onlyNumbers.length <= 11 ? '55' : '';
  const message = encodeURIComponent(text);
  
  return `https://wa.me/${prefix}${onlyNumbers}?text=${message}`;
}

export function triggerWhatsAppAlert(phone: string, text: string) {
  if (!phone) return;
  const link = getWhatsAppLink(phone, text);
  if (link) {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
}
