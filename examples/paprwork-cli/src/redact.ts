export function redact(text: string): string {
  return text
    .replace(/\b(?:sk|rk)_(?:test|live)_[A-Za-z0-9]+/g, '***')
    .replace(/\bwhsec_[A-Za-z0-9]+/g, '***')
    .replace(/\bBearer\s+\S+/gi, 'Bearer ***')
    .replace(/\bli_at=[^;\s]+/gi, 'li_at=***');
}
