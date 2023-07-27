"use client";

import Sources from "@/components/Sources";
import PopulationGrowth from "../components/PopulationGrowth/PopulationGrowth";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col align-middle items-center md:mx-[20vw] mx-[10vw]">
      <span className="text-white text-[28px] font-bold my-3 flex-1 w-full">
        สถิติประชากรกรุงเทพฯ พ.ศ. 2550 - 2559
      </span>
      <span className="text-white text-[18px] font-bold my-3 flex-1 w-full">
        ลักษณะพื้นที่
      </span>
      <span className="text-white text-[14px] my-3">
        กรุงเทพฯ เป็นจังหวัดที่มีประชากรมากที่สุดในประเทศไทย
        หากรวมประชากรแฝงที่ไม่ปรากฏในทะเบียนและคนที่
        เดินทางมาทำงานในตอนกลางวันด้วยแล้ว
        คาดว่าจะสูงถึงเกือบเท่าตัวของประชากรที่ปรากฏในทะเบียน เราจึง
        เรียกกรุงเทพฯ ว่าเป็น{" "}
        {
          <Link
            href={"https://en.wikipedia.org/wiki/Megacity"}
            target="_blank"
            className="underline"
          >
            “อภิมหานคร (megacity)”
          </Link>
        }{" "}
        คือมีประชากรตั้งแต่ 10 ล้านคนขึ้นไป
        <br />
        <br />
        <p>
          อัตราเพิ่มของประชากรกรุงเทพฯ อยู่ระดับเกือบ 1% และเริ่มลดลงในปี 2559
          ดังแสดงในแผนภูมิต่อไปนี้
        </p>
      </span>
      <PopulationGrowth />
      <Sources />
    </main>
  );
}
