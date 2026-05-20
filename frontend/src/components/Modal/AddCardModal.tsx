import { useState } from "react";
import type { CreateCardInput } from "../../types";
import { createCard, fetchLogo } from "../../api";

interface AddCardModalProps {
  columnId: number;
  columnTitle: string;
  onClose: () => void;
  onBoardUpdate: () => void;
}

function AddCardModal({
  columnId,
  columnTitle,
  onClose,
  onBoardUpdate,
}: AddCardModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    url: "",
    notes: "",
  });

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove everything except numbers
    const numbers = e.target.value.replace(/\D/g, "");

    // Format with commas as user types
    const formatted = numbers
      ? new Intl.NumberFormat("en-US").format(Number(numbers))
      : "";

    setForm({ ...form, salary: formatted });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.company) {
      setError("Title and company are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Fetch company logo
      const logoUrl = await fetchLogo(form.company);

      const cardData: CreateCardInput = {
        title: form.title,
        company: form.company,
        location: form.location || undefined,
        salary: form.salary ? `$${form.salary}` : undefined,
        url: form.url || undefined,
        notes: form.notes || undefined,
        logoUrl: logoUrl || undefined,
        order: 0, // Backend will set correct order
      };

      await createCard(columnId, cardData);
      onBoardUpdate();
      onClose();
    } catch (error) {
      setError("Failed to create card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Add Job to {columnTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form fields */}
        <div className="flex flex-col gap-4">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Apple"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Cupertino, CA"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <span className="bg-gray-50 border-r border-gray-300 px-3 py-2 text-gray-500 text-sm">
                $
              </span>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleSalaryChange}
                placeholder="120,000"
                className="flex-1 px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Job URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job URL
            </label>
            <input
              type="text"
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="e.g. https://jobs.apple.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="e.g. Applied via LinkedIn"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Footer buttons */}
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
            {isSubmitting ? "Saving..." : "Save Job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCardModal;
