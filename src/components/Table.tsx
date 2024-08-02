"use client";

import type {
  BloodPressure,
  BloodPressureReadings,
  TableHeaders,
} from "@/types/blood-pressure-readings";

const headers: TableHeaders = [
  { id: "1", header: "Zeit" },
  { id: "2", header: "Systole" },
  { id: "3", header: "Diastole" },
  { id: "4", header: "Puls" },
];

export default function Table({ data }: { data: BloodPressureReadings }) {
  const keys = Object.keys(data);
  return (
    <>
      {keys.map((k) => (
        <div key={k.toLowerCase()}>
          <h2 className="pb-1">
            {new Date(k).toLocaleDateString("de", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </h2>
          <table className="w-full md:w-2/3">
            <thead className="rounded-md border border-slate-300 bg-slate-200 text-left">
              <tr>
                {headers.map((header) => (
                  <th key={header.id} className="pb-4 pl-1 pt-4">
                    {header.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-slate-100">
              {data[k].map((row: BloodPressure) => (
                <tr key={row.id}>
                  {Object.keys(row).map((cell) => {
                    if (row[cell as keyof BloodPressure] instanceof Date) {
                      return (
                        <td
                          key={row.id + "_" + cell}
                          className="border-b border-slate-200 pb-1 pl-1 pt-1"
                        >
                          {/* @ts-ignore */}
                          {row[cell as keyof BloodPressure].toLocaleTimeString(
                            "de",
                          )}
                        </td>
                      );
                    } else if (cell !== "id") {
                      return (
                        <td
                          key={row.id + "_" + cell}
                          className="border-b border-slate-200 pb-1 pl-1 pt-1"
                        >
                          {String(row[cell as keyof BloodPressure])}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-10" />
        </div>
      ))}
    </>
  );
}
