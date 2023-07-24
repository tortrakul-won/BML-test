import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import fs from "fs";
import pgData, { IpgData } from "@/data/pg";

export default function PopulationGrowth() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [district, setDistrict] = useState(pgData[0].name);
  const [yearFrom, setYearFrom] = useState("2550");
  const [yearTo, setYearTo] = useState("2559");
  const yearRange = [2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559];
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const maxValue = useMemo(() => {
    {
      let dataFrom = pgData.map((e) => parseFloat(e[yearFrom as keyof IpgData]));
      let dataTo = pgData.map((e) => parseFloat(e[yearTo as keyof IpgData]));
      return Math.max(...dataFrom, ...dataTo);
    }
  }, [yearFrom, yearTo]);

  const minValue = useMemo(() => {
    {
      let dataFrom = pgData.map((e) => parseFloat(e[yearFrom as keyof IpgData]));
      let dataTo = pgData.map((e) => parseFloat(e[yearTo as keyof IpgData]));
      return Math.min(...dataFrom, ...dataTo);
    }
  }, [yearFrom, yearTo]);

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
                  ?.sort((e) => parseInt(e.dcode))
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
                <select id="yearFrom" name="yearFrom" onChange={(e) => setYearFrom(e.target.value)}>
                  {yearRange.map((e) => {
                    return <option value={e}>{"พ.ศ. " + e}</option>;
                  })}
                </select>
              </span>
              <span>
                <label htmlFor="yearTo" className="text-white text-[14px] my-3 flex-1 w-full mr-3">
                  ถึง
                </label>
                <select id="yearTo" name="yearTo" onChange={(e) => setYearTo(e.target.value)}>
                  {yearRange.map((e) => {
                    return <option value={e}>{"พ.ศ. " + e}</option>;
                  })}
                </select>
              </span>
            </section>
          </div>
          <div id="chart" className="w-full my-3">
            <span className="flex justify-between text-white">
              <span>{minValue + "%"}</span>
              <span>{maxValue + "%"}</span>
            </span>
          </div>
        </>
      )}
    </>
  );
}
