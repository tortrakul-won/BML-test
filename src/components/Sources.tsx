import Link from "next/link";

export default function Sources() {
  return (
    <div className="text-white text-[14px] font-normal mt-3 w-full">
      <span className="text-white  text-[18px] font-bold my-3 flex-1 w-full no-underline">แหล่งข้อมูล</span>
      <ul className="list-disc  list-inside  mt-3">
        <li>
          <Link
            className="underline"
            href={"https://stat.bora.dopa.go.th/stat/statnew/statMONTH/statmonth/"}
            target="_blank"
          >
            สำนักบริหารการทะเบียน กรมการปกครอง กระทรวงมหาดไทย, จำนวนประชากร, สำนักบริหารการทะเบียน กรมการปกครอง
            กระทรวงมหาดไทย, Editor. 2564: กรุงเทพฯ.
          </Link>
        </li>
        <li>
          <Link className="underline" href={"http://www.nso.go.th/"} target="_blank">
            สำนักงานสถิติแห่งชาติ, การสำรวจภาวะเศรษฐกิจและสังคมของครัวเรือน พ.ศ. 2563 สำนักงานสถิติแห่งชาติ, Editor.
            2563: กรุงเทพฯ
          </Link>
        </li>
        <li>
          <Link className="underline" href={"http://www.price.moc.go.th/"} target="_blank">
            สำนักดัชนีเศรษฐกิจการค้า กระทรวงพาณิชย์, ข้อมูลดัชนีราคาผู้บริโภคทั่วไป, สำนักดัชนีเศรษฐกิจการค้า
            กระทรวงพาณิชย์, Editor. 2563: กรุงเทพฯ.
          </Link>
        </li>
      </ul>
    </div>
  );
}
