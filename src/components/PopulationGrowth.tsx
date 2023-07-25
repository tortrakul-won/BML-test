import Papa, { ParseResult } from "papaparse";
import { useEffect, useMemo, useState } from "react";
import { IpgData } from "@/data/pg";

export default function PopulationGrowth() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [yearFrom, setYearFrom] = useState("2550");
  const [yearTo, setYearTo] = useState("2559");
  const [csvData, setCsvData] = useState(Array<IpgData>);
  const [district, setDistrict] = useState(csvData?.[0]?.name ?? "");
  const yearRange = [2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559];
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Load the static CSV file
    const csvFilePath = "/assets/csv/bkk_population_growth.csv";
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((data) => {
        const result: ParseResult<IpgData> = Papa.parse(data, {
          header: true, // Use the first row as headers
          skipEmptyLines: true,
        });
        setCsvData(result.data);
      });
  }, []);

  useEffect(() => {
    if (csvData) {
      setDistrict(csvData?.[0]?.name);
    }
  }, [csvData]);

  const maxValue = useMemo(() => {
    {
      let districtData = { ...csvData.find((f) => f.name === district) };
      delete districtData.name;
      delete districtData.dcode;
      return Math.max(...Object.values(districtData).map((m) => parseFloat(m)));
    }
  }, [yearFrom, yearTo, district]);

  const minValue = useMemo(() => {
    {
      let districtData = { ...csvData.find((f) => f.name === district) };
      delete districtData.name;
      delete districtData.dcode;
      return Math.min(...Object.values(districtData).map((m) => parseFloat(m)));
    }
  }, [yearFrom, yearTo, district]);

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
              <select id="districts" name="districts" onChange={(e) => setDistrict(e.target.value)}>
                {csvData
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
