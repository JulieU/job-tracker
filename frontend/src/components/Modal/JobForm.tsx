import type { JobFormData } from "../../types";

interface JobFormProps {
  form: JobFormData;
  onChange: (form: JobFormData) => void;
}

function JobForm({ form, onChange }: JobFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/\D/g, "");
    const formatted = numbers
      ? new Intl.NumberFormat("en-US").format(Number(numbers))
      : "";
    onChange({ ...form, salary: formatted });
  };

  return (
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
  );
}

export default JobForm;
