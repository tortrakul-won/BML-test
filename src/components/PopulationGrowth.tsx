import Papa from "papaparse";
import { useEffect, useState } from "react";
import fs from "fs";
import pgData from "@/data/pg";

export default function PopulationGrowth() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [district, setDistrict] = useState(pgData[0].name);
  const [yearFrom, setYearFrom] = useState("2550");
  const [yearTo, setYearTo] = useState("2559");
  const yearRange = [2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559];
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <span className="text-white text-[18px] font-bold my-3 flex-1 w-full">การเติบโต</span>
      {isHydrated && (
        <>
          <div id="chartFilter" className="flex justify-between w-full">
            <span>
              <label htmlFor="districts" className="text-white text-[14px] my-3 flex-1 w-full mr-3">
                เขต
              </label>
              <select id="districts" name="districts">
                {pgData
                  ?.sort((e) => e.dcode)
                  .reverse()
                  .map((e) => {
                    return (
                      <option key={e.dcode} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
              </select>
            </span>
            <section className="flex justify-between gap-6">
              <span>
                <label htmlFor="districts" className="text-white text-[14px] my-3 flex-1 w-full mr-3">
                  ตั้งแต่
                </label>
                <select id="yearFrom" name="yearFrom">
                  {yearRange.map((e) => {
                    return <option value={e}>{e}</option>;
                  })}
                </select>
              </span>
              <span>
                <label htmlFor="yearTo" className="text-white text-[14px] my-3 flex-1 w-full mr-3">
                  ถึง
                </label>
                <select id="yearTo" name="yearTo">
                  {yearRange.map((e) => {
                    return <option value={e}>{e}</option>;
                  })}
                </select>
              </span>
            </section>
          </div>
          <div id="chart"></div>
        </>
      )}
    </>
  );
}
