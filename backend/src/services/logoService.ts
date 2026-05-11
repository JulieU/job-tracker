import { LogoResult } from "../types";

export const getCompanyLogo = async (company: string): Promise<LogoResult> => {
  try {
    const apiKey = process.env.LOGO_DEV_API_KEY;
    const domain = `${company.toLowerCase().replace(/\s+/g, "")}.com`;
    const logoUrl = `https://img.logo.dev/${domain}?token=${apiKey}&size=80&format=png`;

    // Verify that logo exists by calling the URL
    const response = await fetch(logoUrl);

    if (response.ok) {
      return { logoUrl };
    }
    return { logoUrl: null };
  } catch (error) {
    // Since logo is not required, we can return null if there's an error (e.g., network issue, invalid API key)
    return { logoUrl: null };
  }
};
