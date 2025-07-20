"use client"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

// Filter Dropdown Component
export function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 border border-neutral-300 rounded hover:border-neutral-400 transition-colors min-w-[120px] justify-between"
      >
        <span className="truncate">
          {label === "Recommended" ? value : value === `All ${label}s` || value === `All ${label}` ? label : value}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-300 rounded shadow-lg z-20 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 transition-colors ${
                  value === option ? "bg-neutral-100 text-neutral-900" : "text-neutral-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}