"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../ui/Button";

interface EmployeeFilterProps {
  departments: string[];
  employee: string;
  setEmployee: (newEmployee: string) => void;
  lastLogin: Date | null;
  setLastLogin: (newLastLogin: Date | null) => void;
  department: string;
  setDepartment: (newDepartment: string) => void;
  isActive: string;
  setIsActive: (newStatus: string) => void;
  onFilter: () => void;
}

export default function EmployeeFilter({
  departments,
  onFilter,
  department,
  employee,
  lastLogin,
  isActive,
  setDepartment,
  setEmployee,
  setLastLogin,
  setIsActive,
}: EmployeeFilterProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleFilter = () => {
    onFilter();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Button
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
      >
        Filters
      </Button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 mt-2 w-80 bg-white border border-[#CBD5E0] rounded-md shadow-xl z-10 p-4 grid grid-cols-2 gap-4"
          role="dialog"
          aria-labelledby="filter-dialog-title"
          aria-modal="true"
        >
          <h2 id="filter-dialog-title" className="sr-only">
            Filter Options
          </h2>

          <div className="flex flex-col">
            <label htmlFor="employee" className="text-sm text-[#4A5568] mb-1">
              Employee
            </label>
            <input
              id="employee"
              type="text"
              placeholder="Employee"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="border rounded p-2 mb-2"
              aria-required="true"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastLogin" className="text-sm text-[#4A5568] mb-1">
              Last Login
            </label>
            <input
              id="lastLogin"
              type="date"
              value={lastLogin ? lastLogin.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setLastLogin(e.target.value ? new Date(e.target.value) : null)
              }
              className="border rounded p-2 mb-2"
              aria-required="false"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="department" className="text-sm text-[#4A5568] mb-1">
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border rounded p-2 mb-2"
              aria-required="true"
            >
              <option value="">All</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="text-sm text-[#4A5568] mb-1">
              Status
            </label>
            <select
              id="status"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className="border rounded p-2 mb-2"
              aria-required="true"
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="col-span-2">
            <Button onClick={handleFilter} aria-label="Apply filters">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
