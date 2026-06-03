import { useState } from "react";
import type { Card, UpdateCardInput, JobFormData } from "../../types";
import { updateCard, fetchLogo } from "../../api";
import JobForm from "./JobForm";

interface EditCardModalProps {
  card: Card;
  onClose: () => void;
  onBoardUpdate: () => void;
}

function EditCardModal({ card, onClose, onBoardUpdate }: EditCardModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatSalaryForDisplay = (
    salary: string | null | undefined,
  ): string => {
    if (!salary) return "";
    const numbers = salary.replace(/\D/g, "");
    if (!numbers) return "";
    return new Intl.NumberFormat("en-US").format(Number(numbers));
  };

  const [form, setForm] = useState<JobFormData>({
    title: card.title,
    company: card.company,
    location: card.location || "",
    salary: formatSalaryForDisplay(card.salary),
    url: card.url || "",
    notes: card.notes || "",
  });

  const handleSubmit = async () => {
    if (!form.title || !form.company) {
      setError("Job title and company are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      let logoUrl: string | undefined = card.logoUrl || undefined;
      if (form.company !== card.company) {
        const fetched = await fetchLogo(form.company);
        logoUrl = fetched || undefined;
      }

      const cardData: UpdateCardInput = {
        title: form.title,
        company: form.company,
        location: form.location || undefined,
        salary: form.salary ? `$${form.salary}` : undefined,
        url: form.url || undefined,
        notes: form.notes || undefined,
        logoUrl: logoUrl || undefined,
      };

      await updateCard(card.id, cardData);
      onBoardUpdate();
      onClose();
    } catch (err) {
      setError("Failed to update card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Edit Job</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Shared form */}
        <JobForm form={form} onChange={setForm} />

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-500 text-white rounded-lg py-2 text-sm hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCardModal;
