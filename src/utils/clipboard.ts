import { showError, showSuccess } from "./toast";

export const copyToClipboard = async (text: string, successMessage: string = "Copiado para a área de transferência!") => {
  try {
    await navigator.clipboard.writeText(text);
    showSuccess(successMessage);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    showError("Falha ao copiar. Verifique as permissões do navegador.");
  }
};