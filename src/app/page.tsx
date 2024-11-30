"use client";

import Table from "@/components/Table";
import type { BloodPressureReadings } from "@/types/blood-pressure-readings";
import { nanoid } from "nanoid";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function Home() {
  const [patientName, setPatientName] = useState<string>("");
  const [patientInsurance, setPatientInsurance] = useState<string>("");
  const [bpData, setBpData] = useState<BloodPressureReadings>({});

  const componentRef = useRef<HTMLDivElement>(null);
  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const handlePrint = useReactToPrint({ content: reactToPrintContent, bodyClass: "p-2" });

  const sortMeasurementDates = (readings: BloodPressureReadings) => {
    return Object.keys(readings)
      .sort((a, b) => b.localeCompare(a))
      .reduce((obj: BloodPressureReadings, key) => {
        obj[key] = readings[key];
        return obj;
      }, {});
  };

  const sortMeasurements = (readings: BloodPressureReadings) => {
    const keys = Object.keys(readings);
    for (const key of keys) {
      readings[key] = readings[key].sort((a, b) =>
        a.ts.toISOString().localeCompare(b.ts.toISOString()),
      );
    }
    return readings;
  };

  const readFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target?.result as string;
      const dataSplit = data.split("\n");

      const re =
        /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{1,3},\d{1,3},\d{1,3})$/;

      const readings: BloodPressureReadings = {};
      for (const row of dataSplit) {
        if (re.test(row.trim())) {
          const [ts, sys, dia, puls] = row.trim().split(",");
          const measurementTs = new Date(ts);
          const measurementDate = measurementTs.toISOString().split("T")[0];

          if (measurementDate in readings) {
            readings[measurementDate].push({
              id: nanoid(),
              ts: measurementTs,
              sys: Number(sys),
              dia: Number(dia),
              puls: Number(puls),
            });
          } else {
            readings[measurementDate] = [
              {
                id: nanoid(),
                ts: measurementTs,
                sys: Number(sys),
                dia: Number(dia),
                puls: Number(puls),
              },
            ];
          }
        }
      }

      setBpData(sortMeasurements(sortMeasurementDates(readings)));
    };
    if (e.target.files) {
      reader.readAsText(e.target.files[0]);
    } else {
      console.error("target.files is null");
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col gap-y-2 w-full lg:w-1/2">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="bp-patient" className="block text-sm">
            Name
          </label>
          <input
            type="text"
            id="bp-patient"
            name="bp-patient"
            className="rounded-sm border border-slate-400 p-1"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="bp-insurance-no" className="block text-sm">
            Versichertennummer
          </label>
          <input
            type="text"
            id="bp-insurance-no"
            name="bp-insurance-no"
            className="rounded-sm border border-slate-400 p-1"
            value={patientInsurance}
            onChange={(e) => setPatientInsurance(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="bp-readings" className="block text-sm">
            Datei Upload
          </label>
          <input
            type="file"
            id="bp-readings"
            name="bp-file-upload"
            accept=".csv"
            onChange={(e) => readFile(e)}
            className="file:cursor-pointer file:rounded-lg file:border-slate-700 file:bg-slate-100 file:hover:bg-slate-200"
          />
        </div>
        <div>
          <div className="h-4" />
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg border-2 border-slate-700 bg-slate-100 px-2 py-0.5 hover:bg-slate-200"
          >
            Print
          </button>
        </div>
      </div>
      <div className="h-4 lg:w-2/3" />
      <hr className="h-px border-0 bg-slate-500 lg:w-2/3" />
      <div id="printContent" ref={componentRef}>
        <div className="h-4" />
        {patientName.length > 0 && Object.keys(bpData).length > 0 ? (
          <p className="text-xl font-semibold">
            {patientName}, {patientInsurance}
          </p>
        ) : (
          <p className="text-sm text-slate-400">
            Name und Versichertennummer eingeben sowie Datei mit Messwerten
            hochladen!
          </p>
        )}
        <div className="h-2" />
        <Table data={bpData} />
      </div>
    </main>
  );
}
